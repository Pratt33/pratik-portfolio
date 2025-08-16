/**
 * Portfolio Module - Interactive Navigation and Content Management
 * 
 * This module handles all portfolio-related functionality including:
 * - Left sidebar navigation
 * - Full-screen overlay panels
 * - Dynamic content loading
 * - Smooth animations and transitions
 */

class PortfolioManager {
    constructor() {
        this.overlay = null;
        this.currentSection = null;
        this.isOpen = false;
        
        // Portfolio content data
        this.portfolioData = {
            about: {
                title: 'About Me',
                content: `
                    <div class="content-grid two-column">
                        <div>
                            <h2>Welcome to my cosmic corner!</h2>
                            <p>I'm a passionate developer who loves to explore the intersection of technology and creativity. Just like this black hole simulation, I believe in creating experiences that are both beautiful and scientifically grounded.</p>
                            
                            <h3>My Philosophy</h3>
                            <p>Every line of code is an opportunity to create something extraordinary. I approach development with the same curiosity that drives us to explore the cosmos - always pushing boundaries and seeking elegant solutions to complex problems.</p>
                            
                            <h3>What Drives Me</h3>
                            <div class="portfolio-card">
                                <ul style="list-style: none; padding: 0;">
                                    <li style="padding: 10px 0; border-left: 3px solid rgba(255, 255, 255, 0.3); padding-left: 20px; margin: 15px 0;">🚀 Creating immersive web experiences that push technological boundaries</li>
                                    <li style="padding: 10px 0; border-left: 3px solid rgba(255, 255, 255, 0.3); padding-left: 20px; margin: 15px 0;">⚡ Performance optimization and writing clean, maintainable code</li>
                                    <li style="padding: 10px 0; border-left: 3px solid rgba(255, 255, 255, 0.3); padding-left: 20px; margin: 15px 0;">🌌 Bridging the gap between art and science through technology</li>
                                    <li style="padding: 10px 0; border-left: 3px solid rgba(255, 255, 255, 0.3); padding-left: 20px; margin: 15px 0;">🔬 Continuous learning and experimental development</li>
                                    <li style="padding: 10px 0; border-left: 3px solid rgba(255, 255, 255, 0.3); padding-left: 20px; margin: 15px 0;">🎯 Solving complex problems with elegant, efficient solutions</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3>Beyond Development</h3>
                            <p>When I'm not coding, you'll find me:</p>
                            <div class="portfolio-card">
                                <p>🔭 <strong>Stargazing:</strong> Contemplating the universe and finding inspiration in cosmic phenomena</p>
                                <p>📚 <strong>Learning:</strong> Exploring cutting-edge technologies, physics concepts, and design principles</p>
                                <p>🎨 <strong>Creating:</strong> Working on experimental projects that blend technology with artistic expression</p>
                                <p>🌱 <strong>Contributing:</strong> Open source projects and helping the developer community grow</p>
                                <p>🎮 <strong>Gaming:</strong> Appreciating interactive experiences and studying game mechanics</p>
                            </div>
                            
                            <h3>Let's Connect</h3>
                            <p>I'm always excited to discuss new ideas, collaborate on interesting projects, or simply chat about the intersection of technology and creativity. Whether you're looking to build something extraordinary or just want to explore the cosmos together, I'd love to hear from you!</p>
                        </div>
                    </div>
                `
            },
            projects: {
                title: 'Projects',
                content: `
                    <h2>Featured Projects</h2>
                    <p>Here's a showcase of some projects I've worked on, each representing a unique challenge and creative solution.</p>
                    
                    <div class="content-grid">
                        <div class="project-card">
                            <div class="project-title">🌌 Black Hole Visualization</div>
                            <div class="project-description">
                                A real-time ray-traced simulation of a Schwarzschild black hole with accurate relativistic effects. This project demonstrates advanced WebGL programming, GLSL shader development, and physics simulation.
                            </div>
                            <div class="tech-stack">
                                <span class="tech-tag">Three.js</span>
                                <span class="tech-tag">WebGL</span>
                                <span class="tech-tag">GLSL Shaders</span>
                                <span class="tech-tag">Physics Simulation</span>
                                <span class="tech-tag">JavaScript</span>
                                <span class="tech-tag">Ray Tracing</span>
                            </div>
                            <div style="margin-top: 20px;">
                                <strong>Key Features:</strong>
                                <ul style="margin-top: 10px; padding-left: 20px;">
                                    <li>Real-time gravitational lensing effects</li>
                                    <li>Accretion disk visualization with Doppler shifting</li>
                                    <li>Interactive controls for physics parameters</li>
                                    <li>Responsive design with mobile support</li>
                                    <li>Performance optimized for 60fps rendering</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="project-card">
                            <div class="project-title">🎨 Interactive Portfolio</div>
                            <div class="project-description">
                                This cosmic-themed portfolio website you're currently experiencing! A unique approach to personal branding that combines scientific accuracy with modern web design principles.
                            </div>
                            <div class="tech-stack">
                                <span class="tech-tag">HTML5</span>
                                <span class="tech-tag">CSS3</span>
                                <span class="tech-tag">JavaScript</span>
                                <span class="tech-tag">Responsive Design</span>
                                <span class="tech-tag">Animation</span>
                                <span class="tech-tag">UI/UX</span>
                            </div>
                            <div style="margin-top: 20px;">
                                <strong>Design Highlights:</strong>
                                <ul style="margin-top: 10px; padding-left: 20px;">
                                    <li>Glass morphism and backdrop filters</li>
                                    <li>Smooth animations and transitions</li>
                                    <li>Modular, maintainable code structure</li>
                                    <li>Accessibility-focused design</li>
                                    <li>Cross-browser compatibility</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="project-card">
                            <div class="project-title">🔬 Physics Simulation Engine</div>
                            <div class="project-description">
                                A custom physics engine for simulating gravitational interactions and relativistic effects. Built from scratch to understand the mathematical foundations behind the visualizations.
                            </div>
                            <div class="tech-stack">
                                <span class="tech-tag">Mathematics</span>
                                <span class="tech-tag">Physics</span>
                                <span class="tech-tag">Algorithm Design</span>
                                <span class="tech-tag">Performance Optimization</span>
                                <span class="tech-tag">Scientific Computing</span>
                            </div>
                            <div style="margin-top: 20px;">
                                <strong>Technical Achievements:</strong>
                                <ul style="margin-top: 10px; padding-left: 20px;">
                                    <li>Schwarzschild metric implementation</li>
                                    <li>Geodesic path calculation</li>
                                    <li>Numerical integration methods</li>
                                    <li>Optimized for real-time performance</li>
                                    <li>Modular architecture for extensibility</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 50px; text-align: center; padding: 40px; background: rgba(255, 255, 255, 0.05); border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <h3>More Projects Coming Soon!</h3>
                        <p style="margin-bottom: 20px;">I'm constantly working on new and exciting projects. Check back regularly for updates, or get in touch to discuss potential collaborations.</p>
                        <p style="font-style: italic; color: rgba(255, 255, 255, 0.7);">"The universe is not only stranger than we imagine, it is stranger than we can imagine." - J.B.S. Haldane</p>
                    </div>
                `
            },
            skills: {
                title: 'Skills & Expertise',
                content: `
                    <h2>Technical Arsenal</h2>
                    <p>A comprehensive overview of my technical skills, tools, and areas of expertise. I believe in continuous learning and staying at the forefront of technology.</p>
                    
                    <div class="skill-category">
                        <h3>Frontend Development</h3>
                        <div class="skill-grid">
                            <div class="skill-item">JavaScript ES6+</div>
                            <div class="skill-item">TypeScript</div>
                            <div class="skill-item">React.js</div>
                            <div class="skill-item">Vue.js</div>
                            <div class="skill-item">Angular</div>
                            <div class="skill-item">Three.js</div>
                            <div class="skill-item">WebGL</div>
                            <div class="skill-item">CSS3</div>
                            <div class="skill-item">SASS/SCSS</div>
                            <div class="skill-item">HTML5</div>
                            <div class="skill-item">Responsive Design</div>
                            <div class="skill-item">Progressive Web Apps</div>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h3>Backend & Server Technologies</h3>
                        <div class="skill-grid">
                            <div class="skill-item">Node.js</div>
                            <div class="skill-item">Express.js</div>
                            <div class="skill-item">Python</div>
                            <div class="skill-item">Django</div>
                            <div class="skill-item">FastAPI</div>
                            <div class="skill-item">REST APIs</div>
                            <div class="skill-item">GraphQL</div>
                            <div class="skill-item">WebSockets</div>
                            <div class="skill-item">Microservices</div>
                            <div class="skill-item">Docker</div>
                            <div class="skill-item">Kubernetes</div>
                            <div class="skill-item">AWS</div>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h3>Graphics & Visualization</h3>
                        <div class="skill-grid">
                            <div class="skill-item">GLSL Shaders</div>
                            <div class="skill-item">3D Mathematics</div>
                            <div class="skill-item">Ray Tracing</div>
                            <div class="skill-item">Physics Simulation</div>
                            <div class="skill-item">WebGL</div>
                            <div class="skill-item">Canvas API</div>
                            <div class="skill-item">D3.js</div>
                            <div class="skill-item">Animation</div>
                            <div class="skill-item">Performance Optimization</div>
                            <div class="skill-item">Scientific Computing</div>
                            <div class="skill-item">Data Visualization</div>
                            <div class="skill-item">Interactive Design</div>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h3>Development Tools & Workflow</h3>
                        <div class="skill-grid">
                            <div class="skill-item">Git</div>
                            <div class="skill-item">GitHub Actions</div>
                            <div class="skill-item">VS Code</div>
                            <div class="skill-item">Webpack</div>
                            <div class="skill-item">Vite</div>
                            <div class="skill-item">NPM/Yarn</div>
                            <div class="skill-item">ESLint</div>
                            <div class="skill-item">Prettier</div>
                            <div class="skill-item">Jest</div>
                            <div class="skill-item">Cypress</div>
                            <div class="skill-item">CI/CD</div>
                            <div class="skill-item">Agile/Scrum</div>
                        </div>
                    </div>
                    
                    <div class="skill-category">
                        <h3>Database & Data Management</h3>
                        <div class="skill-grid">
                            <div class="skill-item">MongoDB</div>
                            <div class="skill-item">PostgreSQL</div>
                            <div class="skill-item">MySQL</div>
                            <div class="skill-item">Redis</div>
                            <div class="skill-item">Firebase</div>
                            <div class="skill-item">Supabase</div>
                            <div class="skill-item">Data Modeling</div>
                            <div class="skill-item">Query Optimization</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 50px;">
                        <h3>Continuous Learning</h3>
                        <div class="portfolio-card">
                            <p>I'm constantly expanding my skill set and staying current with emerging technologies. Currently exploring:</p>
                            <div style="margin-top: 20px;">
                                <span class="tech-tag">Machine Learning</span>
                                <span class="tech-tag">WebAssembly</span>
                                <span class="tech-tag">Rust</span>
                                <span class="tech-tag">Quantum Computing</span>
                                <span class="tech-tag">AR/VR Development</span>
                                <span class="tech-tag">Blockchain</span>
                            </div>
                        </div>
                    </div>
                `
            },
            experience: {
                title: 'Experience & Journey',
                content: `
                    <h2>Professional Journey</h2>
                    <p>My path through the world of technology has been driven by curiosity, creativity, and a passion for solving complex problems.</p>
                    
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-date">2024 - Present</div>
                            <div class="timeline-title">Senior Creative Developer</div>
                            <div class="portfolio-card">
                                <p><strong>Focus:</strong> Advanced web experiences and interactive visualizations</p>
                                <p>Leading the development of cutting-edge web applications that push the boundaries of what's possible in the browser. Specializing in 3D graphics, physics simulations, and performance optimization.</p>
                                <div style="margin-top: 15px;">
                                    <strong>Key Achievements:</strong>
                                    <ul style="margin-top: 10px; padding-left: 20px;">
                                        <li>Developed real-time physics simulations achieving 60fps performance</li>
                                        <li>Created custom WebGL shaders for advanced visual effects</li>
                                        <li>Optimized applications for cross-platform compatibility</li>
                                        <li>Mentored junior developers in advanced JavaScript and 3D programming</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-date">2023 - 2024</div>
                            <div class="timeline-title">Frontend Developer</div>
                            <div class="portfolio-card">
                                <p><strong>Focus:</strong> Modern web applications and user experience</p>
                                <p>Developed responsive web applications with emphasis on performance, accessibility, and user experience. Contributed to open source projects and building reusable component libraries.</p>
                                <div style="margin-top: 15px;">
                                    <strong>Key Contributions:</strong>
                                    <ul style="margin-top: 10px; padding-left: 20px;">
                                        <li>Built and maintained React/Vue.js applications serving 10K+ users</li>
                                        <li>Improved application performance by 40% through optimization techniques</li>
                                        <li>Implemented responsive designs achieving 95+ Google Lighthouse scores</li>
                                        <li>Collaborated with design teams to create pixel-perfect implementations</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-date">2022 - 2023</div>
                            <div class="timeline-title">Learning & Exploration Phase</div>
                            <div class="portfolio-card">
                                <p><strong>Focus:</strong> Deep dive into 3D graphics and physics programming</p>
                                <p>Intensive period of learning and experimentation, exploring advanced topics in computer graphics, mathematics, and physics simulation. Built several personal projects to master these concepts.</p>
                                <div style="margin-top: 15px;">
                                    <strong>Major Learning Areas:</strong>
                                    <ul style="margin-top: 10px; padding-left: 20px;">
                                        <li>Linear algebra and 3D mathematics</li>
                                        <li>GLSL shader programming and WebGL</li>
                                        <li>Physics simulation and numerical methods</li>
                                        <li>Advanced JavaScript patterns and performance optimization</li>
                                        <li>Computer graphics algorithms and ray tracing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-date">2021 - 2022</div>
                            <div class="timeline-title">Junior Web Developer</div>
                            <div class="portfolio-card">
                                <p><strong>Focus:</strong> Foundation building and practical experience</p>
                                <p>Started my professional journey focusing on web fundamentals, modern frameworks, and best practices. Worked on various projects to build a solid foundation in web development.</p>
                                <div style="margin-top: 15px;">
                                    <strong>Foundation Skills:</strong>
                                    <ul style="margin-top: 10px; padding-left: 20px;">
                                        <li>HTML5, CSS3, and modern JavaScript (ES6+)</li>
                                        <li>React.js and component-based architecture</li>
                                        <li>Git version control and collaboration workflows</li>
                                        <li>API integration and asynchronous programming</li>
                                        <li>Testing methodologies and debugging techniques</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 50px;">
                        <h3>Education & Certifications</h3>
                        <div class="content-grid two-column">
                            <div class="portfolio-card">
                                <h4>🎓 Computer Science Background</h4>
                                <p>Strong foundation in computer science principles, algorithms, and mathematical concepts that drive my approach to problem-solving and optimization.</p>
                            </div>
                            <div class="portfolio-card">
                                <h4>📚 Continuous Learning</h4>
                                <p>Regular participation in online courses, tech conferences, and workshops to stay current with emerging technologies and best practices.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            contact: {
                title: 'Get In Touch',
                content: `
                    <h2>Let's Connect & Collaborate</h2>
                    <p>Whether you're interested in discussing a project, exploring new opportunities, or just want to chat about the fascinating intersection of technology and science, I'd love to hear from you!</p>
                    
                    <div class="contact-grid">
                        <div class="contact-info">
                            <h3>Contact Information</h3>
                            
                            <div class="contact-item">
                                <i class="fa fa-envelope"></i>
                                <div>
                                    <strong>Email</strong><br>
                                    <span>your.email@example.com</span>
                                </div>
                            </div>
                            
                            <div class="contact-item">
                                <i class="fa fa-github"></i>
                                <div>
                                    <strong>GitHub</strong><br>
                                    <span>github.com/yourusername</span>
                                </div>
                            </div>
                            
                            <div class="contact-item">
                                <i class="fa fa-linkedin"></i>
                                <div>
                                    <strong>LinkedIn</strong><br>
                                    <span>linkedin.com/in/yourprofile</span>
                                </div>
                            </div>
                            
                            <div class="contact-item">
                                <i class="fa fa-twitter"></i>
                                <div>
                                    <strong>Twitter</strong><br>
                                    <span>@yourtwitterhandle</span>
                                </div>
                            </div>
                            
                            <div class="contact-item">
                                <i class="fa fa-map-marker"></i>
                                <div>
                                    <strong>Location</strong><br>
                                    <span>Available for remote work worldwide</span>
                                </div>
                            </div>
                            
                            <div style="margin-top: 40px; padding: 30px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                                <h4>🚀 Open for Opportunities</h4>
                                <p>I'm always interested in:</p>
                                <ul style="margin-top: 15px; padding-left: 20px;">
                                    <li>Innovative web development projects</li>
                                    <li>3D visualization and interactive experiences</li>
                                    <li>Open source collaborations</li>
                                    <li>Speaking opportunities and tech talks</li>
                                    <li>Mentoring and knowledge sharing</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="contact-form">
                            <h3>Send a Message</h3>
                            <form id="contactForm">
                                <div class="form-group">
                                    <input type="text" name="name" placeholder="Your Name" required>
                                </div>
                                <div class="form-group">
                                    <input type="email" name="email" placeholder="Your Email" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="subject" placeholder="Subject" required>
                                </div>
                                <div class="form-group">
                                    <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
                                </div>
                                <button type="submit">Send Message</button>
                            </form>
                            
                            <div style="margin-top: 30px; padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border-left: 4px solid rgba(255, 255, 255, 0.3);">
                                <p style="margin: 0; font-size: 14px; color: rgba(255, 255, 255, 0.8);">
                                    <strong>Response Time:</strong> I typically respond within 24-48 hours. For urgent inquiries, feel free to reach out via LinkedIn or Twitter for faster communication.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 60px; text-align: center; padding: 50px; background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2);">
                        <h3>Let's Build Something Amazing Together</h3>
                        <p style="font-size: 18px; color: rgba(255, 255, 255, 0.9); max-width: 600px; margin: 20px auto;">
                            The universe is vast and full of possibilities. Whether we're creating the next breakthrough web experience or exploring the intersection of technology and creativity, I believe the best work happens when passionate people collaborate.
                        </p>
                        <p style="font-style: italic; color: rgba(255, 255, 255, 0.7); margin-top: 30px;">
                            "We are a way for the cosmos to know itself." - Carl Sagan
                        </p>
                    </div>
                `
            }
        };
        
        this.init();
    }
    
    init() {
        this.createOverlay();
        this.setupEventListeners();
        this.initializeScrollBehavior();
        console.log('Portfolio Manager initialized');
    }
    
    // Initialize proper scroll behavior for landing page
    initializeScrollBehavior() {
        // Ensure landing page has no scrollbar
        document.body.style.overflow = 'hidden';
    }
    
    createOverlay() {
        // Create the main overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'portfolio-overlay';
        this.overlay.id = 'portfolioOverlay';
        
        // Create container
        const container = document.createElement('div');
        container.className = 'portfolio-container';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'portfolio-header';
        
        const title = document.createElement('h1');
        title.className = 'portfolio-title';
        title.id = 'portfolioTitle';
        title.textContent = 'Portfolio';
        
        // Create internal navigation container in header
        const internalNav = document.createElement('div');
        internalNav.className = 'portfolio-internal-nav';
        internalNav.id = 'portfolioInternalNav';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'portfolio-close';
        closeBtn.id = 'portfolioClose';
        closeBtn.innerHTML = '<i class="fa fa-times"></i>';
        
        header.appendChild(title);
        header.appendChild(internalNav);
        header.appendChild(closeBtn);
        
        // Create content area
        const content = document.createElement('div');
        content.className = 'portfolio-content';
        content.id = 'portfolioContent';
        
        // Create scroll to top button
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-to-top-btn';
        scrollTopBtn.id = 'scrollToTopBtn';
        scrollTopBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
        scrollTopBtn.title = 'Scroll to top';
        
        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(scrollTopBtn);
        this.overlay.appendChild(container);
        
        document.body.appendChild(this.overlay);
    }
    
    setupEventListeners() {
        // Navigation items
        const navItems = document.querySelectorAll('.portfolio-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const section = item.dataset.section;
                this.showSection(section);
            });
        });
        
        // Close button
        const closeBtn = document.getElementById('portfolioClose');
        closeBtn.addEventListener('click', () => {
            this.closeOverlay();
        });
        
        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollToTopBtn');
        scrollTopBtn.addEventListener('click', () => {
            this.scrollToTop();
        });
        
        // Show/hide scroll to top button based on scroll position
        this.overlay.addEventListener('scroll', () => {
            this.toggleScrollToTopButton();
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeOverlay();
            }
        });
        
        // Contact form
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'contactForm') {
                e.preventDefault();
                this.handleContactForm(e.target);
            }
        });
        
        // Overlay click to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeOverlay();
            }
        });
    }
    
    showSection(section) {
        const data = this.portfolioData[section];
        if (!data) return;
        
        this.currentSection = section;
        
        // Update content
        document.getElementById('portfolioTitle').textContent = data.title;
        document.getElementById('portfolioContent').innerHTML = this.createSectionContent(section, data);
        
        // Update internal navigation
        this.updateInternalNavigation(section);
        
        // Show overlay
        this.overlay.classList.add('show');
        this.isOpen = true;
        
        // Reset scroll position when opening any section
        setTimeout(() => {
            this.resetScrollPosition();
        }, 50);
        
        // Ensure body scroll is properly managed
        this.setBodyScrollState(false); // Keep body scroll hidden
        
        // Add some entrance animation to content
        const content = document.getElementById('portfolioContent');
        content.style.opacity = '0';
        content.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            content.style.transition = 'all 0.6s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
        
        // Setup internal navigation
        this.setupInternalNavigation();
    }
    
    // Utility method to manage body scroll behavior
    setBodyScrollState(allowScroll) {
        // Landing page should never show scrollbar (black hole is single page)
        // Portfolio sections use overlay scrolling, so body stays hidden
        document.body.style.overflow = 'hidden';
    }
    
    // Utility method to handle scroll reset
    resetScrollPosition() {
        const overlay = document.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Scroll to top functionality
    scrollToTop() {
        const overlay = document.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Toggle scroll to top button visibility based on scroll position
    toggleScrollToTopButton() {
        const scrollTopBtn = document.getElementById('scrollToTopBtn');
        const overlay = document.querySelector('.portfolio-overlay');
        
        if (overlay && scrollTopBtn) {
            // Show button as soon as user scrolls even a little bit (50px)
            if (overlay.scrollTop > 50) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    }
    
    smoothTransitionToSection(section) {
        const content = document.getElementById('portfolioContent');
        
        content.style.opacity = '0.3';
        content.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            this.currentSection = section;
            const data = this.portfolioData[section];
            document.getElementById('portfolioTitle').textContent = data.title;
            document.getElementById('portfolioContent').innerHTML = this.createSectionContent(section, data);
            
            // Reset scroll position to top when changing sections
            this.resetScrollPosition();
            
            // Update internal navigation
            this.updateInternalNavigation(section);
            
            // Re-setup internal navigation for new content
            this.setupInternalNavigation();
            
            // Animate back in
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
            }, 50);
        }, 200);
    }
    
    createSectionContent(currentSection, data) {
        return data.content;
    }
    
    updateInternalNavigation(currentSection) {
        const internalNavContainer = document.getElementById('portfolioInternalNav');
        if (!internalNavContainer) return;
        
        // Create internal navigation items
        const sections = Object.keys(this.portfolioData);
        const internalNav = sections.map(section => {
            const sectionData = this.portfolioData[section];
            const activeClass = section === currentSection ? 'active' : '';
            return `<span class="internal-nav-item ${activeClass}" data-section="${section}">${sectionData.title}</span>`;
        }).join('');
        
        internalNavContainer.innerHTML = internalNav;
    }
    
    setupInternalNavigation() {
        const internalNavItems = document.querySelectorAll('.internal-nav-item');
        internalNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const section = item.dataset.section;
                if (section !== this.currentSection) {
                    this.smoothTransitionToSection(section);
                }
            });
        });
    }
    
    closeOverlay() {
        this.overlay.classList.remove('show');
        this.isOpen = false;
        this.currentSection = null;
        
        // Hide scroll to top button when closing
        const scrollTopBtn = document.getElementById('scrollToTopBtn');
        if (scrollTopBtn) {
            scrollTopBtn.classList.remove('show');
        }
        
        // Restore landing page scroll behavior (hidden)
        this.setBodyScrollState(false);
    }
    
    handleContactForm(form) {
        // Simple form handling - in a real app, you'd send this to a server
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                form.reset();
            }, 2000);
        }, 1000);
        
        console.log('Contact form submitted:', data);
    }
}

// Initialize portfolio manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});
