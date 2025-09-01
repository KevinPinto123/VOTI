// Variables globales
let currentTab = 'chat';
let chatMessages = [];
let isTyping = false;
let currentTheme = 'light';
let currentLanguage = 'es';
let comparedCandidates = [];
let favoritesCandidates = [];

// Traducciones
const translations = {
    es: {
        'nav-problema': 'Problema',
        'nav-candidatos': 'Candidatos',
        'nav-solucion': 'Solución',
        'nav-demo': 'Demo',
        'nav-impacto': 'Impacto',
        'nav-equipo': 'Equipo',
        'candidates-title': 'Candidatos Presidenciales 2026',
        'candidates-subtitle': 'Conoce las propuestas y trayectorias de los principales candidatos de manera objetiva y verificada',
        'filter-party': 'Partido:',
        'filter-region': 'Región:',
        'filter-all': 'Todos',
        'proposals-title': 'Principales Propuestas:',
        'view-details': 'Ver Detalles',
        'ask-ai': 'Preguntar a IA',
        'compare-candidates': 'Comparar Candidatos',
        'select-candidates': 'Selecciona candidatos para comparar sus propuestas',
        'clear-all': 'Limpiar Todo',
        'detailed-comparison': 'Comparación Detallada',
        'lang-spanish': 'Español',
        'lang-quechua': 'Quechua',
        'lang-aimara': 'Aimara',
        'user-welcome': 'Usuario Demo',
        'user-profile': 'Mi Perfil',
        'user-settings': 'Configuración'
    },
    qu: {
        'nav-problema': 'Sasachakuy',
        'nav-candidatos': 'Akllana',
        'nav-solucion': 'Allichay',
        'nav-demo': 'Rikuchiy',
        'nav-impacto': 'Llamkay',
        'nav-equipo': 'Ayllu',
        'candidates-title': 'Umalliq Akllana 2026',
        'candidates-subtitle': 'Akllana runakunapa yuyayninkunata chiqap rikunapaq',
        'filter-party': 'Tantanakuy:',
        'filter-region': 'Suyu:',
        'filter-all': 'Tukuy',
        'proposals-title': 'Hatun Yuyaykuna:',
        'view-details': 'Astawan Rikuy',
        'ask-ai': 'IA-ta Tapuy',
        'compare-candidates': 'Akllanakunata Tupachiy',
        'select-candidates': 'Akllanakunata akllay tupachinapaq',
        'clear-all': 'Tukuyta Pichay',
        'detailed-comparison': 'Sumaq Tupachiy',
        'lang-spanish': 'Kastilla Simi',
        'lang-quechua': 'Runasimi',
        'lang-aimara': 'Aimara Simi',
        'user-welcome': 'Rikuchiy Runa',
        'user-profile': 'Ñuqap Perfil',
        'user-settings': 'Churay'
    },
    en: {
        'nav-problema': 'Problem',
        'nav-candidatos': 'Candidates',
        'nav-solucion': 'Solution',
        'nav-demo': 'Demo',
        'nav-impacto': 'Impact',
        'nav-equipo': 'Team',
        'candidates-title': 'Presidential Candidates 2026',
        'candidates-subtitle': 'Learn about candidates\' proposals and backgrounds objectively and verified',
        'filter-party': 'Party:',
        'filter-region': 'Region:',
        'filter-all': 'All',
        'proposals-title': 'Main Proposals:',
        'view-details': 'View Details',
        'ask-ai': 'Ask AI',
        'compare-candidates': 'Compare Candidates',
        'select-candidates': 'Select candidates to compare their proposals',
        'clear-all': 'Clear All',
        'detailed-comparison': 'Detailed Comparison',
        'lang-spanish': 'Spanish',
        'lang-quechua': 'Quechua',
        'lang-aimara': 'Aimara',
        'user-welcome': 'Demo User',
        'user-profile': 'My Profile',
        'user-settings': 'Settings'
    }
};

// Respuestas predefinidas para el chat demo
const chatResponses = {
    'educación': {
        question: '¿Qué propuestas tiene sobre educación?',
        answer: 'Las principales propuestas educativas incluyen: 1) Aumentar la inversión en educación al 6% del PBI, 2) Implementar tecnología en todas las aulas, 3) Mejorar la formación docente, 4) Crear más universidades públicas de calidad. Estas propuestas buscan reducir la brecha educativa y mejorar la calidad de la enseñanza en el Perú.'
    },
    'sistema electoral': {
        question: '¿Cómo funciona el sistema electoral?',
        answer: 'El sistema electoral peruano funciona así: 1) Elecciones presidenciales con dos vueltas si ningún candidato obtiene más del 50%, 2) Elecciones congresales con representación proporcional, 3) Voto obligatorio para ciudadanos de 18 a 70 años, 4) La ONPE organiza las elecciones y el JNE proclama resultados. El proceso garantiza la representación democrática.'
    },
    'voto informado': {
        question: '¿Qué es el voto informado?',
        answer: 'El voto informado es la decisión electoral basada en información verificada y objetiva sobre: 1) Propuestas de los candidatos, 2) Su trayectoria y experiencia, 3) Viabilidad de sus planes de gobierno, 4) Posiciones en temas clave. VOTI te ayuda a acceder a esta información de manera neutral y confiable para que tomes la mejor decisión.'
    },
    'default': {
        question: '',
        answer: 'Gracias por tu pregunta. Como demo, puedo responder sobre propuestas educativas, el sistema electoral y el voto informado. En la versión completa de VOTI, podrás hacer cualquier pregunta sobre política peruana y recibirás información verificada y neutral.'
    }
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupIntersectionObserver();
    setupScrollAnimations();
    loadUserPreferences();
});

// Inicializar la aplicación
function initializeApp() {
    // Configurar tabs del demo
    setupDemoTabs();
    
    // Configurar navegación móvil
    setupMobileNavigation();
    
    // Configurar animaciones de scroll
    setupScrollAnimations();
    
    // Inicializar chat
    initializeChat();
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación suave
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
    
    // Botones de acción
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Hover effects para las tarjetas de módulos
    document.querySelectorAll('.modulo-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efectos hover para pasos del proceso
    document.querySelectorAll('.step').forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.querySelector('.step-icon').style.background = 'var(--accent-yellow)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.querySelector('.step-icon').style.background = 'var(--primary-blue)';
        });
    });
}

// Configurar navegación móvil
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Cambiar icono
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
}

// Configurar tabs del demo
function setupDemoTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

// Cambiar tab del demo
function switchTab(tabName) {
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Actualizar paneles
    document.querySelectorAll('.demo-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(`${tabName}-demo`).classList.add('active');
    
    currentTab = tabName;
}

// Inicializar chat
function initializeChat() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        // Mensaje inicial ya está en el HTML
        scrollChatToBottom();
    }
}

// Enviar mensaje en el chat
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message && !isTyping) {
        addUserMessage(message);
        input.value = '';
        
        // Simular respuesta del bot
        setTimeout(() => {
            addBotResponse(message);
        }, 1000);
    }
}

// Hacer pregunta rápida
function askQuestion(question) {
    const input = document.getElementById('chatInput');
    input.value = question;
    sendMessage();
}

// Agregar mensaje del usuario
function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

// Agregar respuesta del bot
function addBotResponse(userMessage) {
    isTyping = true;
    const chatMessages = document.getElementById('chatMessages');
    
    // Mostrar indicador de escritura
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="loading"></div>
            VOTI está escribiendo...
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollChatToBottom();
    
    // Determinar respuesta basada en el mensaje
    let response = chatResponses.default;
    const messageLower = userMessage.toLowerCase();
    
    if (messageLower.includes('educación') || messageLower.includes('educacion')) {
        response = chatResponses['educación'];
    } else if (messageLower.includes('sistema electoral') || messageLower.includes('elecciones')) {
        response = chatResponses['sistema electoral'];
    } else if (messageLower.includes('voto informado') || messageLower.includes('votar')) {
        response = chatResponses['voto informado'];
    }
    
    // Simular tiempo de respuesta
    setTimeout(() => {
        // Remover indicador de escritura
        chatMessages.removeChild(typingDiv);
        
        // Agregar respuesta real
        const responseDiv = document.createElement('div');
        responseDiv.className = 'message bot-message';
        responseDiv.innerHTML = `
            <div class="message-content">
                ${response.answer}
            </div>
        `;
        
        chatMessages.appendChild(responseDiv);
        scrollChatToBottom();
        isTyping = false;
    }, 2000);
}

// Scroll del chat hacia abajo
function scrollChatToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Alternar detalles en el comparador
function toggleDetails(row) {
    row.classList.toggle('expanded');
    
    // Agregar efecto visual
    const proposals = row.querySelectorAll('.proposal');
    proposals.forEach(proposal => {
        if (row.classList.contains('expanded')) {
            proposal.style.backgroundColor = 'var(--light-blue)';
            proposal.style.fontWeight = '600';
        } else {
            proposal.style.backgroundColor = 'var(--white)';
            proposal.style.fontWeight = 'normal';
        }
    });
}

// Funciones de navegación
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
        
        // Activar tab de chat por defecto
        setTimeout(() => {
            switchTab('chat');
        }, 500);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Configurar animaciones de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const animatedElements = document.querySelectorAll(`
        .problema-item,
        .modulo-card,
        .step,
        .benefit-card,
        .tech-item,
        .stat-card,
        .publico-card,
        .team-member
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Configurar intersection observer para efectos de scroll
function setupIntersectionObserver() {
    // Cambiar header en scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header en scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Parallax effect para hero
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Efectos de partículas para el hero (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    // Crear partículas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-blue);
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Agregar estilos de animación para partículas
const particleStyles = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow);
    }
    
    .typing-indicator .loading {
        margin-right: 8px;
    }
`;

// Agregar estilos dinámicos
const styleSheet = document.createElement('style');
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);

// Funciones de utilidad
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

// Optimizar scroll events
const optimizedScrollHandler = debounce(() => {
    // Manejar eventos de scroll optimizados aquí
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Manejar resize de ventana
window.addEventListener('resize', debounce(() => {
    // Reajustar elementos si es necesario
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth <= 768) {
        // Ajustes para móvil
        hero.style.minHeight = '80vh';
    } else if (hero) {
        hero.style.minHeight = '100vh';
    }
}, 250));

// Precargar imágenes importantes
function preloadImages() {
    const imageUrls = [
        // Agregar URLs de imágenes importantes aquí
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Inicializar precarga cuando sea apropiado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

// Funciones de Tema
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Guardar preferencia
    localStorage.setItem('voti-theme', currentTheme);
    
    // Animación suave
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Funciones de Idioma
function toggleLanguageMenu() {
    const langMenu = document.getElementById('lang-menu');
    if (langMenu) {
        langMenu.classList.toggle('active');
    }
}

function changeMainLanguage(lang) {
    currentLanguage = lang;
    updateLanguageDisplay();
    translatePage();
    
    // Cerrar menú
    const langMenu = document.getElementById('lang-menu');
    if (langMenu) {
        langMenu.classList.remove('active');
    }
    
    // Guardar preferencia
    localStorage.setItem('voti-language', lang);
}

function updateLanguageDisplay() {
    const currentLangElement = document.getElementById('current-lang');
    const langFlags = {
        'es': '🇵🇪 ES',
        'qu': '🏔️ QU',
        'ay': '🌄 AY',
        'en': '🇺🇸 EN'
    };
    
    if (currentLangElement) {
        currentLangElement.textContent = langFlags[currentLanguage] || '🇵🇪 ES';
    }
    
    // Actualizar opciones activas
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.remove('active');
    });
    
    const activeOption = document.querySelector(`[onclick="changeMainLanguage('${currentLanguage}')"]`);
    if (activeOption) {
        activeOption.classList.add('active');
    }
}

function translatePage() {
    const elements = document.querySelectorAll('[data-text]');
    elements.forEach(element => {
        const key = element.getAttribute('data-text');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Funciones de Candidatos
function filterCandidates() {
    const partyFilter = document.getElementById('partyFilter').value;
    const regionFilter = document.getElementById('regionFilter').value;
    const candidates = document.querySelectorAll('.candidate-card');
    
    candidates.forEach(card => {
        const party = card.getAttribute('data-party');
        const region = card.getAttribute('data-region');
        
        const showParty = partyFilter === 'all' || party === partyFilter;
        const showRegion = regionFilter === 'all' || region === regionFilter;
        
        if (showParty && showRegion) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchCandidates() {
    const searchTerm = document.getElementById('candidateSearch').value.toLowerCase();
    const candidates = document.querySelectorAll('.candidate-card');
    
    candidates.forEach(card => {
        const name = card.querySelector('.candidate-name').textContent.toLowerCase();
        const party = card.querySelector('.candidate-party').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || party.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleFavorite(button) {
    const card = button.closest('.candidate-card');
    const candidateName = card.querySelector('.candidate-name').textContent;
    const icon = button.querySelector('i');
    
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        icon.className = 'far fa-heart';
        favoritesCandidates = favoritesCandidates.filter(name => name !== candidateName);
    } else {
        button.classList.add('active');
        icon.className = 'fas fa-heart';
        favoritesCandidates.push(candidateName);
    }
    
    // Guardar favoritos
    localStorage.setItem('voti-favorites', JSON.stringify(favoritesCandidates));
    
    // Animación
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
}

function addToCompare(candidateId) {
    const card = document.querySelector(`[onclick*="${candidateId}"]`).closest('.candidate-card');
    const candidateName = card.querySelector('.candidate-name').textContent;
    
    if (comparedCandidates.length >= 3) {
        showNotification('Máximo 3 candidatos para comparar', 'warning');
        return;
    }
    
    if (!comparedCandidates.includes(candidateName)) {
        comparedCandidates.push(candidateName);
        updateComparisonPanel();
        showComparisonPanel();
        
        // Marcar botón como activo
        const compareBtn = card.querySelector('.action-btn.compare');
        compareBtn.classList.add('active');
        
        showNotification(`${candidateName} agregado a comparación`, 'success');
    }
}

function updateComparisonPanel() {
    const content = document.getElementById('comparisonContent');
    if (comparedCandidates.length === 0) {
        content.innerHTML = '<p data-text="select-candidates">Selecciona candidatos para comparar sus propuestas</p>';
    } else {
        content.innerHTML = `
            <div class="compared-candidates">
                ${comparedCandidates.map(name => `
                    <div class="compared-candidate">
                        <span>${name}</span>
                        <button onclick="removeFromComparison('${name}')" class="remove-btn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function showComparisonPanel() {
    const panel = document.getElementById('comparisonPanel');
    if (panel && comparedCandidates.length > 0) {
        panel.classList.add('active');
    }
}

function closeComparison() {
    const panel = document.getElementById('comparisonPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

function clearComparison() {
    comparedCandidates = [];
    updateComparisonPanel();
    closeComparison();
    
    // Desmarcar todos los botones de comparación
    document.querySelectorAll('.action-btn.compare').forEach(btn => {
        btn.classList.remove('active');
    });
    
    showNotification('Comparación limpiada', 'info');
}

function removeFromComparison(candidateName) {
    comparedCandidates = comparedCandidates.filter(name => name !== candidateName);
    updateComparisonPanel();
    
    if (comparedCandidates.length === 0) {
        closeComparison();
    }
    
    // Desmarcar botón
    const cards = document.querySelectorAll('.candidate-card');
    cards.forEach(card => {
        if (card.querySelector('.candidate-name').textContent === candidateName) {
            card.querySelector('.action-btn.compare').classList.remove('active');
        }
    });
}

function showCandidateDetails(candidateId) {
    // Simular modal de detalles
    showNotification('Abriendo detalles del candidato...', 'info');
    // Aquí se abriría un modal con información detallada
}

function startCandidateChat(candidateId) {
    // Ir a la sección de demo y configurar chat específico
    scrollToDemo();
    setTimeout(() => {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.placeholder = `Pregunta sobre ${candidateId}...`;
            chatInput.focus();
        }
    }, 1000);
}

function showDetailedComparison() {
    if (comparedCandidates.length < 2) {
        showNotification('Selecciona al menos 2 candidatos', 'warning');
        return;
    }
    
    // Simular navegación a página de comparación detallada
    showNotification('Abriendo comparación detallada...', 'info');
    // Aquí se abriría una nueva vista o modal con comparación completa
}

// Funciones de Usuario
function toggleUserMenu() {
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.classList.toggle('active');
    }
}

function showProfile() {
    showNotification('Abriendo perfil de usuario...', 'info');
    // Aquí se abriría el perfil del usuario
}

function showSettings() {
    showNotification('Abriendo configuración...', 'info');
    // Aquí se abriría la configuración
}

// Función de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cargar preferencias del usuario
function loadUserPreferences() {
    // Cargar tema
    const savedTheme = localStorage.getItem('voti-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // Cargar idioma
    const savedLanguage = localStorage.getItem('voti-language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        updateLanguageDisplay();
        translatePage();
    }
    
    // Cargar favoritos
    const savedFavorites = localStorage.getItem('voti-favorites');
    if (savedFavorites) {
        favoritesCandidates = JSON.parse(savedFavorites);
        // Marcar favoritos en la UI
        setTimeout(() => {
            favoritesCandidates.forEach(candidateName => {
                const cards = document.querySelectorAll('.candidate-card');
                cards.forEach(card => {
                    if (card.querySelector('.candidate-name').textContent === candidateName) {
                        const favoriteBtn = card.querySelector('.action-btn.favorite');
                        if (favoriteBtn) {
                            favoriteBtn.classList.add('active');
                            favoriteBtn.querySelector('i').className = 'fas fa-heart';
                        }
                    }
                });
            });
        }, 500);
    }
}

// Cerrar menús al hacer click fuera
document.addEventListener('click', function(event) {
    // Cerrar menú de idiomas
    const langMenu = document.getElementById('lang-menu');
    const langToggle = document.querySelector('.lang-toggle');
    if (langMenu && !langToggle.contains(event.target)) {
        langMenu.classList.remove('active');
    }
    
    // Cerrar menú de usuario
    const userMenu = document.getElementById('user-menu');
    const userToggle = document.querySelector('.user-toggle');
    if (userMenu && userToggle && !userToggle.contains(event.target)) {
        userMenu.classList.remove('active');
    }
});

// Exportar funciones para uso global
window.scrollToDemo = scrollToDemo;
window.scrollToSection = scrollToSection;
window.sendMessage = sendMessage;
window.askQuestion = askQuestion;
window.toggleDetails = toggleDetails;
window.toggleTheme = toggleTheme;
window.toggleLanguageMenu = toggleLanguageMenu;
window.changeMainLanguage = changeMainLanguage;
window.filterCandidates = filterCandidates;
window.searchCandidates = searchCandidates;
window.toggleFavorite = toggleFavorite;
window.addToCompare = addToCompare;
window.closeComparison = closeComparison;
window.clearComparison = clearComparison;
window.showCandidateDetails = showCandidateDetails;
window.startCandidateChat = startCandidateChat;
window.showDetailedComparison = showDetailedComparison;
window.toggleUserMenu = toggleUserMenu;
window.showProfile = showProfile;
window.showSettings = showSettings;