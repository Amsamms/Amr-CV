// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing audio players...');
    
    // Initialize animations
    initializeAnimations();
    
    // Add smooth scrolling
    initializeSmoothScrolling();
    
    // Add interactive effects
    initializeInteractiveEffects();
    
    // Add typing effect to name
    initializeTypingEffect();
    
    // Add floating particles
    initializeParticles();
    
    // Initialize audio players
    initializeAudioPlayers();
    
    // Add audio visualization
    addAudioVisualization();
});

// Backup initialization in case DOMContentLoaded fails
if (document.readyState === 'loading') {
    // DOM still loading
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Backup: DOM loaded, initializing...');
        setTimeout(initializeAudioPlayers, 100);
    });
} else {
    // DOM already loaded
    console.log('DOM already loaded, initializing immediately...');
    setTimeout(initializeAudioPlayers, 100);
}

// Also try after window load as final fallback
window.addEventListener('load', function() {
    console.log('Window loaded, checking audio players...');
    const buttons = document.querySelectorAll('.play-button');
    if (buttons.length > 0 && !buttons[0].hasAttribute('data-initialized')) {
        console.log('Reinitializing audio players...');
        initializeAudioPlayers();
    }
});

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for skill items
                if (entry.target.classList.contains('skills-section')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                        }, index * 100);
                    });
                }
                
                // Add staggered animation for contact items
                if (entry.target.classList.contains('header')) {
                    const contactItems = entry.target.querySelectorAll('.contact-item');
                    contactItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = `slideInRight 0.6s ease ${index * 0.1}s both`;
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section, .header');
    sections.forEach(section => observer.observe(section));
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    // Add smooth scroll behavior for any internal links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize interactive effects
function initializeInteractiveEffects() {
    // Add hover effects to sections
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add click effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add pulse animation
            this.style.animation = 'pulse 0.6s ease';
            
            // Reset animation after completion
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Add ripple effect to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

// Create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    if (!document.head.querySelector('style[data-ripple]')) {
        style.setAttribute('data-ripple', 'true');
        document.head.appendChild(style);
    }
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize typing effect for name
function initializeTypingEffect() {
    const nameElement = document.querySelector('.name');
    if (!nameElement) return;
    
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    function typeCharacter() {
        if (index < originalText.length) {
            nameElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            // Add cursor blink effect
            nameElement.innerHTML += '<span class="cursor">|</span>';
            
            // Add cursor blink animation
            const style = document.createElement('style');
            style.textContent = `
                .cursor {
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                const cursor = nameElement.querySelector('.cursor');
                if (cursor) cursor.remove();
            }, 3000);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeCharacter, 1000);
}

// Initialize floating particles
function initializeParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.innerHTML = `
        <style>
            .particles-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                overflow: hidden;
            }
            
            .particle {
                position: absolute;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                pointer-events: none;
                animation: float linear infinite;
            }
            
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        </style>
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Create particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 5000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

// Add parallax effect to header
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add progressive enhancement for older browsers
if (!window.IntersectionObserver) {
    // Fallback for browsers without IntersectionObserver
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('visible');
    });
}

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add print styles optimization
window.addEventListener('beforeprint', function() {
    // Remove animations for print
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            *, *::before, *::after {
                animation: none !important;
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add accessibility improvements
document.addEventListener('keydown', function(e) {
    // Add focus indicators for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for accessibility
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Add audio player functionality
function initializeAudioPlayers() {
    console.log('Initializing audio players...');
    
    const playButtons = document.querySelectorAll('.play-button');
    const audioPlayers = document.querySelectorAll('audio');
    
    console.log('Found play buttons:', playButtons.length);
    console.log('Found audio elements:', audioPlayers.length);
    
    if (playButtons.length === 0) {
        console.error('No play buttons found!');
        return;
    }
    
    playButtons.forEach((button, index) => {
        console.log(`Setting up button ${index + 1}:`, button);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Play button clicked:', this);
            
            const audioId = this.getAttribute('data-audio');
            console.log('Audio ID:', audioId);
            
            const audio = document.getElementById(audioId);
            console.log('Audio element found:', audio);
            
            if (!audio) {
                console.error('Audio element not found for ID:', audioId);
                alert('خطأ: لم يتم العثور على الملف الصوتي');
                return;
            }
            
            const audioPlayer = audio.parentElement;
            const progressBar = audioPlayer.querySelector('.progress-bar');
            const timeDisplay = audioPlayer.querySelector('.time-display');
            const playIcon = this.querySelector('i');
            const playText = this.querySelector('span');
            
            console.log('Audio player elements:', {
                audioPlayer,
                progressBar,
                timeDisplay,
                playIcon,
                playText
            });
            
            // Stop all other audio players
            audioPlayers.forEach(otherAudio => {
                if (otherAudio !== audio && !otherAudio.paused) {
                    console.log('Stopping other audio:', otherAudio.id);
                    otherAudio.pause();
                    const otherButton = document.querySelector(`[data-audio="${otherAudio.id}"]`);
                    const otherPlayer = otherAudio.parentElement;
                    const otherIcon = otherButton.querySelector('i');
                    const otherText = otherButton.querySelector('span');
                    
                    otherButton.classList.remove('playing');
                    otherPlayer.classList.remove('active');
                    otherIcon.className = 'fas fa-play';
                    otherText.textContent = 'تشغيل';
                }
            });
            
            if (audio.paused) {
                console.log('Playing audio:', audioId);
                // Play audio
                audio.play().then(() => {
                    console.log('Audio started playing successfully');
                    this.classList.add('playing');
                    audioPlayer.classList.add('active');
                    playIcon.className = 'fas fa-pause';
                    playText.textContent = 'إيقاف';
                }).catch(error => {
                    console.error('Error playing audio:', error);
                    alert('حدث خطأ في تشغيل الملف الصوتي. تأكد من وجود الملف: ' + audioId + '.mpeg');
                });
            } else {
                console.log('Pausing audio:', audioId);
                // Pause audio
                audio.pause();
                this.classList.remove('playing');
                playIcon.className = 'fas fa-play';
                playText.textContent = 'تشغيل';
            }
        });
    });
    
    // Add audio event listeners
    audioPlayers.forEach(audio => {
        const button = document.querySelector(`[data-audio="${audio.id}"]`);
        const audioPlayer = audio.parentElement;
        const progressContainer = audioPlayer.querySelector('.progress-container');
        const progressBar = audioPlayer.querySelector('.progress-bar');
        const timeDisplay = audioPlayer.querySelector('.time-display');
        const playIcon = button.querySelector('i');
        const playText = button.querySelector('span');
        
        // Update progress and time
        audio.addEventListener('timeupdate', function() {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = progressPercent + '%';
                
                const currentMinutes = Math.floor(audio.currentTime / 60);
                const currentSeconds = Math.floor(audio.currentTime % 60);
                const durationMinutes = Math.floor(audio.duration / 60);
                const durationSeconds = Math.floor(audio.duration % 60);
                
                timeDisplay.textContent = 
                    `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')} / ` +
                    `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
            }
        });
        
        // Handle audio end
        audio.addEventListener('ended', function() {
            button.classList.remove('playing');
            audioPlayer.classList.remove('active');
            playIcon.className = 'fas fa-play';
            playText.textContent = 'تشغيل';
            progressBar.style.width = '0%';
            timeDisplay.textContent = '00:00 / 00:00';
        });
        
        // Handle progress bar click
        progressContainer.addEventListener('click', function(e) {
            if (audio.duration) {
                const rect = progressContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const progressPercent = (clickX / rect.width) * 100;
                const newTime = (progressPercent / 100) * audio.duration;
                audio.currentTime = newTime;
                console.log('Seeking to:', newTime);
            }
        });
        
        // Check if audio file can be loaded
        audio.addEventListener('loadstart', function() {
            console.log('Started loading audio:', audio.id);
        });
        
        audio.addEventListener('canplay', function() {
            console.log('Audio can start playing:', audio.id);
        });
        
        // Handle audio load error
        audio.addEventListener('error', function(e) {
            console.error('Error loading audio file:', audio.src, e);
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            playText.textContent = 'ملف غير متوفر';
            alert('خطأ في تحميل الملف الصوتي: ' + audio.id);
        });
        
        // Handle audio load success
        audio.addEventListener('loadedmetadata', function() {
            console.log('Audio metadata loaded for:', audio.id);
            const durationMinutes = Math.floor(audio.duration / 60);
            const durationSeconds = Math.floor(audio.duration % 60);
            timeDisplay.textContent = 
                `00:00 / ${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
        });
    });
}

// Mark buttons as initialized
function markButtonsAsInitialized() {
    document.querySelectorAll('.play-button').forEach(button => {
        button.setAttribute('data-initialized', 'true');
    });
}

// Add audio visualization effect
function addAudioVisualization() {
    const audioItems = document.querySelectorAll('.audio-item');
    
    audioItems.forEach(item => {
        const audio = item.querySelector('audio');
        const icon = item.querySelector('.audio-icon i');
        
        audio.addEventListener('play', function() {
            icon.style.animation = 'pulse 1s infinite';
        });
        
        audio.addEventListener('pause', function() {
            icon.style.animation = '';
        });
        
        audio.addEventListener('ended', function() {
            icon.style.animation = '';
        });
    });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Add smooth scrolling
    initializeSmoothScrolling();
    
    // Add interactive effects
    initializeInteractiveEffects();
    
    // Add typing effect to name
    initializeTypingEffect();
    
    // Add floating particles
    initializeParticles();
    
    // Initialize audio players
    initializeAudioPlayers();
    
    // Add audio visualization
    addAudioVisualization();
});
