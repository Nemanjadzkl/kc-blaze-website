document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.querySelector('.language-switcher');
    const selectedLang = languageSwitcher.querySelector('.selected-lang');
    const dropdown = languageSwitcher.querySelector('.lang-dropdown');
    const currentLangImg = document.getElementById('current-lang-img');
    const currentLangText = document.getElementById('current-lang');

    // Set default language
    let currentLang = localStorage.getItem('language') || 'en';
    updateLanguage(currentLang);

    // Toggle dropdown
    selectedLang.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    // Handle language selection
    dropdown.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.dataset.lang;
            updateLanguage(lang);
            dropdown.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageSwitcher.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    function updateLanguage(lang) {
        localStorage.setItem('language', lang);
        currentLangText.textContent = lang.toUpperCase();
        currentLangImg.src = `images/${lang}-flag.png`;
        
        // Update content based on selected language
        updateContent(lang);
    }

    function updateContent(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.dataset.translate;
            const translation = getNestedTranslation(translations[lang], key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((p, c) => p && p[c], obj);
    }
});
