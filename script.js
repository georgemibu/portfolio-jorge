document.addEventListener("DOMContentLoaded", function () {
    const navMenuIcon = document.querySelector('.nav-menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (navMenuIcon) {
        navMenuIcon.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navMenuIcon.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navMenuIcon.classList.remove('active');
            }
        });
    });

    const translations = {
        es: {
            nav_about: 'Sobre mí',
            nav_skills: 'Skills',
            nav_projects: 'Proyectos',
            nav_contact: 'Contacto',
            hero_greeting: 'Hola, soy',
            hero_subtitle: 'Creo interfaces modernas, rápidas y con un gran diseño.',
            hero_button: 'Ver mi Trabajo',
            typing_effect: ['Desarrollador Fullstack', 'Apasionado del UX/UI', 'Maquetador Web'],
            about_title: 'Sobre mí',
            about_text: 'Soy un desarrollador Fullstack con una fuerte inclinación por el FrontEnd y el diseño UX/UI. Mi pasión es transformar diseños en interfaces pixel-perfect, intuitivas y accesibles. Me muevo con soltura en el ecosistema de React para construir aplicaciones dinámicas y, aunque mi fuerte es el frontend, no dudo en adentrarme en el backend con Node.js para dar vida a proyectos completos.',
            about_cv_button: 'Descargar CV',
            skills_title: 'Mi Espectro de Habilidades',
            about_highlight1_title: "Frontend con Alma de Diseñador",
            about_highlight1_text: 'Mi especialidad es dar vida a los diseños. Convierto maquetas en interfaces web pixel-perfect, interactivas y accesibles usando HTML, CSS y JavaScript con un fuerte enfoque en la experiencia de usuario.',
            about_highlight2_title: 'Desarrollo en React',
            about_highlight2_text: 'Uso React para construir aplicaciones web dinámicas y escalables. Me siento cómodo creando componentes reutilizables y gestionando el estado de la aplicación para ofrecer experiencias de usuario fluidas.',
            about_highlight3_title: 'Visión Full-Stack',
            about_highlight3_text: 'Aunque mi corazón está en el frontend, entiendo la arquitectura completa. Puedo construir y mantener APIs RESTful con Node.js y Express, lo que me permite abordar proyectos de principio a fin.',
            skills_frontend: 'Frontend',
            skills_backend: 'Backend',
            skills_tools: 'Herramientas',
            projects_title: 'Proyectos',
            project1_title: 'InterfacePro',
            project2_title: 'TaskAPI',
            project3_title: 'ModernLanding',
            project1_desc: 'Una aplicación web para gestionar tareas, construida con React y CSS Modules.',
            project2_desc: 'API REST para una app de tareas, desarrollada con Node.js y Express.',
            project3_desc: 'Landing page moderna y responsive creada con HTML y CSS.',
            contact_title: 'Contacto',
            contact_cta: '¿Trabajamos juntos? Envíame un mensaje.',
            contact_button: 'Enviar Email'
        },
        en: {
            nav_about: 'About Me',
            nav_skills: 'Skills',
            nav_projects: 'Projects',
            nav_contact: 'Contact',
            hero_greeting: 'Hello, I\'m',
            hero_subtitle: 'I create modern, fast, and beautifully designed interfaces.',
            hero_button: 'View My Work',
            typing_effect: ['Fullstack Developer', 'UX/UI Enthusiast', 'Web Layout Specialist'],
            about_title: 'About Me',
            about_text: 'I am a Fullstack Developer with a strong inclination for FrontEnd and UX/UI design. My passion is to transform designs into pixel-perfect, intuitive, and accessible interfaces. I navigate the React ecosystem with ease to build dynamic applications, and although my strength is the frontend, I do not hesitate to venture into the backend with Node.js to bring complete projects to life.',
            about_cv_button: 'Download CV',
            skills_title: 'My Skill Spectrum',
            about_highlight1_title: "Frontend with a Designer's Soul",
            about_highlight1_text: 'My specialty is bringing designs to life. I turn mockups into pixel-perfect, interactive, and accessible web interfaces using HTML, CSS, and JavaScript with a strong focus on user experience.',
            about_highlight2_title: 'React Development',
            about_highlight2_text: 'I use React to build dynamic and scalable web applications. I\'m comfortable creating reusable components and managing application state to deliver smooth user experiences.',
            about_highlight3_title: 'Full-Stack Vision',
            about_highlight3_text: 'While my heart is in the frontend, I understand the full architecture. I can build and maintain RESTful APIs with Node.js and Express, allowing me to tackle projects from end to end.',
            skills_frontend: 'Frontend',
            skills_backend: 'Backend',
            skills_tools: 'Tools',
            projects_title: 'Projects',
            project1_title: 'InterfacePro',
            project2_title: 'TaskAPI',
            project3_title: 'ModernLanding',
            project1_desc: 'A web application to manage tasks, built with React and CSS Modules.',
            project2_desc: 'REST API for a task app, developed with Node.js and Express.',
            project3_desc: 'A modern and responsive landing page created with HTML and CSS.',
            contact_title: 'Contact',
            contact_cta: 'Shall we work together? Send me a message.',
            contact_button: 'Send Email'
        }
    };

    const langToggle = document.querySelector('.lang-toggle');
    let currentLang = 'es';
    let typedInstance;

    function updateTexts(lang) {
        const elementsToTranslate = document.querySelectorAll('[data-lang]');
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
        if (typedInstance) typedInstance.destroy();
        initializeTyped(translations[lang].typing_effect);
    }

    let boltCreationTimeout; 
    let animationFrameId; // Variable para controlar el bucle de animación

    const canvas = document.getElementById('lightning-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;
        let bolts = [];

        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Bolt {
            constructor(x, y, length, angle, branchChance) {
                this.x = x;
                this.y = y;
                this.length = length;
                this.angle = angle;
                this.branchChance = branchChance;
                this.segments = [];
                this.life = 30; // Frames de vida del rayo
                this.createSegments();
            }

            createSegments() {
                let currentX = this.x;
                let currentY = this.y;
                let currentAngle = this.angle;

                for (let i = 0; i < this.length; i++) {
                    const segmentLength = Math.random() * 10 + 5;
                    const nextX = currentX + Math.cos(currentAngle) * segmentLength;
                    const nextY = currentY + Math.sin(currentAngle) * segmentLength;
                    this.segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });

                    currentX = nextX;
                    currentY = nextY;
                    currentAngle += (Math.random() - 0.5) * 0.5; // Desviación

                    // Crear ramas
                    if (Math.random() < this.branchChance) {
                        const branchAngle = currentAngle + (Math.random() * 1.2 - 0.6);
                        bolts.push(new Bolt(currentX, currentY, this.length / 2, branchAngle, this.branchChance / 2));
                    }
                }
            }

            draw() {
                this.life--;
                const alpha = this.life / 30;
        
                ctx.beginPath();
                this.segments.forEach(seg => {
                    ctx.moveTo(seg.x1, seg.y1);
                    ctx.lineTo(seg.x2, seg.y2);
                });
        
                // --- OPTIMIZACIÓN ---
                // Dibujamos el rayo una sola vez con un resplandor.
                // El brillo inicial se simula con un shadowBlur más intenso al principio.
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
                ctx.lineWidth = 2;
                ctx.shadowBlur = this.life > 25 ? 30 : 15; // Mayor resplandor al inicio
                ctx.shadowColor = `rgba(122, 90, 248, ${alpha * 0.5})`;
                ctx.stroke();
                ctx.shadowBlur = 0; // Reseteamos la sombra para el siguiente frame
            }
        }

        function createBolt() {
            const startX = Math.random() * w;
            // Hacemos que los rayos empiecen justo debajo del navbar
            const startY = navbar.offsetHeight; 
            const length = Math.random() * 40 + 30;
            const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.2;
            bolts.push(new Bolt(startX, startY, length, angle, 0.08));

            boltCreationTimeout = setTimeout(createBolt, Math.random() * 500 + 200);
        }

        function animate() {
            ctx.clearRect(0, 0, w, h);
            // --- OPTIMIZACIÓN ---
            // Iteramos hacia atrás para eliminar elementos sin crear un nuevo array.
            for (let i = bolts.length - 1; i >= 0; i--) {
                const bolt = bolts[i];
                if (bolt.life <= 0) {
                    bolts.splice(i, 1);
                } else {
                    bolt.draw();
                }
            }
            animationFrameId = requestAnimationFrame(animate); // Guardamos el ID del frame
        }

        createBolt();
        animate();
    }    

    // --- OPTIMIZACIÓN DE RENDIMIENTO ---
    // Pausar la animación si la pestaña no está visible para evitar sobrecarga.
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            // Si la pestaña se oculta, cancelamos la creación de nuevos rayos.
            clearTimeout(boltCreationTimeout);
            // Y también detenemos el bucle de renderizado.
            cancelAnimationFrame(animationFrameId);
        } else {
            // Si la pestaña vuelve a estar visible, reiniciamos ambos procesos.
            createBolt();
            animate();
        }
    });

    function initializeTyped(strings) {
        if (document.getElementById('typing-effect')) {
            typedInstance = new Typed('#typing-effect', {
                strings: strings, typeSpeed: 50, backSpeed: 25, backDelay: 1500, startDelay: 500, loop: true, showCursor: true, cursorChar: '|',
            });
        }
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        
        const thumb = langToggle.querySelector('.lang-toggle-thumb');
        const options = langToggle.querySelectorAll('.lang-option');

        thumb.style.transform = currentLang === 'en' ? 'translateX(100%)' : 'translateX(0)';

        options.forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-lang-id') === currentLang) {
                opt.classList.add('active');
            }
        });

        updateTexts(currentLang);
    });

    updateTexts(currentLang);

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // El elemento se considera visible cuando el 10% está en pantalla
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Deja de observar el elemento una vez animado
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-in-element');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    const sections = document.querySelectorAll('header, section, footer');
    const themeClasses = ['navbar-theme-about', 'navbar-theme-skills', 'navbar-theme-projects', 'navbar-theme-contact'];

    const sectionObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.4 // La sección se considera activa cuando el 40% es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const theme = entry.target.id;
                // Limpiar clases de tema anteriores
                navbar.classList.remove(...themeClasses);

                if (theme && theme !== 'hero') { // El tema 'hero' es el default, no necesita clase
                    navbar.classList.add(`navbar-theme-${theme}`);
                }
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    window.addEventListener('mousemove', e => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    const hoverables = document.querySelectorAll('a, button, .lang-toggle');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    const cursorThemeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const theme = entry.target.getAttribute('data-theme');
                document.body.className = document.body.className.replace(/cursor-theme-\w+/g, '');
                if (theme) {
                    document.body.classList.add(`cursor-theme-${theme}`);
                }
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        cursorThemeObserver.observe(section);
    });

    const rippleLinks = document.querySelectorAll('.hex-overlay a');
    rippleLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

});
