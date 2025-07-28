/**
 * Black Hole Visualization - Main Application
 * 
 * Real-time raytracing simulation of a Schwarzschild black hole
 * with relativistic effects and interactive controls.
 * 
 * Features:
 * - Physics-accurate black hole raytracing
 * - Interactive control panel
 * - Background music player
 * - Responsive design
 * - Attribution system
 */

"use strict"
/*global THREE, SHADER_LOADER, Mustache, Detector, $, dat:false */
/*global document, window, setTimeout, requestAnimationFrame:false */
/*global ProceduralTextures:false */

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// ============================================================================
// OBSERVER CLASS - Camera movement and physics
// ============================================================================

function Observer() {
    this.position = new THREE.Vector3(10,0,0);
    this.velocity = new THREE.Vector3(0,1,0);
    this.orientation = new THREE.Matrix3();
    this.time = 0.0;
}

Observer.prototype.orbitalFrame = function() {

    //var orbital_y = observer.velocity.clone().normalize();
    var orbital_y = (new THREE.Vector3())
        .subVectors(observer.velocity.clone().normalize().multiplyScalar(4.0),
            observer.position).normalize();

    var orbital_z = (new THREE.Vector3())
        .crossVectors(observer.position, orbital_y).normalize();
    var orbital_x = (new THREE.Vector3()).crossVectors(orbital_y, orbital_z);


    return (new THREE.Matrix4()).makeBasis(
        orbital_x,
        orbital_y,
        orbital_z
    ).linearPart();
};

Observer.prototype.move = function(dt) {

    dt *= shader.parameters.time_scale;

    var r;
    var v = 0;

    // motion on a pre-defined cirular orbit
    if (shader.parameters.observer.motion) {

        r = shader.parameters.observer.distance;
        v =  1.0 / Math.sqrt(2.0*(r-1.0));
        var ang_vel = v / r;
        var angle = this.time * ang_vel;

        var s = Math.sin(angle), c = Math.cos(angle);

        this.position.set(c*r, s*r, 0);
        this.velocity.set(-s*v, c*v, 0);

        var alpha = degToRad(shader.parameters.observer.orbital_inclination);
        var orbit_coords = (new THREE.Matrix4()).makeRotationY(alpha);

        this.position.applyMatrix4(orbit_coords);
        this.velocity.applyMatrix4(orbit_coords);
    }
    else {
        r = this.position.length();
    }

    if (shader.parameters.gravitational_time_dilation) {
        dt = Math.sqrt((dt*dt * (1.0 - v*v)) / (1-1.0/r));
    }

    this.time += dt;
};

var container;
var camera, scene, renderer, cameraControls, shader = null;
var loadedShaders = null; // Global variable to store loaded shaders
var vertexShaderSource = null; // Global variable to store vertex shader
var observer = new Observer();

function Shader(mustacheTemplate) {
    // Compile-time shader parameters
    this.parameters = {
        n_steps: 100,
        quality: 'medium',
        accretion_disk: true,
        planet: {
            enabled: true,
            distance: 7.0,
            radius: 0.4
        },
        lorentz_contraction: true,
        gravitational_time_dilation: true,
        aberration: true,
        beaming: true,
        doppler_shift: true,
        light_travel_time: true,
        time_scale: 2.0,
        observer: {
            motion: true,
            distance: 11.0,
            orbital_inclination: -10
        },

        planetEnabled: function() {
            return this.planet.enabled && this.quality !== 'fast';
        },

        observerMotion: function() {
            return this.observer.motion;
        }
    };
    var that = this;
    this.needsUpdate = false;

    this.hasMovingParts = function() {
        return this.parameters.planet.enabled || this.parameters.observer.motion;
    };

    this.compile = function() {
        return Mustache.render(mustacheTemplate, that.parameters);
    };
}

function degToRad(a) { return Math.PI * a / 180.0; }

(function(){
    var textures = {};

    function whenLoaded() {
        init(textures);
        $('#loader').hide();
        $('.initially-hidden').removeClass('initially-hidden');
        animate();
    }

    function checkLoaded() {
        if (shader === null) return;
        if (vertexShaderSource === null) return;
        for (var key in textures) if (textures[key] === null) return;
        whenLoaded();
    }

    // Load vertex shader
    $.get('shaders/vertex.glsl', function(data) {
        vertexShaderSource = data;
        checkLoaded();
    }).fail(function() {
        console.error('Failed to load vertex shader');
        // Fallback to basic vertex shader
        vertexShaderSource = 'void main() { gl_Position = vec4( position, 1.0 ); }';
        checkLoaded();
    });

    SHADER_LOADER.load(function(shaders) {
        loadedShaders = shaders; // Store shaders globally
        shader = new Shader(shaders.raytracer.fragment);
        checkLoaded();
    });

    var texLoader = new THREE.TextureLoader();
    function loadTexture(symbol, filename, interpolation) {
        textures[symbol] = null;
        texLoader.load(filename, function(tex) {
            tex.magFilter = interpolation;
            tex.minFilter = interpolation;
            textures[symbol] = tex;
            checkLoaded();
        });
    }

    loadTexture('galaxy', 'assets/milkyway.jpg', THREE.NearestFilter);
    loadTexture('spectra', 'assets/spectra.png', THREE.LinearFilter);
    loadTexture('moon', 'assets/beach-ball.png', THREE.LinearFilter);
    loadTexture('stars', 'assets/stars.png', THREE.LinearFilter);
    loadTexture('accretion_disk', 'assets/accretion-disk.png', THREE.LinearFilter);
})();

var updateUniforms;

function init(textures) {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

    var uniforms = {
        time: { type: "f", value: 0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        cam_pos: { type: "v3", value: new THREE.Vector3() },
        cam_x: { type: "v3", value: new THREE.Vector3() },
        cam_y: { type: "v3", value: new THREE.Vector3() },
        cam_z: { type: "v3", value: new THREE.Vector3() },
        cam_vel: { type: "v3", value: new THREE.Vector3() },

        planet_distance: { type: "f" },
        planet_radius: { type: "f" },

        star_texture: { type: "t", value: textures.stars },
        accretion_disk_texture: { type: "t",  value: textures.accretion_disk },
        galaxy_texture: { type: "t", value: textures.galaxy },
        planet_texture: { type: "t", value: textures.moon },
        spectrum_texture: { type: "t", value: textures.spectra }
    };

    updateUniforms = function() {
        uniforms.planet_distance.value = shader.parameters.planet.distance;
        uniforms.planet_radius.value = shader.parameters.planet.radius;

        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;

        uniforms.time.value = observer.time;
        uniforms.cam_pos.value = observer.position;

        var e = observer.orientation.elements;

        uniforms.cam_x.value.set(e[0], e[1], e[2]);
        uniforms.cam_y.value.set(e[3], e[4], e[5]);
        uniforms.cam_z.value.set(e[6], e[7], e[8]);

        function setVec(target, value) {
            uniforms[target].value.set(value.x, value.y, value.z);
        }

        setVec('cam_pos', observer.position);
        setVec('cam_vel', observer.velocity);
    };

    var material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShaderSource,
    });

    scene.updateShader = function() {
        material.fragmentShader = shader.compile();
        material.needsUpdate = true;
        shader.needsUpdate = true;
    };

    scene.updateShader();

    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );

    // Orbit camera from three.js
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );
    initializeCamera(camera);

    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set( 0, 0, 0 );
    cameraControls.addEventListener( 'change', updateCamera );
    updateCamera();

    onWindowResize();

    window.addEventListener( 'resize', onWindowResize, false );

    setupGUI();
}

function setupGUI() {

    var hint = $('#hint-text');
    var p = shader.parameters;

    function updateShader() {
        hint.hide();
        scene.updateShader();
    }

    // Disable dat.GUI and use unified HTML controls instead
    // var gui = new dat.GUI();

    // HTML Controls Panel Setup (now includes all controls)
    setupHTMLControls(p, updateShader, hint);
}

function setupHTMLControls(p, updateShader, hint) {
    // Toggle panel collapse/expand
    const toggleBtn = document.getElementById('toggleControls');
    const controlsContent = document.getElementById('controlsContent');
    const controlsHeader = document.querySelector('.controls-header');
    
    let isCollapsed = true; // Start collapsed by default
    
    // Initialize collapsed state
    controlsContent.classList.add('collapsed');
    toggleBtn.textContent = '+';
    
    function toggleControls(event) {
        if (event) event.stopPropagation(); // Prevent event bubbling
        isCollapsed = !isCollapsed;
        
        if (isCollapsed) {
            controlsContent.classList.add('collapsed');
        } else {
            controlsContent.classList.remove('collapsed');
        }
        
        toggleBtn.textContent = isCollapsed ? '+' : '−';
    }
    
    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent header click from firing
        toggleControls(e);
    });
    controlsHeader.addEventListener('click', toggleControls);
    
    // Helper function to update planet-related control visibility
    function updatePlanetControlsVisibility() {
        const planetEnabled = document.getElementById('planetEnabled').checked;
        const planetControls = document.querySelectorAll('.planet-control');
        const planetEffects = document.querySelectorAll('.planet-effect');
        
        planetControls.forEach(control => {
            control.classList.toggle('enabled', planetEnabled);
        });
        planetEffects.forEach(effect => {
            effect.classList.toggle('enabled', planetEnabled);
        });
    }
    
    // Quality control
    const qualitySelect = document.getElementById('qualitySelect');
    qualitySelect.value = p.quality;
    qualitySelect.addEventListener('change', (e) => {
        p.quality = e.target.value;
        switch(e.target.value) {
            case 'fast':
                p.n_steps = 40;
                break;
            case 'medium':
                p.n_steps = 100;
                break;
            case 'high':
                p.n_steps = 200;
                break;
        }
        updateShader();
    });
    
    // Accretion disk control
    const accretionDisk = document.getElementById('accretionDisk');
    accretionDisk.checked = p.accretion_disk;
    accretionDisk.addEventListener('change', (e) => {
        p.accretion_disk = e.target.checked;
        updateShader();
    });
    
    // Observer motion control
    const observerMotion = document.getElementById('observerMotion');
    observerMotion.checked = p.observer.motion;
    observerMotion.addEventListener('change', (e) => {
        p.observer.motion = e.target.checked;
        updateCamera();
        updateShader();
        
        if (e.target.checked) {
            hint.text('Moving observer; drag to rotate camera');
        } else {
            hint.text('Stationary observer; drag to orbit around');
        }
        hint.fadeIn();
    });
    
    // Observer distance control
    const observerDistance = document.getElementById('observerDistance');
    const distanceValue = document.getElementById('distanceValue');
    observerDistance.value = p.observer.distance;
    distanceValue.textContent = p.observer.distance.toFixed(1);
    
    observerDistance.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        p.observer.distance = value;
        distanceValue.textContent = value.toFixed(1);
        updateCamera();
    });
    
    // Planet enabled control
    const planetEnabled = document.getElementById('planetEnabled');
    planetEnabled.checked = p.planet.enabled || false;
    planetEnabled.addEventListener('change', (e) => {
        p.planet.enabled = e.target.checked;
        updatePlanetControlsVisibility();
        updateShader();
    });
    
    // Planet distance control
    const planetDistance = document.getElementById('planetDistance');
    const planetDistanceValue = document.getElementById('planetDistanceValue');
    planetDistance.value = p.planet.distance || 8;
    planetDistanceValue.textContent = (p.planet.distance || 8).toFixed(1);
    
    planetDistance.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        p.planet.distance = value;
        planetDistanceValue.textContent = value.toFixed(1);
        updateUniforms();
    });
    
    // Planet radius control
    const planetRadius = document.getElementById('planetRadius');
    const planetRadiusValue = document.getElementById('planetRadiusValue');
    planetRadius.value = p.planet.radius || 0.5;
    planetRadiusValue.textContent = (p.planet.radius || 0.5).toFixed(2);
    
    planetRadius.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        p.planet.radius = value;
        planetRadiusValue.textContent = value.toFixed(2);
        updateUniforms();
    });
    
    // Relativistic effects
    const aberration = document.getElementById('aberration');
    aberration.checked = p.aberration;
    aberration.addEventListener('change', (e) => {
        p.aberration = e.target.checked;
        updateShader();
    });
    
    const beaming = document.getElementById('beaming');
    beaming.checked = p.beaming;
    beaming.addEventListener('change', (e) => {
        p.beaming = e.target.checked;
        updateShader();
    });
    
    const dopplerShift = document.getElementById('dopplerShift');
    dopplerShift.checked = p.doppler_shift;
    dopplerShift.addEventListener('change', (e) => {
        p.doppler_shift = e.target.checked;
        updateShader();
    });
    
    const gravitationalTimeDilation = document.getElementById('gravitationalTimeDilation');
    gravitationalTimeDilation.checked = p.gravitational_time_dilation;
    gravitationalTimeDilation.addEventListener('change', (e) => {
        p.gravitational_time_dilation = e.target.checked;
        updateShader();
    });
    
    const lorentzContraction = document.getElementById('lorentzContraction');
    lorentzContraction.checked = p.lorentz_contraction;
    lorentzContraction.addEventListener('change', (e) => {
        p.lorentz_contraction = e.target.checked;
        updateShader();
    });
    
    // Time controls
    const lightTravelTime = document.getElementById('lightTravelTime');
    lightTravelTime.checked = p.light_travel_time;
    lightTravelTime.addEventListener('change', (e) => {
        p.light_travel_time = e.target.checked;
        updateShader();
    });
    
    // Set default time scale to 2.0
    const timeScale = document.getElementById('timeScale');
    const timeScaleValue = document.getElementById('timeScaleValue');
    
    // Initialize time scale (should be 2.0 from parameters)
    timeScale.value = p.time_scale;
    timeScaleValue.textContent = p.time_scale.toFixed(1);
    
    timeScale.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        p.time_scale = value;
        timeScaleValue.textContent = value.toFixed(1);
    });
    
    // Initialize planet controls visibility
    updatePlanetControlsVisibility();
    
    // Reset view function
    window.resetView = function() {
        // Reset camera to exact initial state
        if (cameraControls) {
            cameraControls.reset();
        }
        
        // Reinitialize camera to exact default angles (same as page load)
        initializeCamera(camera);
        
        // Reset ALL parameters to match initial shader parameters exactly
        
        // Observer settings (match initial values)
        p.observer.distance = 11.0;
        observerDistance.value = 11.0;
        distanceValue.textContent = '11.0';
        
        p.observer.motion = true;
        observerMotion.checked = true;
        
        p.observer.orbital_inclination = -10; // Reset this too
        
        // Quality settings
        p.quality = 'medium';
        p.n_steps = 100;
        qualitySelect.value = 'medium';
        
        // Visual settings
        p.accretion_disk = true;
        accretionDisk.checked = true;
        
        // Planet settings (match initial values)
        p.planet.enabled = true;
        planetEnabled.checked = true;
        
        p.planet.distance = 7.0;
        planetDistance.value = 7.0;
        planetDistanceValue.textContent = '7.0';
        
        p.planet.radius = 0.4;
        planetRadius.value = 0.4;
        planetRadiusValue.textContent = '0.40';

        // Relativistic effects (all true initially)
        p.aberration = true;
        aberration.checked = true;
        
        p.beaming = true;
        beaming.checked = true;
        
        p.doppler_shift = true;
        dopplerShift.checked = true;
        
        p.gravitational_time_dilation = true;
        gravitationalTimeDilation.checked = true;
        
        p.lorentz_contraction = true;
        lorentzContraction.checked = true;
        
        // Time settings
        p.light_travel_time = true;
        lightTravelTime.checked = true;
        
        p.time_scale = 2.0;
        timeScale.value = 2.0;
        timeScaleValue.textContent = '2.0';

        // Update visibility and render (same as initial load)
        updatePlanetControlsVisibility();
        updateCamera();
        scene.updateShader();
        updateUniforms();
        
        // Show confirmation
        var hint = $('#hint-text');
        hint.text('Reset to initial page load state');
        hint.fadeIn().delay(2000).fadeOut();
    };
    
    // Reset button
    document.getElementById('resetView').addEventListener('click', resetView);
}

function onWindowResize( event ) {
    renderer.setSize( window.innerWidth, window.innerHeight );
    updateUniforms();
}

function initializeCamera(camera) {

    var pitchAngle = 3.0, yawAngle = 0.0;

    // there are nicely named methods such as "lookAt" in the camera object
    // but there do not do a thing to the projection matrix due to an internal
    // representation of the camera coordinates using a quaternion (nice)
    camera.matrixWorldInverse.makeRotationX(degToRad(-pitchAngle));
    camera.matrixWorldInverse.multiply(new THREE.Matrix4().makeRotationY(degToRad(-yawAngle)));

    var m = camera.matrixWorldInverse.elements;

    camera.position.set(m[2], m[6], m[10]);
}

function updateCamera( event ) {

    var zoom_dist = camera.position.length();
    var m = camera.matrixWorldInverse.elements;
    var camera_matrix;

    if (shader.parameters.observer.motion) {
        camera_matrix = new THREE.Matrix3();
    }
    else {
        camera_matrix = observer.orientation;
    }

    camera_matrix.set(
        // row-major, not the same as .elements (nice)
        // y and z swapped for a nicer coordinate system
        m[0], m[1], m[2],
        m[8], m[9], m[10],
        m[4], m[5], m[6]
    );

    if (shader.parameters.observer.motion) {

        observer.orientation = observer.orbitalFrame().multiply(camera_matrix);

    } else {

        var p = new THREE.Vector3(
            camera_matrix.elements[6],
            camera_matrix.elements[7],
            camera_matrix.elements[8]);

        var dist = shader.parameters.observer.distance;
        observer.position.set(-p.x*dist, -p.y*dist, -p.z*dist);
        observer.velocity.set(0,0,0);
    }
}

function frobeniusDistance(matrix1, matrix2) {
    var sum = 0.0;
    for (var i in matrix1.elements) {
        var diff = matrix1.elements[i] - matrix2.elements[i];
        sum += diff*diff;
    }
    return Math.sqrt(sum);
}

function animate() {
    requestAnimationFrame( animate );

    camera.updateMatrixWorld();
    camera.matrixWorldInverse.getInverse( camera.matrixWorld );

    if (shader.needsUpdate || shader.hasMovingParts() ||
        frobeniusDistance(camera.matrixWorldInverse, lastCameraMat) > 1e-10) {

        shader.needsUpdate = false;
        render();
        lastCameraMat = camera.matrixWorldInverse.clone();
    }
}

var lastCameraMat = new THREE.Matrix4().identity();

var getFrameDuration = (function() {
    var lastTimestamp = new Date().getTime();
    return function() {
        var timestamp = new Date().getTime();
        var diff = (timestamp - lastTimestamp) / 1000.0;
        lastTimestamp = timestamp;
        return diff;
    };
})();

function render() {
    observer.move(getFrameDuration());
    if (shader.parameters.observer.motion) updateCamera();
    updateUniforms();
    renderer.render( scene, camera );
}

// Credits panel functionality
function setupCreditsPanel() {
    const copyrightIcon = document.getElementById('copyrightIcon');
    const creditsPanel = document.getElementById('creditsPanel');
    const closeCredits = document.getElementById('closeCredits');
    
    // Show credits panel when copyright icon is clicked
    copyrightIcon.addEventListener('click', function() {
        creditsPanel.classList.remove('hidden');
        creditsPanel.classList.add('show');
    });
    
    // Hide credits panel when close button is clicked
    closeCredits.addEventListener('click', function() {
        creditsPanel.classList.remove('show');
        setTimeout(() => {
            creditsPanel.classList.add('hidden');
        }, 300); // Wait for animation to complete
    });
    
    // Hide credits panel when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!creditsPanel.contains(event.target) && 
            !copyrightIcon.contains(event.target) && 
            creditsPanel.classList.contains('show')) {
            creditsPanel.classList.remove('show');
            setTimeout(() => {
                creditsPanel.classList.add('hidden');
            }, 300);
        }
    });
}

// Initialize credits panel after DOM is loaded
document.addEventListener('DOMContentLoaded', setupCreditsPanel);

// Music functionality
function setupMusicPlayer() {
    const musicIcon = document.getElementById('musicIcon');
    const musicIconSymbol = document.getElementById('musicIconSymbol');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    let isPlaying = false;
    
    // Set initial volume (optional - adjust as needed)
    backgroundMusic.volume = 0.3;
    
    musicIcon.addEventListener('click', function() {
        if (isPlaying) {
            // Pause music
            backgroundMusic.pause();
            musicIcon.classList.remove('playing');
            musicIconSymbol.className = 'fa fa-music fa-lg';
            isPlaying = false;
        } else {
            // Play music
            backgroundMusic.play().then(() => {
                musicIcon.classList.add('playing');
                musicIconSymbol.className = 'fa fa-pause fa-lg';
                isPlaying = true;
            }).catch(error => {
                console.log('Audio playback failed:', error);
                // Fallback: show music note icon if autoplay is blocked
                musicIconSymbol.className = 'fa fa-music fa-lg';
            });
        }
    });
    
    // Handle audio events
    backgroundMusic.addEventListener('ended', function() {
        // This shouldn't fire due to loop attribute, but just in case
        musicIcon.classList.remove('playing');
        musicIconSymbol.className = 'fa fa-music fa-lg';
        isPlaying = false;
    });
    
    backgroundMusic.addEventListener('error', function() {
        console.log('Audio loading error');
        musicIcon.style.opacity = '0.5';
        musicIcon.style.cursor = 'not-allowed';
    });
}

// Initialize music player after DOM is loaded
document.addEventListener('DOMContentLoaded', setupMusicPlayer);
