// Initialize variables
let corruptionLevel = 0;
let sessionTimer;
let sessionSeconds = 300; // 5 minutes

// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    updateTimerDisplay();
    
    // Add event listener to login button
    document.getElementById('login-btn').addEventListener('click', attemptLogin);
    
    // Also allow login on Enter key press
    document.getElementById('login-password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });
});

// Attempt login ritual
function attemptLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorElement = document.getElementById('login-error');
    
    console.log("Login attempted with:", username, password); // Debug line
    
    // Dark entities verification
    const validCredentials = [
        { user: "h00810", pass: "Xv]{gxy~uj86!bC" }
    ];
    
    const isValid = validCredentials.some(cred => {
        return cred.user === username.toLowerCase() && 
               cred.pass === password.toLowerCase();
    });
    
    if (isValid) {
        console.log("Login successful!"); // Debug line
        // Successful summoning
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        startCorruptionTimer();
        showSection('decrypt');
        increaseCorruption(10);
    } else {
        console.log("Login failed!"); // Debug line
        errorElement.style.display = 'block';
        document.querySelector('.occult-symbol').textContent = '✖';
        increaseCorruption(5);
        
        setTimeout(() => {
            errorElement.style.display = 'none';
            document.querySelector('.occult-symbol').textContent = '✹';
        }, 3000);
    }
}


// Corruption system
// Show trailer modal
function showTrailer() {
    document.getElementById('trailer-modal').style.display = 'flex';
}

// Hide trailer modal
function closeTrailer() {
    document.getElementById('trailer-modal').style.display = 'none';
}
// Show unavailable modal
function showUnavailable(text) {
    document.getElementById('unavailable-text').textContent = text;
    document.getElementById('unavailable-modal').style.display = 'flex';
}

// Hide unavailable modal
function closeUnavailable() {
    document.getElementById('unavailable-modal').style.display = 'none';
}
function increaseCorruption(amount) {
    corruptionLevel = Math.min(100, corruptionLevel + amount);
    updateCorruptionDisplay();
}

function updateCorruptionDisplay() {
    document.getElementById('corruption-value').textContent = `${corruptionLevel}%`;
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    const section = document.getElementById(sectionId);
    section.style.display = 'block';

    if (sectionId === 'games') {
        checkMediaFiles();
    }
    
    // Debugging: Log the media paths
    if (sectionId === 'games') {
        const img = document.getElementById('game-poster');
        const video = document.getElementById('game-trailer');
        console.log('Image path:', img.src);
        console.log('Video path:', video.querySelector('source').src);
        
        // Force reload media
        img.src = img.src.split('?')[0] + '?t=' + Date.now();
        video.querySelector('source').src = video.querySelector('source').src.split('?')[0] + '?t=' + Date.now();
        video.load();
    }
}

function checkMediaFiles() {
    const img = document.getElementById('game-image');
    const video = document.getElementById('game-video');
    
    // Test image load
    fetch(img.src)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            console.log(`✅ Image found at: ${img.src}`);
            img.onerror = null; // Remove error handler if loaded
        })
        .catch(error => {
            console.error(`❌ Image not found at: ${img.src}`);
            console.log(`Full URL: ${window.location.origin}${img.src}`);
        });

    // Test video load
    fetch(video.querySelector('source').src)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            console.log(`✅ Video found at: ${video.querySelector('source').src}`);
        })
        .catch(error => {
            console.error(`❌ Video not found at: ${video.querySelector('source').src}`);
        });
}

// Timer functions
function startCorruptionTimer() {
    sessionTimer = setInterval(function() {
        sessionSeconds--;
        updateTimerDisplay();
        
        if (sessionSeconds <= 0) {
            clearInterval(sessionTimer);
            // Entity manifestation event would go here
        }
        
        // Random corruption increase
        if (Math.random() < 0.1) {
            increaseCorruption(1);
        }
    }, 1000);
}


function loadGameMedia() {
    // Update these paths to match your actual files in public folder
    const imageElement = document.getElementById('game-image');
    const videoElement = document.getElementById('game-video');
    
    // Set your image path (put your image in public/games folder)
    imageElement.src = "games/game-image.jpg"; // Change to your actual filename
    
    // Set your video path (put your video in public/games folder)
    videoElement.querySelector('source').src = "games/game-video.mp4"; // Change to your actual filename
    videoElement.load();
}

function updateTimerDisplay() {
    const minutes = Math.floor(sessionSeconds / 60);
    const seconds = sessionSeconds % 60;
    document.getElementById('timer-value').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function logout() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-overlay').style.display = 'flex';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    clearInterval(sessionTimer);
    sessionSeconds = 300;
    corruptionLevel = 0;
    updateCorruptionDisplay();
    updateTimerDisplay();
}
