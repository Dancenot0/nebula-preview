document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.feature-card, .update-card');
    animateElements.forEach(el => {
        el.style.opacity = '0'; // Initialize as hidden
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            navbar.style.height = '70px';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.height = '80px';
        }
    });

    // Dynamic Changelog from version.json
    async function loadChangelog() {
        try {
            const response = await fetch('version.json');
            const data = await response.json();
            
            const badge = document.querySelector('.version-badge');
            const list = document.getElementById('changelog-list');
            
            if (badge) badge.textContent = `v${data.version} - ${data.releaseDate}`;
            
            if (list && data.changelog) {
                list.innerHTML = data.changelog.map(item => `<li>${item}</li>`).join('');
            }
        } catch (error) {
            console.error('Error loading changelog:', error);
        }
    }

    // GitHub Stats (Stars)
    async function loadGitHubStats() {
        try {
            // Reemplaza 'tu-usuario/nebula' con tu repo real
            const response = await fetch('https://api.github.com/repos/tu-usuario/nebula');
            if (!response.ok) return;
            const data = await response.json();
            const starsElement = document.getElementById('github-stars');
            if (starsElement) {
                starsElement.textContent = `${data.stargazers_count} stars`;
            }
        } catch (error) {
            console.error('Error loading GitHub stats:', error);
        }
    }

    // Mouse Parallax effect for Browser Mockup
    const mockup = document.querySelector('.browser-mockup');
    if (mockup) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            mockup.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset transform on mouse leave
        mockup.addEventListener('mouseleave', () => {
            mockup.style.transform = `rotateY(0deg) rotateX(5deg)`;
        });
    }

    loadChangelog();
    loadGitHubStats();
});
