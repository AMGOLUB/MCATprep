// Load user credentials from external file
let userCredentials = {};

// Load the users.json file
fetch('users.json')
    .then(response => response.json())
    .then(data => {
        userCredentials = data;
    })
    .catch(error => {
        console.error('Error loading user credentials:', error);
        // Fallback credentials if file doesn't load
        userCredentials = {
            "demo": "password123"
        };
    });

// Check if user is already logged in
if (sessionStorage.getItem('authenticated') === 'true') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
}

// MCAT Countdown Timer
function updateCountdown() {
    // Set the MCAT date - February 25, 2026
    const mcatDate = new Date('February 25, 2026 08:00:00').getTime();
    
    // Get current date and time
    const now = new Date().getTime();
    
    // Calculate the difference
    const distance = mcatDate - now;
    
    // Calculate days and total hours
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(distance / (1000 * 60 * 60));
    
    // Update the countdown display
    const countdownCard = document.getElementById('countdownCard');
    if (countdownCard && distance > 0) {
        countdownCard.innerHTML = `
            <div class="stat-number">${days}</div>
            <div class="stat-label">Days Until MCAT</div>
            <div style="font-size: 0.9rem; color: #94a3b8; margin-top: 4px;">${totalHours.toLocaleString()} hours</div>
        `;
    } else if (countdownCard && distance <= 0) {
        countdownCard.innerHTML = `
            <div class="stat-number">0</div>
            <div class="stat-label">Good luck on your MCAT!</div>
        `;
    }
}

// Update countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMessage');
    
    if (userCredentials[username] && userCredentials[username] === password) {
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('username', username);
        // Hide error message if it was showing
        errorMsg.style.display = 'none';
        errorMsg.classList.remove('show');
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appContainer').style.display = 'block';
    } else {
        // Show error message smoothly
        errorMsg.style.display = 'block';
        // Use setTimeout to ensure the display change happens before opacity transition
        setTimeout(() => {
            errorMsg.classList.add('show');
        }, 10);
        document.getElementById('passwordInput').value = '';
    }
});

// Logout functionality
function logout() {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('username');
    location.reload();
}

// Navigation tabs
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding section
        const sectionId = this.getAttribute('data-section');
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    });
});

// Video modal functionality for YouTube videos
function openVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    // Replace YOUR_VIDEO_ID with the actual YouTube video ID
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.add('active');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Direct video link functionality for non-YouTube videos
function openDirectVideo(videoUrl) {
    // Open video in new tab for direct video files
    window.open(videoUrl, '_blank');
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    modal.classList.remove('active');
    iframe.src = '';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('videoModal').classList.contains('active')) {
        closeVideo();
    }
});

// Close modal when clicking outside
document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeVideo();
    }
});

// Smooth scroll to topic section
function scrollToTopic(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest' 
        });
    }
};
