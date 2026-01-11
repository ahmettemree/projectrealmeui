// BASİT VE GARANTİ ÇÖZÜM
console.log("Realme UI Simulator Yüklendi");

// Sayfa yüklendiğinde
window.onload = function() {
    console.log("Sayfa yüklendi");
    
    // Otomatik aç (5 saniye sonra)
    setTimeout(function() {
        console.log("Otomatik açılıyor...");
        unlockPhone();
    }, 5000);
    
    // Saati güncelle
    updateTime();
    setInterval(updateTime, 60000);
};

// Kilidi aç
function unlockPhone() {
    console.log("unlockPhone çağrıldı");
    
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    if (!lockScreen || !homeScreen) {
        console.error("Elementler bulunamadı!");
        return;
    }
    
    console.log("Elementler bulundu, açılıyor...");
    
    // 1. Kilit ekranını gizle
    lockScreen.style.opacity = '0';
    lockScreen.style.transform = 'translateY(-100%)';
    lockScreen.style.transition = 'all 0.5s ease';
    
    // 2. Ana ekranı göster
    homeScreen.style.transform = 'translateY(0)';
    homeScreen.style.transition = 'all 0.5s ease';
    
    // 3. Class'ları değiştir
    setTimeout(function() {
        lockScreen.classList.remove('active');
        homeScreen.classList.add('active');
        console.log("Açıldı!");
    }, 500);
}

// Saati güncelle
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
    
    document.querySelectorAll('.lock-time, .status-left').forEach(el => {
        if (el) el.textContent = timeString;
    });
    
    const dateEl = document.querySelector('.lock-date');
    if (dateEl) dateEl.textContent = dateString;
}

// Parmak izi butonu
document.addEventListener('DOMContentLoaded', function() {
    const fingerprintBtn = document.getElementById('fingerprintBtn');
    if (fingerprintBtn) {
        fingerprintBtn.addEventListener('click', function() {
            console.log("Parmak izine tıklandı");
            this.classList.add('scanning');
            
            setTimeout(function() {
                unlockPhone();
                fingerprintBtn.classList.remove('scanning');
            }, 3000);
        });
    }
});

// Kontrol butonları
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function lockScreen() {
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    homeScreen.classList.remove('active');
    lockScreen.classList.add('active');
    
    lockScreen.style.opacity = '1';
    lockScreen.style.transform = 'translateY(0)';
    
    sessionStorage.removeItem('unlocked');
}

function refreshPage() {
    location.reload();
        }
