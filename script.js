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
    const imagePath = getImagePath(randomImage);
    
    img.src = imagePath;
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
        console.warn('Failed to load image:', this.src);
        // Try alternative path without encoding
        const originalPath = randomImage;
        if (this.src !== originalPath) {
            this.src = originalPath;
        } else {
            this.remove();
        }
    };
    
    // Handle successful image load
    img.onload = function() {
        // Image loaded successfully - uncomment for debugging
        // console.log('✓ Loaded:', this.src);
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

// Get base URL - works in both dev and production
const BASE_URL = import.meta.env.BASE_URL || '/';

// Helper function to get properly encoded image path
function getImagePath(imageFile) {
    // Remove leading slash if present, we'll add it with BASE_URL
    let cleanPath = imageFile.startsWith('/') ? imageFile.slice(1) : imageFile;
    
    // Ensure BASE_URL ends with / and cleanPath doesn't start with /
    const base = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
    const path = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
    
    // Check if filename has special characters that need encoding
    const pathParts = path.split('/');
    if (pathParts.length > 0) {
        const filename = pathParts[pathParts.length - 1];
        const directory = pathParts.slice(0, -1).join('/');
        
        // Only encode if filename has special characters (spaces, parentheses, etc.)
        const needsEncoding = /[ ()]/.test(filename);
        const finalFilename = needsEncoding ? encodeURIComponent(filename) : filename;
        const fullPath = directory ? `${base}${directory}/${finalFilename}` : `${base}${finalFilename}`;
        return fullPath;
    }
    return base + path;
}

// Start floating images when page loads
window.addEventListener('load', () => {
    // Test if images are accessible
    const testImg = new Image();
    const testPath = getImagePath(imageFiles[0]);
    console.log('Environment:', {
        BASE_URL: BASE_URL,
        MODE: import.meta.env.MODE,
        PROD: import.meta.env.PROD,
        DEV: import.meta.env.DEV
    });
    console.log('Testing image path:', testPath);
    console.log('Original path:', imageFiles[0]);
    
    testImg.onload = () => {
        console.log('✓ Images are loading correctly from:', testPath);
        initFloatingImages();
    };
    testImg.onerror = () => {
        console.error('✗ Failed to load test image:', testPath);
        console.error('Trying alternative paths...');
        
        // Try 1: Direct path without encoding
        const directPath = BASE_URL + (imageFiles[0].startsWith('/') ? imageFiles[0].slice(1) : imageFiles[0]);
        console.log('Trying direct path (no encoding):', directPath);
        testImg.src = directPath;
        
        testImg.onerror = () => {
            // Try 2: Absolute path from root
            const absolutePath = imageFiles[0];
            console.log('Trying absolute path:', absolutePath);
            testImg.src = absolutePath;
            
            testImg.onerror = () => {
                // Try 3: Relative path
                const relativePath = 'images/' + imageFiles[0].split('/').pop();
                console.log('Trying relative path:', relativePath);
                testImg.src = relativePath;
                
                testImg.onerror = () => {
                    console.error('✗ All path attempts failed');
                    console.error('Please check:');
                    console.error('1. Images are in public/images/ folder');
                    console.error('2. Images are committed to git');
                    console.error('3. Vercel build includes the public folder');
                    console.error('4. Check Network tab in DevTools to see what URLs are being requested');
                    // Try to initialize anyway - maybe some images will work
                    initFloatingImages();
                };
                
                testImg.onload = () => {
                    console.log('✓ Relative path worked!');
                    initFloatingImages();
                };
            };
            
            testImg.onload = () => {
                console.log('✓ Absolute path worked!');
                initFloatingImages();
            };
        };
        
        testImg.onload = () => {
            console.log('✓ Direct path worked!');
            initFloatingImages();
        };
    };
    testImg.src = testPath;
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

