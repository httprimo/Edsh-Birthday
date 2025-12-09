// List of images in the images folder (using absolute path for Vite/Vercel)
const imageFiles = [
    '/images/IMG_1405.jpg',
    '/images/IMG_20230105_211559_759.jpg',
    '/images/IMG_20230115_151149_144.jpg',
    '/images/IMG_20230115_151458_659.jpg',
    '/images/IMG_20230115_151648_406.jpg',
    '/images/IMG_20230124_182102_860.jpg',
    '/images/IMG_20230128_172735_714.jpg',
    '/images/IMG_20230213_080721_085.jpg',
    '/images/IMG20221210202556 (1).jpg',
    '/images/IMG20221210202703.jpg',
    '/images/IMG20221210202953.jpg',
    '/images/IMG20230115140053.jpg',
    '/images/IMG20230123165816.jpg',
    '/images/IMG20230123165825.jpg',
    '/images/IMG20230123165841.jpg',
    '/images/IMG20230218134528.jpg',
    '/images/IMG20230218225333.jpg',
    '/images/IMG20230414200247.jpg'
];

// Create floating images
function createFloatingImage() {
    const imageContainer = document.querySelector('.floating-images');
    if (!imageContainer) return;
    
    const img = document.createElement('img');
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    img.src = randomImage;
    img.className = 'floating-image';
    img.alt = 'Memory';
    
    // Random starting position
    img.style.left = Math.random() * 100 + '%';
    img.style.animationDuration = (Math.random() * 10 + 20) + 's';
    img.style.animationDelay = Math.random() * 5 + 's';
    
    // Random horizontal movement direction and intensity
    const horizontalRange = (Math.random() * 200 + 150); // 150px to 350px range
    const direction = Math.random() > 0.5 ? 1 : -1;
    const finalX = horizontalRange * direction;
    
    // Create custom animation with more roaming
    const animationName = `floatImage-${Math.random().toString(36).substr(2, 9)}`;
    const styleSheet = document.styleSheets[0];
    
    // Create keyframes with random roaming pattern
    const keyframes = `
        @keyframes ${animationName} {
            0% {
                transform: translateY(100vh) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.4;
                transform: translateY(80vh) translateX(${Math.random() * 100 - 50}px) rotate(90deg);
            }
            25% {
                transform: translateY(60vh) translateX(${Math.random() * 150 - 75}px) rotate(180deg);
            }
            40% {
                transform: translateY(45vh) translateX(${Math.random() * 200 - 100}px) rotate(270deg);
            }
            55% {
                transform: translateY(30vh) translateX(${Math.random() * 150 - 75}px) rotate(360deg);
            }
            70% {
                transform: translateY(15vh) translateX(${Math.random() * 200 - 100}px) rotate(450deg);
            }
            85% {
                transform: translateY(5vh) translateX(${Math.random() * 150 - 75}px) rotate(540deg);
            }
            90% {
                opacity: 0.4;
            }
            100% {
                transform: translateY(-100px) translateX(${finalX}px) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    
    // Inject the keyframes
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    
    // Apply the custom animation
    img.style.animationName = animationName;
    img.style.animationDuration = (Math.random() * 10 + 20) + 's';
    img.style.animationTimingFunction = 'ease-in-out';
    img.style.animationIterationCount = '1';
    
    // Random size variation
    const size = Math.random() * 100 + 100; // 100px to 200px
    img.style.width = size + 'px';
    img.style.height = size + 'px';
    
    // Handle image load errors
    img.onerror = function() {
        this.remove();
    };
    
    imageContainer.appendChild(img);
    
    // Remove image after animation completes
    setTimeout(() => {
        if (img.parentNode) {
            img.remove();
        }
    }, 25000);
}

// Initialize floating images
function initFloatingImages() {
    // Create initial batch of images
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFloatingImage();
        }, i * 2000);
    }
    
    // Continuously create new floating images
    setInterval(() => {
        createFloatingImage();
    }, 3000);
}

// Start floating images when page loads
window.addEventListener('load', () => {
    initFloatingImages();
});

// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.querySelector('.hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Create confetti
function createConfetti() {
    const colors = ['#ff6b9d', '#4facfe', '#f093fb', '#ffd93d', '#764ba2', '#00f2fe'];
    const confettiContainer = document.querySelector('.confetti');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// Add click interaction
document.querySelector('.card').addEventListener('click', function(e) {
    if (e.target !== this) return;
    
    // Create burst of hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 50);
    }
    
    // Create confetti burst
    createConfetti();
});

// Continuous gentle heart animation
setInterval(() => {
    if (Math.random() > 0.7) {
        createHeart();
    }
}, 2000);

// Initial confetti on load
window.addEventListener('load', () => {
    setTimeout(() => {
        createConfetti();
    }, 500);
});

// Add sparkle effect on hover
document.querySelectorAll('.heart-text, .name, .title').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px rgba(118, 75, 162, 0.5)';
        this.style.transition = 'text-shadow 0.3s ease';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
});

