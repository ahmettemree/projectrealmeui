// SAYFA YÜKLENDİĞİNDE
document.addEventListener('DOMContentLoaded', function() {
    console.log('Android Simülatörü Yüklendi');
    
    // Saati güncelle
    updateTime();
    setInterval(updateTime, 60000);
    
    // Tema kontrolü
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Session kontrolü - daha önce kilit açıldı mı?
    const isUnlocked = sessionStorage.getItem('unlocked') === 'true';
    
    if (isUnlocked) {
        showHomeScreen();
    } else {
        showLockScreen();
    }
    
    // PARMAK İZİ BUTONU
    const fingerprintBtn = document.getElementById('fingerprintBtn');
    
    // Tıklama ile aç
    fingerprintBtn.addEventListener('click', function() {
        startFingerprintScan();
    });
    
    // Basılı tutma ile aç
    let pressTimer;
    
    fingerprintBtn.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            startFingerprintScan();
        }, 3000); // 3 saniye basılı tutunca
    });
    
    fingerprintBtn.addEventListener('touchstart', function() {
        pressTimer = setTimeout(function() {
            startFingerprintScan();
        }, 3000);
    });
    
    fingerprintBtn.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    fingerprintBtn.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
    });
    
    // Kilit ekranı kaydırma
    initSwipe();
});

// SAATİ GÜNCELLE
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    const dateString = now.toLocaleDateString('tr-TR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    
    // Tüm saatleri güncelle
    document.querySelectorAll('.lock-time, .status-left').forEach(el => {
        el.textContent = timeString;
    });
    
    // Tarihi güncelle
    const dateEl = document.querySelector('.lock-date');
    if (dateEl) {
        dateEl.textContent = dateString;
    }
}

// PARMAK İZİ TARAMA
function startFingerprintScan() {
    const fingerprintBtn = document.getElementById('fingerprintBtn');
    
    // Tarama animasyonu başlat
    fingerprintBtn.classList.add('scanning');
    
    // 3 saniye sonra kilidi aç
    setTimeout(function() {
        unlockPhone();
        fingerprintBtn.classList.remove('scanning');
    }, 3000);
}

// KİLİDİ AÇ
function unlockPhone() {
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    lockScreen.style.transition = 'transform 0.5s cubic-bezier(0
