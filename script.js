document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        alert(icon.innerText + " açılıyor...");
    });
});
