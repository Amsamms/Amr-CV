// Enhanced Audio Player Script - Fixed Version
console.log('Audio player script loaded');

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing all components...');
    
    // Initialize all components
    initializeAnimations();
    initializeSmoothScrolling();
    initializeInteractiveEffects();
    initializeTypingEffect();
    initializeParticles();
    initializeAudioPlayers();
    addAudioVisualization();
    
    // Mark as initialized
    markAsInitialized();
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
                
                if (entry.target.classList.contains('skills-section')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                        }, index * 100);
                    });
                }
                
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

    const sections = document.querySelectorAll('.section, .header');
    sections.forEach(section => observer.observe(section));
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
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
    // Section hover effects
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

    // Skill item click effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Contact item ripple effects
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
    
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
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
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize typing effect
function initializeTypingEffect() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                nameElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Initialize floating particles
function initializeParticles() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
        `;
        header.appendChild(particle);
    }
    
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Audio Player functionality
function initializeAudioPlayers() {
    console.log('Initializing audio players...');
    
    const playButtons = document.querySelectorAll('.play-button');
    const audioPlayers = document.querySelectorAll('audio');
    
    console.log(`Found ${playButtons.length} play buttons and ${audioPlayers.length} audio elements`);
    
    if (playButtons.length === 0) {
        console.error('No play buttons found!');
        return;
    }
    
    // Setup click handlers for play buttons
    playButtons.forEach((button, index) => {
        console.log(`Setting up button ${index + 1}:`, button);
        
        // Remove any existing listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Play button clicked:', this);
            
            const audioId = this.getAttribute('data-audio');
            console.log('Audio ID:', audioId);
            
            const audio = document.getElementById(audioId);
            if (!audio) {
                console.error('Audio element not found for ID:', audioId);
                alert('خطأ: لم يتم العثور على الملف الصوتي');
                return;
            }
            
            console.log('Audio element found:', audio);
            
            const audioPlayer = audio.parentElement;
            const progressBar = audioPlayer.querySelector('.progress-bar');
            const timeDisplay = audioPlayer.querySelector('.time-display');
            const playIcon = this.querySelector('i');
            const playText = this.querySelector('span');
            
            // Stop all other audio players
            audioPlayers.forEach(otherAudio => {
                if (otherAudio !== audio && !otherAudio.paused) {
                    console.log('Stopping other audio:', otherAudio.id);
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                    
                    const otherButton = document.querySelector(`[data-audio="${otherAudio.id}"]`);
                    if (otherButton) {
                        const otherPlayer = otherAudio.parentElement;
                        const otherIcon = otherButton.querySelector('i');
                        const otherText = otherButton.querySelector('span');
                        
                        otherButton.classList.remove('playing');
                        otherPlayer.classList.remove('active');
                        if (otherIcon) otherIcon.className = 'fas fa-play';
                        if (otherText) otherText.textContent = 'تشغيل';
                    }
                }
            });
            
            // Toggle play/pause
            if (audio.paused) {
                console.log('Playing audio:', audioId);
                
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Audio started playing successfully');
                        this.classList.add('playing');
                        audioPlayer.classList.add('active');
                        if (playIcon) playIcon.className = 'fas fa-pause';
                        if (playText) playText.textContent = 'إيقاف';
                    }).catch(error => {
                        console.error('Error playing audio:', error);
                        alert('حدث خطأ في تشغيل الملف الصوتي: ' + error.message);
                    });
                }
            } else {
                console.log('Pausing audio:', audioId);
                audio.pause();
                this.classList.remove('playing');
                if (playIcon) playIcon.className = 'fas fa-play';
                if (playText) playText.textContent = 'تشغيل';
            }
        });
    });
    
    // Setup audio event listeners
    audioPlayers.forEach((audio, index) => {
        console.log(`Setting up audio events for: ${audio.id}`);
        
        const button = document.querySelector(`[data-audio="${audio.id}"]`);
        if (!button) {
            console.error('Button not found for audio:', audio.id);
            return;
        }
        
        const audioPlayer = audio.parentElement;
        const progressContainer = audioPlayer.querySelector('.progress-container');
        const progressBar = audioPlayer.querySelector('.progress-bar');
        const timeDisplay = audioPlayer.querySelector('.time-display');
        const playIcon = button.querySelector('i');
        const playText = button.querySelector('span');
        
        // Audio loading events
        audio.addEventListener('loadstart', function() {
            console.log('Started loading audio:', this.id);
        });
        
        audio.addEventListener('canplay', function() {
            console.log('Audio can start playing:', this.id);
        });
        
        audio.addEventListener('loadedmetadata', function() {
            console.log('Audio metadata loaded for:', this.id);
            if (this.duration && timeDisplay) {
                const durationMinutes = Math.floor(this.duration / 60);
                const durationSeconds = Math.floor(this.duration % 60);
                timeDisplay.textContent = 
                    `00:00 / ${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
            }
        });
        
        // Audio playback events
        audio.addEventListener('timeupdate', function() {
            if (this.duration && progressBar && timeDisplay) {
                const progressPercent = (this.currentTime / this.duration) * 100;
                progressBar.style.width = progressPercent + '%';
                
                const currentMinutes = Math.floor(this.currentTime / 60);
                const currentSeconds = Math.floor(this.currentTime % 60);
                const durationMinutes = Math.floor(this.duration / 60);
                const durationSeconds = Math.floor(this.duration % 60);
                
                timeDisplay.textContent = 
                    `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')} / ` +
                    `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
            }
        });
        
        audio.addEventListener('ended', function() {
            console.log('Audio ended:', this.id);
            if (button) {
                button.classList.remove('playing');
                audioPlayer.classList.remove('active');
                if (playIcon) playIcon.className = 'fas fa-play';
                if (playText) playText.textContent = 'تشغيل';
            }
            if (progressBar) progressBar.style.width = '0%';
            if (timeDisplay) timeDisplay.textContent = '00:00 / 00:00';
        });
        
        // Audio error handling
        audio.addEventListener('error', function(e) {
            console.error('Audio error for', this.id, ':', e);
            if (button && playText) {
                button.disabled = true;
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
                playText.textContent = 'ملف غير متوفر';
            }
            alert('خطأ في تحميل الملف الصوتي: ' + this.id);
        });
        
        // Progress bar click handling
        if (progressContainer) {
            progressContainer.addEventListener('click', function(e) {
                if (audio.duration) {
                    const rect = this.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const progressPercent = (clickX / rect.width) * 100;
                    const newTime = (progressPercent / 100) * audio.duration;
                    audio.currentTime = newTime;
                    console.log('Seeking to:', newTime);
                }
            });
        }
    });
    
    console.log('Audio players initialization completed');
}

// Add audio visualization
function addAudioVisualization() {
    const audioItems = document.querySelectorAll('.audio-item');
    
    audioItems.forEach(item => {
        const audio = item.querySelector('audio');
        const icon = item.querySelector('.audio-icon i');
        
        if (audio && icon) {
            audio.addEventListener('play', function() {
                icon.style.animation = 'pulse 1s infinite';
            });
            
            audio.addEventListener('pause', function() {
                icon.style.animation = '';
            });
            
            audio.addEventListener('ended', function() {
                icon.style.animation = '';
            });
        }
    });
}

// Mark as initialized
function markAsInitialized() {
    document.body.setAttribute('data-audio-initialized', 'true');
    document.querySelectorAll('.play-button').forEach(button => {
        button.setAttribute('data-initialized', 'true');
    });
    console.log('Marked as initialized');
}

// Backup initialization for different loading states
if (document.readyState === 'loading') {
    // DOM is still loading, handled by DOMContentLoaded above
    console.log('DOM is still loading...');
} else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // DOM already loaded
    console.log('DOM already loaded, initializing immediately...');
    setTimeout(() => {
        if (!document.body.getAttribute('data-audio-initialized')) {
            console.log('Running backup initialization...');
            initializeAudioPlayers();
            markAsInitialized();
        }
    }, 100);
}

// Final fallback after full page load
window.addEventListener('load', function() {
    console.log('Window fully loaded, final check...');
    setTimeout(() => {
        if (!document.body.getAttribute('data-audio-initialized')) {
            console.log('Running final fallback initialization...');
            initializeAudioPlayers();
            markAsInitialized();
        }
    }, 200);
});

console.log('Audio player script fully loaded and ready');
