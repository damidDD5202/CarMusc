document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const currentPalette = localStorage.getItem('palette') || 'default';
    updatePaletteStyles(currentPalette);
});


// костыль функция 
function updatePaletteStyles(palette) {
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    
    if (isLightTheme) {
        switch (palette) {
            case 'default':
                document.documentElement.style.setProperty('--background', '#e2d3d3ff');
                document.documentElement.style.setProperty('--help', '#BE2B31');
                document.documentElement.style.setProperty('--text-color', '#141414eb');
                break;
            case 'alternative1':
                document.documentElement.style.setProperty('--background', '#e2d3d3ff');
                document.documentElement.style.setProperty('--help', '#5d7f80a1');
                document.documentElement.style.setProperty('--text-color', '#141414eb');
                break;
            case 'alternative2':
                document.documentElement.style.setProperty('--background', '#cfd1beff');
                document.documentElement.style.setProperty('--help', '#76a45bff');
                document.documentElement.style.setProperty('--text-color', '#222222');
                break;
            default:
                break;
        }
    } else {
        // Темная тема
        switch (palette) {
            case 'default':
                document.documentElement.style.setProperty('--background', '#141414');
                document.documentElement.style.setProperty('--help', '#BE2B31');
                document.documentElement.style.setProperty('--text-color', '#ffffff');
                break;
            case 'alternative1':
                document.documentElement.style.setProperty('--background', '#141414');
                document.documentElement.style.setProperty('--help', '#9c9867ff');
                document.documentElement.style.setProperty('--text-color', '#ffffffff');
                break;
            case 'alternative2':
                document.documentElement.style.setProperty('--background', '#404040ff');
                document.documentElement.style.setProperty('--help', '#4a5057ff');
                document.documentElement.style.setProperty('--text-color', '#f5f5f5');
                break;
            default:
                break;
        }
    }
}