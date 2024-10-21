function getCardStyle() {
    const is_dark_theme = document.documentElement.getAttribute('data-theme-mode') === 'dark' ||
                          document.documentElement.getAttribute('data-theme') === 'dark';

    return is_dark_theme ? `
        background-color: #333;
        color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
        padding: 20px;
        cursor: pointer;
        text-align: center;
    ` : `
        background-color: #fff;
        color: #000;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        cursor: pointer;
        text-align: center;
    `;
}

function updateCardStyles(cardFieldClass) {
    const card_element = document.querySelector(`.${cardFieldClass}`);
    // console.log(`Updating styles for: ${cardFieldClass}`); 
    if (card_element) {
        card_element.style.cssText = getCardStyle();  
    }
}

function observeThemeChanges(cardFieldClass) {
    const observer = new MutationObserver(() => {
        updateCardStyles(cardFieldClass);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme-mode', 'data-theme'] });
}
