// main.js - Registration UI/UX Exercise

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    feather.replace();

    /* =========================================
       TAB NAVIGATION LOGIC
       ========================================= */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const viewSections = document.querySelectorAll('.view-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked tab
            btn.classList.add('active');

            // Hide all views
            viewSections.forEach(v => v.classList.remove('active'));
            
            // Show target view
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* =========================================
       FORM VALIDATION & UI LOGIC
       ========================================= */
    const registerForm = document.getElementById('register-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // UI Feedback Elements
    const strengthContainer = document.getElementById('strength-container');
    const strengthText = document.getElementById('strength-text');
    const bar1 = document.getElementById('bar-1');
    const bar2 = document.getElementById('bar-2');
    const bar3 = document.getElementById('bar-3');

    // Toggle Password Visibility
    const toggleBtns = document.querySelectorAll('.toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = btn.querySelector('svg');

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.outerHTML = feather.icons['eye'].toSvg();
            } else {
                targetInput.type = 'password';
                icon.outerHTML = feather.icons['eye-off'].toSvg();
            }
        });
    });

    // Helper functions for errors
    const showError = (inputElement, message) => {
        inputElement.classList.add('is-invalid');
        const errorElement = document.getElementById(`error-${inputElement.id}`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    };

    const clearError = (inputElement) => {
        inputElement.classList.remove('is-invalid');
        const errorElement = document.getElementById(`error-${inputElement.id}`);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    };

    // Validation rules
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Password strength meter
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        if (val.length > 0) {
            strengthContainer.style.display = 'block';
        } else {
            strengthContainer.style.display = 'none';
            return;
        }

        let strength = 0;
        if (val.length >= 8) strength += 1;
        if (val.match(/[a-z]+/)) strength += 1; // has lowercase
        if (val.match(/[A-Z]+/)) strength += 1; // has uppercase
        if (val.match(/[0-9]+/)) strength += 1; // has number
        if (val.match(/[$@#&!]+/)) strength += 1; // has special char

        // Reset bars
        bar1.style.backgroundColor = 'var(--border-color)';
        bar2.style.backgroundColor = 'var(--border-color)';
        bar3.style.backgroundColor = 'var(--border-color)';

        if (strength <= 2) {
            bar1.style.backgroundColor = '#ef4444'; // Red - Weak
            strengthText.textContent = 'Yếu';
            strengthText.style.color = '#ef4444';
        } else if (strength === 3 || strength === 4) {
            bar1.style.backgroundColor = '#f59e0b'; // Orange - Medium
            bar2.style.backgroundColor = '#f59e0b';
            strengthText.textContent = 'Trung bình';
            strengthText.style.color = '#f59e0b';
        } else if (strength >= 5) {
            bar1.style.backgroundColor = '#10b981'; // Green - Strong
            bar2.style.backgroundColor = '#10b981';
            bar3.style.backgroundColor = '#10b981';
            strengthText.textContent = 'Mạnh';
            strengthText.style.color = '#10b981';
        }

        // Clear error if user starts typing a better password
        if (val.length >= 8) {
            clearError(passwordInput);
        }
    });

    // Clear error on input focus/type
    const inputs = [fullnameInput, emailInput, passwordInput, confirmPasswordInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });

    // Form Submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        let isValid = true;

        // 1. Validate Full Name
        if (fullnameInput.value.trim() === '') {
            showError(fullnameInput, 'Vui lòng nhập họ và tên.');
            isValid = false;
        }

        // 2. Validate Email
        const emailVal = emailInput.value.trim();
        if (emailVal === '') {
            showError(emailInput, 'Vui lòng nhập email.');
            isValid = false;
        } else if (!isValidEmail(emailVal)) {
            showError(emailInput, 'Email không hợp lệ. Vui lòng kiểm tra lại.');
            isValid = false;
        }

        // 3. Validate Password
        const passVal = passwordInput.value;
        if (passVal === '') {
            showError(passwordInput, 'Vui lòng nhập mật khẩu.');
            isValid = false;
        } else if (passVal.length < 8) {
            showError(passwordInput, 'Mật khẩu phải có ít nhất 8 ký tự.');
            isValid = false;
        }

        // 4. Validate Confirm Password
        const confirmVal = confirmPasswordInput.value;
        if (confirmVal === '') {
            showError(confirmPasswordInput, 'Vui lòng xác nhận mật khẩu.');
            isValid = false;
        } else if (confirmVal !== passVal) {
            showError(confirmPasswordInput, 'Mật khẩu xác nhận không khớp.');
            isValid = false;
        }

        // If all valid, show success page
        if (isValid) {
            // Simulated API call or immediate transition
            document.getElementById('register-container').classList.remove('active-view');
            document.getElementById('success-container').classList.add('active-view');
        }
    });

    // Success Actions
    document.getElementById('btn-back').addEventListener('click', () => {
        // Reset form and go back
        registerForm.reset();
        inputs.forEach(clearError);
        strengthContainer.style.display = 'none';
        
        document.getElementById('success-container').classList.remove('active-view');
        document.getElementById('register-container').classList.add('active-view');
    });

    document.getElementById('btn-continue').addEventListener('click', () => {
        alert('Chuyển hướng đến Dashboard hoặc trang chính...');
    });
});
