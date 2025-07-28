# Black Hole Visualization - Project Structure

## 📁 Directory Overview

```
black-hole/
├── 📄 index.html              # Main HTML file
├── 📄 main.js                 # Core application logic
├── 📄 style.css               # Styling and UI
├── 📄 three-js-monkey-patch.js # THREE.js patches
├── 📄 README.md               # Project documentation
├── 📄 COPYRIGHT.md            # License and attribution
├── 📄 .gitignore              # Git ignore rules
│
├── 📁 shaders/                # GLSL shader files
│   ├── fragment.glsl          # Fragment shader (raytracing)
│   └── vertex.glsl            # Vertex shader
│
├── 📁 assets/                 # Media and texture files
│   ├── accretion-disk.png     # Accretion disk texture
│   ├── beach-ball.png         # Planet texture
│   ├── milkyway.jpg           # Galaxy background
│   ├── spectra.png            # Color spectrum lookup
│   ├── stars.png              # Star field texture
│   └── sakura.mp3             # Background music
│
└── 📁 js-libs/                # JavaScript libraries
    ├── jquery-2.1.4.min.js    # jQuery library
    ├── three.min.js           # THREE.js 3D library
    ├── OrbitControls.js       # Camera controls
    ├── Detector.js            # WebGL detection
    ├── ShaderLoader.min.js    # Shader loading utility
    └── mustache.min.js        # Template engine
```

## 🔧 Core Files

### **index.html**
- Main entry point
- HTML structure and UI elements
- Script loading order
- Control panel layout

### **main.js** 
- Application initialization
- Shader management and parameters
- UI controls and event handling
- Camera and rendering logic
- Music player functionality
- Credits panel system

### **style.css**
- Responsive design
- Control panel styling
- Icon buttons (music, copyright)
- Animation effects
- Mobile-friendly layout

## 🎨 Assets

### **Textures**
- `accretion-disk.png` - Accretion disk visual
- `beach-ball.png` - Planet surface texture
- `milkyway.jpg` - Galaxy background image
- `spectra.png` - Color temperature lookup
- `stars.png` - Star field overlay

### **Audio**
- `sakura.mp3` - Ambient background music

## 🖥️ Shaders

### **fragment.glsl**
- Real-time raytracing implementation
- Black hole physics simulation
- Relativistic effects calculations
- Light bending and time dilation

### **vertex.glsl**
- Simple vertex transformation
- Screen-space quad rendering

## 📚 Libraries

All third-party libraries are contained in `js-libs/`:
- **THREE.js** - 3D graphics framework
- **jQuery** - DOM manipulation
- **OrbitControls** - Camera control system
- **Detector** - WebGL capability detection
- **ShaderLoader** - Dynamic shader loading
- **Mustache** - Template preprocessing

## 🚀 Features

- ✅ Real-time black hole raytracing
- ✅ Physics-accurate relativistic effects
- ✅ Interactive control panel
- ✅ Responsive design
- ✅ Background music player
- ✅ Attribution system
- ✅ Mobile-friendly interface

## 🎮 Controls

- **Drag** to rotate view
- **Control Panel** - Expand/collapse physics settings
- **Music Button** - Toggle ambient audio
- **Copyright Icon** - View credits and resources
- **Reset Button** - Restore initial state
