// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('fade-out');
    }, 1500);
});

// Scroll to Top functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fade in animations for sections
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements we want to animate
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Create intersection observer for fade-in elements
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Enhanced scroll animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Parallax effect for memory cards
    gsap.utils.toArray('.memory-card').forEach(card => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: 20,
            ease: 'none'
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Audio Player Functionality
    const audioPlayer = {
        audio: null,
        playPauseBtn: null,
        playIcon: null,
        pauseIcon: null,
        progressBar: null,
        progressContainer: null,
        volumeSlider: null,
        isPlaying: false,
        isDragging: false,

        init() {
            // Initialize elements
            this.audio = new Audio('birthday_message.mp3');
            this.playPauseBtn = document.getElementById('playPauseBtn');
            this.playIcon = document.querySelector('.play-icon');
            this.pauseIcon = document.querySelector('.pause-icon');
            this.progressBar = document.querySelector('.progress');
            this.progressContainer = document.querySelector('.progress-container');
            this.volumeSlider = document.querySelector('.volume-slider');

            if (!this.audio || !this.playPauseBtn) {
                console.error('Audio player elements not found');
                return;
            }

            // Set initial states
            this.audio.volume = 0.5;
            this.volumeSlider.value = 50;
            
            // Bind methods
            this.updateProgress = this.updateProgress.bind(this);
            this.seekToPosition = this.seekToPosition.bind(this);
            
            // Add event listeners
            this.addEventListeners();
        },

        addEventListeners() {
            // Play/Pause button
            this.playPauseBtn.addEventListener('click', () => {
                this.togglePlay();
            });

            // Progress bar events
            this.progressContainer.addEventListener('mousedown', (e) => {
                this.isDragging = true;
                this.seekToPosition(e);
            });

            document.addEventListener('mousemove', (e) => {
                if (this.isDragging) {
                    this.seekToPosition(e);
                }
            });

            document.addEventListener('mouseup', () => {
                this.isDragging = false;
            });

            // Volume control
            this.volumeSlider.addEventListener('input', (e) => {
                this.audio.volume = e.target.value / 100;
            });

            // Audio events
            this.audio.addEventListener('timeupdate', this.updateProgress);
            this.audio.addEventListener('ended', () => this.handleAudioEnd());
            this.audio.addEventListener('loadedmetadata', () => {
                console.log('Audio loaded, duration:', this.audio.duration);
            });
        },

        seekToPosition(e) {
            const rect = this.progressContainer.getBoundingClientRect();
            const clickPosition = (e.clientX - rect.left) / rect.width;
            const seekTime = clickPosition * this.audio.duration;
            this.audio.currentTime = seekTime;
            this.updateProgress();
        },

        togglePlay() {
            if (this.isPlaying) {
                this.audio.pause();
                this.playIcon.style.display = 'block';
                this.pauseIcon.style.display = 'none';
            } else {
                this.audio.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
                this.playIcon.style.display = 'none';
                this.pauseIcon.style.display = 'block';
            }
            this.isPlaying = !this.isPlaying;
        },

        updateProgress() {
            if (this.audio.duration) {
                const progress = (this.audio.currentTime / this.audio.duration) * 100;
                this.progressBar.style.width = `${progress}%`;
            }
        },

        handleAudioEnd() {
            this.isPlaying = false;
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            this.audio.currentTime = 0;
            this.updateProgress();
        }
    };

    // Initialize audio player when DOM is loaded
    audioPlayer.init();

    // GSAP Animations
    gsap.from('.hero h1', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero .subtitle, .hero .description', {
        duration: 1.5,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });

    // Memory cards animation
    gsap.utils.toArray('.memory-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Letter content animation
    gsap.from('.letter-content', {
        scrollTrigger: {
            trigger: '.letter-content',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    // Initialize tilt effect on memory cards
    VanillaTilt.init(document.querySelectorAll('.memory-card'), {
        max: 5,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02
    });

    // Mouse position tracking for card hover effects
    const cards = document.querySelectorAll('.memory-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Add hover effect to letter content
    const letterContent = document.querySelector('.letter-content');
    if (letterContent) {
        VanillaTilt.init(letterContent, {
            max: 2,
            speed: 400,
            scale: 1.01,
            transition: true,
            easing: 'cubic-bezier(.03,.98,.52,.99)'
        });
    }

    // Add subtle tilt to audio player
    const audioPlayerElement = document.querySelector('.audio-player');
    if (audioPlayerElement) {
        VanillaTilt.init(audioPlayerElement, {
            max: 3,
            speed: 400,
            scale: 1.02,
            transition: true,
            easing: 'cubic-bezier(.03,.98,.52,.99)'
        });
    }
});

// Scroll to top button functionality
const scrollBtn = document.querySelector('.scroll-btn');
scrollBtn.addEventListener('click', () => {
    document.querySelector('#chitthi').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Initialize Particles.js
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fa8231"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.2,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#fa8231",
                "opacity": 0.1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.3
                    }
                }
            }
        }
    }
);

// Background Music
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('bgMusicToggle');
let isMusicPlaying = true; // Set to true initially

// Set initial volume to 30%
bgMusic.volume = 0.05;

// Auto-play background music
document.addEventListener('DOMContentLoaded', () => {
    // Start playing background music
    bgMusic.play().catch(error => {
        console.error('Error playing background music:', error);
    });
    musicToggle.classList.add('playing');
});

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play();
        musicToggle.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox-close');
const prevBtn = lightbox.querySelector('.lightbox-prev');
const nextBtn = lightbox.querySelector('.lightbox-next');
let currentImageIndex = 0;
const memoryCards = document.querySelectorAll('.memory-card');

// Open lightbox
memoryCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentImageIndex = index;
        const fullImageSrc = card.getAttribute('data-img');
        lightboxImg.src = fullImageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

// Navigate through images
function showImage(index) {
    currentImageIndex = index;
    if (currentImageIndex < 0) currentImageIndex = memoryCards.length - 1;
    if (currentImageIndex >= memoryCards.length) currentImageIndex = 0;
    
    const fullImageSrc = memoryCards[currentImageIndex].getAttribute('data-img');
    lightboxImg.src = fullImageSrc;
}

prevBtn.addEventListener('click', () => showImage(currentImageIndex - 1));
nextBtn.addEventListener('click', () => showImage(currentImageIndex + 1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
}); 