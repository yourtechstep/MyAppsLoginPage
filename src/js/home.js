/* ============================================
   HOME PAGE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDropdown();
    displayWelcomeMessage();
    setupResponsiveMenu();
});

// ============================================
// NAVIGATION SETUP
// ============================================

function initializeNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || mobileMenuToggle.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ============================================
// DROPDOWN MENU
// ============================================

function initializeDropdown() {
    const userMenuToggle = document.getElementById('userMenuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (userMenuToggle && dropdownMenu) {
        userMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
            userMenuToggle.setAttribute('aria-expanded', 
                userMenuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });

        // Close dropdown when clicking on a link
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                dropdownMenu.classList.remove('active');
                userMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = dropdownMenu.contains(event.target) || userMenuToggle.contains(event.target);
            if (!isClickInside && dropdownMenu.classList.contains('active')) {
                dropdownMenu.classList.remove('active');
                userMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ============================================
// WELCOME MESSAGE
// ============================================

function displayWelcomeMessage() {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        const userName = localStorage.getItem('userName') || 'John';
        userNameElement.textContent = userName;
    }
}

// ============================================
// RESPONSIVE MENU
// ============================================

function setupResponsiveMenu() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default for demo links
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const linkText = this.textContent.trim();
                handleNavigation(linkText);
            }
        });
    });
}

// ============================================
// NAVIGATION HANDLER
// ============================================

function handleNavigation(section) {
    switch(section) {
        case 'Dashboard':
            console.log('Dashboard clicked');
            break;
        case 'Projects':
            console.log('Projects clicked');
            break;
        case 'Settings':
            console.log('Settings clicked');
            break;
        default:
            console.log('Navigation to:', section);
    }
}

// ============================================
// QUICK ACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });
});

function handleQuickAction(action) {
    switch(action) {
        case '+ New Project':
            alert('Create new project dialog would open here');
            break;
        case 'View All Projects':
            alert('Projects page would load here');
            break;
        case 'Export Report':
            alert('Report export would start here');
            break;
        case 'Team Members':
            alert('Team members dialog would open here');
            break;
        default:
            console.log('Action:', action);
    }
}

// ============================================
// SMOOTH ANIMATIONS ON SCROLL
// ============================================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.5s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const cards = document.querySelectorAll('.stat-card, .project-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

// ============================================
// LOGOUT FUNCTIONALITY
// ============================================

const logoutLink = document.querySelector('.logout');
if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Clear stored data
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');
        
        // Redirect to login
        window.location.href = 'login.html';
    });
}

// ============================================
// ADD SLIDE UP ANIMATION
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
