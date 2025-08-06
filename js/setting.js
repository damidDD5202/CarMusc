document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    console.log(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
});