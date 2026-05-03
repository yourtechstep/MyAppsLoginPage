/* ============================================
   LOGIN PAGE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Load saved email if "Remember me" was checked
    loadSavedEmail();

    // Real-time validation
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateEmail();
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validatePassword();
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            // Save email if "Remember me" is checked
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedEmail', emailInput.value);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Simulate login success
            showSuccessMessage();
            
            // Redirect to home page after delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        }
    });

    // Email validation
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[a-zA-Z0-9_]{3,}$/;

        if (!email) {
            showError(emailInput, emailError, 'Email or username is required');
            return false;
        }

        if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email or username');
            return false;
        }

        clearError(emailInput, emailError);
        return true;
    }

    // Password validation
    function validatePassword() {
        const password = passwordInput.value;

        if (!password) {
            showError(passwordInput, passwordError, 'Password is required');
            return false;
        }

        if (password.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
            return false;
        }

        clearError(passwordInput, passwordError);
        return true;
    }

    // Show error state
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Clear error state
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Load saved email from localStorage
    function loadSavedEmail() {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberMeCheckbox.checked = true;
        }
    }

    // Show success message
    function showSuccessMessage() {
        const originalButtonText = loginForm.querySelector('.btn-primary').textContent;
        loginForm.querySelector('.btn-primary').textContent = '✓ Login Successful!';
        loginForm.querySelector('.btn-primary').style.backgroundColor = '#10b981';
    }

    // Handle forgot password link
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset feature coming soon!');
    });

    // Handle sign up link
    document.querySelector('.signup-link').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Sign up feature coming soon!');
    });
});
