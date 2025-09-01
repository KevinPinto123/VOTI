// Variables globales para login
let currentLoginTab = 'email';
let currentLanguage = 'es';
let isHighContrast = false;
let textSizeMultiplier = 1;

// Traducciones
const translations = {
    es: {
        title: 'VOTI',
        subtitle: 'Información política clara, neutral y verificada',
        loginTitle: 'Iniciar Sesión',
        loginDescription: 'Accede a información política confiable y neutral',
        continueWithGoogle: 'Continuar con Google',
        continueWithFacebook: 'Continuar con Facebook',
        email: 'Correo',
        phone: 'Teléfono',
        emailLabel: 'Correo electrónico',
        passwordLabel: 'Contraseña',
        phoneLabel: 'Número de teléfono',
        rememberMe: 'Recordarme',
        forgotPassword: '¿Olvidaste tu contraseña?',
        loginButton: 'Iniciar Sesión',
        sendSMS: 'Enviar código SMS',
        verificationCode: 'Código de verificación',
        verifyCode: 'Verificar código',
        noAccount: '¿No tienes cuenta?',
        registerHere: 'Regístrate aquí',
        securityTitle: 'Tu información está segura',
        securityText: 'Utilizamos encriptación de extremo a extremo y nunca compartimos tus datos personales.',
        accessibilityOptions: 'Opciones de Accesibilidad',
        largerText: 'Texto más grande',
        highContrast: 'Alto contraste',
        screenReader: 'Lector de pantalla',
        loggingIn: 'Iniciando sesión...',
        didntReceiveCode: '¿No recibiste el código?',
        resend: 'Reenviar'
    },
    qu: {
        title: 'VOTI',
        subtitle: 'Política willaykunata chiqan, mana kaqllayuq, chiqaqchasqa',
        loginTitle: 'Yaykuy',
        loginDescription: 'Política willaykunaman chiqan chaninchaywan yaykuy',
        continueWithGoogle: 'Google kaqwan qatiy',
        continueWithFacebook: 'Facebook kaqwan qatiy',
        email: 'Correo',
        phone: 'Telefono',
        emailLabel: 'Correo electrónico',
        passwordLabel: 'Yaykuna rimay',
        phoneLabel: 'Telefono yupay',
        rememberMe: 'Yuyariway',
        forgotPassword: '¿Yaykuna rimaykita qunqarqankichu?',
        loginButton: 'Yaykuy',
        sendSMS: 'SMS código kachay',
        verificationCode: 'Chiqaqchay código',
        verifyCode: 'Código chiqaqchay',
        noAccount: '¿Mana cuentayuqchu kanki?',
        registerHere: 'Kaypi qillqakuy',
        securityTitle: 'Willayniykikuna waqaychasqa kanku',
        securityText: 'Tukuy kaqmanta tukuy kaqman cifrado nisqawan llamkanchik, manaña sapan willayniykikunata rakinchikchu.',
        accessibilityOptions: 'Yanapakuy akllanakunata',
        largerText: 'Aswan hatun qillqa',
        highContrast: 'Hatun contraste',
        screenReader: 'Pantalla ñawiriq',
        loggingIn: 'Yaykuchkan...',
        didntReceiveCode: '¿Mana códigota chaskirkankichu?',
        resend: 'Yapamanta kachay'
    },
    ay: {
        title: 'VOTI',
        subtitle: 'Política yatiyawinaka chiqapa, janiw kunjamakiti, chiqachatawa',
        loginTitle: 'Mantaña',
        loginDescription: 'Política yatiyawinakaruw chiqapa uñachtʼayasaw mantaña',
        continueWithGoogle: 'Google ukamp sarañani',
        continueWithFacebook: 'Facebook ukamp sarañani',
        email: 'Correo',
        phone: 'Telefono',
        emailLabel: 'Correo electrónico',
        passwordLabel: 'Mantañ aru',
        phoneLabel: 'Telefono jakhu',
        rememberMe: 'Amtasiñama',
        forgotPassword: '¿Mantañ arum armktʼtati?',
        loginButton: 'Mantaña',
        sendSMS: 'SMS código apayaña',
        verificationCode: 'Chiqachaña código',
        verifyCode: 'Código chiqachaña',
        noAccount: '¿Janiw cuentam utjkiti?',
        registerHere: 'Akanx qillqantasiñama',
        securityTitle: 'Yatiyawinakamax jarkʼatawa',
        securityText: 'Taqi tuqit taqi tuqir cifrado ukamp irnaqapxta, janiw sapa yatiyawinakamax jaljayapxkiti.',
        accessibilityOptions: 'Yanaptʼañ ajllirinaka',
        largerText: 'Jukʼamp jachʼa qillqa',
        highContrast: 'Jachʼa contraste',
        screenReader: 'Pantalla ullaña',
        loggingIn: 'Mantaskakiwa...',
        didntReceiveCode: '¿Janiw códigor katjkiti?',
        resend: 'Mayamp apayaña'
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
    setupLoginEventListeners();
    updateLanguage();
});

// Inicializar login
function initializeLogin() {
    // Configurar tabs
    setupLoginTabs();
    
    // Configurar inputs SMS
    setupSMSInputs();
    
    // Configurar validación de formularios
    setupFormValidation();
    
    // Aplicar configuraciones guardadas
    loadSavedSettings();
}

// Configurar event listeners
function setupLoginEventListeners() {
    // Prevenir envío de formularios
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    });
    
    // Configurar inputs de teléfono
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Formatear número de teléfono
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
            }
            e.target.value = value;
        });
    }
}

// Configurar tabs de login
function setupLoginTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.login-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchLoginTab(tabName);
        });
    });
}

// Cambiar tab de login
function switchLoginTab(tabName) {
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Actualizar contenido
    document.querySelectorAll('.login-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-form`).classList.add('active');
    
    currentLoginTab = tabName;
}

// Configurar inputs SMS
function setupSMSInputs() {
    const smsInputs = document.querySelectorAll('.sms-digit');
    smsInputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                smsInputs[index - 1].focus();
            }
        });
        
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const paste = e.clipboardData.getData('text');
            const digits = paste.replace(/\D/g, '').slice(0, 6);
            
            digits.split('').forEach((digit, i) => {
                if (smsInputs[i]) {
                    smsInputs[i].value = digit;
                }
            });
            
            if (digits.length === 6) {
                verifySMSCode();
            }
        });
    });
}

// Mover foco en SMS
function moveSMSFocus(input, index) {
    if (input.value.length === 1) {
        const smsInputs = document.querySelectorAll('.sms-digit');
        if (index < smsInputs.length - 1) {
            smsInputs[index + 1].focus();
        } else {
            // Auto verificar si todos los campos están llenos
            const allFilled = Array.from(smsInputs).every(inp => inp.value.length === 1);
            if (allFilled) {
                setTimeout(() => verifySMSCode(), 500);
            }
        }
    }
}

// Login con Google
function loginWithGoogle() {
    showLoading();
    
    // Simular proceso de login
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Iniciando sesión con Google...');
        setTimeout(() => {
            redirectToMainApp();
        }, 2000);
    }, 2000);
}

// Login con Facebook
function loginWithFacebook() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Iniciando sesión con Facebook...');
        setTimeout(() => {
            redirectToMainApp();
        }, 2000);
    }, 2000);
}

// Login con email
function loginWithEmail() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showErrorMessage('Por favor completa todos los campos');
        return;
    }
    
    if (!isValidEmail(email)) {
        showErrorMessage('Por favor ingresa un correo válido');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('¡Bienvenido a VOTI!');
        setTimeout(() => {
            redirectToMainApp();
        }, 2000);
    }, 2000);
}

// Login con teléfono
function loginWithPhone() {
    const phone = document.getElementById('phone').value;
    
    if (!phone) {
        showErrorMessage('Por favor ingresa tu número de teléfono');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        document.getElementById('sms-verification').style.display = 'block';
        showSuccessMessage('Código SMS enviado');
        document.querySelectorAll('.sms-digit')[0].focus();
    }, 2000);
}

// Verificar código SMS
function verifySMSCode() {
    const smsInputs = document.querySelectorAll('.sms-digit');
    const code = Array.from(smsInputs).map(input => input.value).join('');
    
    if (code.length !== 6) {
        showErrorMessage('Por favor ingresa el código completo');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('¡Código verificado correctamente!');
        setTimeout(() => {
            redirectToMainApp();
        }, 2000);
    }, 1500);
}

// Reenviar código SMS
function resendSMSCode() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Código reenviado');
        
        // Limpiar inputs
        document.querySelectorAll('.sms-digit').forEach(input => {
            input.value = '';
        });
        document.querySelectorAll('.sms-digit')[0].focus();
    }, 1500);
}

// Mostrar formulario de registro
function showRegisterForm() {
    showInfoMessage('El registro estará disponible próximamente');
}

// Cambiar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    
    // Actualizar botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Guardar preferencia
    localStorage.setItem('voti-language', lang);
}

// Actualizar idioma
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Actualizar textos
    const elements = {
        'login-title': t.loginTitle,
        'form-description': t.loginDescription,
        'google-btn': t.continueWithGoogle,
        'facebook-btn': t.continueWithFacebook,
        'email-tab': t.email,
        'phone-tab': t.phone,
        'email-label': t.emailLabel,
        'password-label': t.passwordLabel,
        'phone-label': t.phoneLabel,
        'remember-label': t.rememberMe,
        'forgot-link': t.forgotPassword,
        'login-btn-text': t.loginButton,
        'sms-btn-text': t.sendSMS,
        'verification-label': t.verificationCode,
        'verify-btn-text': t.verifyCode,
        'no-account': t.noAccount,
        'register-link': t.registerHere,
        'security-title': t.securityTitle,
        'security-text': t.securityText,
        'accessibility-title': t.accessibilityOptions,
        'larger-text': t.largerText,
        'high-contrast': t.highContrast,
        'screen-reader': t.screenReader,
        'loading-text': t.loggingIn,
        'resend-text-1': t.didntReceiveCode,
        'resend-link': t.resend
    };
    
    Object.entries(elements).forEach(([id, text]) => {
        const element = document.getElementById(id) || document.querySelector(`[data-text="${id}"]`);
        if (element) {
            if (element.tagName === 'INPUT') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Actualizar placeholders
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.placeholder = currentLanguage === 'es' ? 'tu@correo.com' : 
                                 currentLanguage === 'qu' ? 'qam@correo.com' : 
                                 'juma@correo.com';
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.placeholder = '999 999 999';
    }
    
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.placeholder = currentLanguage === 'es' ? 'Tu contraseña' :
                                   currentLanguage === 'qu' ? 'Yaykuna rimayniki' :
                                   'Mantañ arumaxa';
    }
}

// Opciones de accesibilidad
function increaseTextSize() {
    textSizeMultiplier += 0.1;
    document.documentElement.style.fontSize = `${textSizeMultiplier}rem`;
    showSuccessMessage('Tamaño de texto aumentado');
}

function toggleHighContrast() {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle('high-contrast', isHighContrast);
    showSuccessMessage(isHighContrast ? 'Alto contraste activado' : 'Alto contraste desactivado');
}

function enableScreenReader() {
    showInfoMessage('Funcionalidad de lector de pantalla habilitada');
    
    // Agregar atributos ARIA mejorados
    document.querySelectorAll('input').forEach(input => {
        input.setAttribute('aria-describedby', 'screen-reader-help');
    });
    
    // Crear elemento de ayuda para lectores de pantalla
    if (!document.getElementById('screen-reader-help')) {
        const helpDiv = document.createElement('div');
        helpDiv.id = 'screen-reader-help';
        helpDiv.className = 'sr-only';
        helpDiv.textContent = 'Formulario de inicio de sesión de VOTI. Use Tab para navegar entre campos.';
        document.body.appendChild(helpDiv);
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Validación de formularios
function setupFormValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = 'var(--accent-red)';
                showErrorMessage('Correo electrónico inválido');
            } else {
                this.style.borderColor = 'var(--gray-300)';
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strength = getPasswordStrength(this.value);
            updatePasswordStrength(strength);
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                this.style.borderColor = 'var(--accent-red)';
                showErrorMessage('Número de teléfono inválido');
            } else {
                this.style.borderColor = 'var(--gray-300)';
            }
        });
    }
}

// Utilidades de validación
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\d{3}\s\d{3}\s\d{3}$/;
    return phoneRegex.test(phone);
}

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

function updatePasswordStrength(strength) {
    // Implementar indicador visual de fortaleza de contraseña
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
    const passwordInput = document.getElementById('password');
    if (passwordInput && strength > 0) {
        passwordInput.style.borderLeftColor = colors[strength - 1];
        passwordInput.style.borderLeftWidth = '4px';
    }
}

// Funciones de UI
function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

function showMessage(message, type) {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                           type === 'error' ? 'fa-exclamation-circle' : 
                           'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos del mensaje
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : 
                    type === 'error' ? '#ef4444' : 
                    '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Redireccionar a la aplicación principal
function redirectToMainApp() {
    // Guardar estado de login
    localStorage.setItem('voti-logged-in', 'true');
    localStorage.setItem('voti-login-time', Date.now().toString());
    
    // Redireccionar
    window.location.href = 'index.html';
}

// Cargar configuraciones guardadas
function loadSavedSettings() {
    // Cargar idioma
    const savedLanguage = localStorage.getItem('voti-language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        updateLanguage();
        
        // Actualizar botón activo
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[onclick="changeLanguage('${savedLanguage}')"]`)?.classList.add('active');
    }
    
    // Cargar configuraciones de accesibilidad
    const savedTextSize = localStorage.getItem('voti-text-size');
    if (savedTextSize) {
        textSizeMultiplier = parseFloat(savedTextSize);
        document.documentElement.style.fontSize = `${textSizeMultiplier}rem`;
    }
    
    const savedHighContrast = localStorage.getItem('voti-high-contrast');
    if (savedHighContrast === 'true') {
        isHighContrast = true;
        document.body.classList.add('high-contrast');
    }
}

// Agregar estilos de animación
const loginAnimationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .high-contrast {
        filter: contrast(150%);
    }
    
    .message-toast .message-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

// Agregar estilos al documento
const loginStyleSheet = document.createElement('style');
loginStyleSheet.textContent = loginAnimationStyles;
document.head.appendChild(loginStyleSheet);