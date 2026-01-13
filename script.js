// ===== TEMREOS v1.0 - TÜM DÜZELTMELER =====
console.log("🚀 TemreOS v1.0 Yüklendi!");

// Global değişkenler
let fingerprintCooldown = false;
let currentTheme = localStorage.getItem('theme') || 'light';

// ===== SAYFA YÜKLENDİĞİNDE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 TemreOS başlatılıyor...");
    
    // Tema ayarı
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton();
    
    // Saati güncelle
    updateTime();
    setInterval(updateTime, 60000);
    
    // Kaydırma event'ini başlat
    initSwipe();
    
    // 3 saniye sonra otomatik aç (test için - istersen kapat)
    // setTimeout(unlockPhone, 3000);
});

// ===== TEMA DEĞİŞTİRME =====
function toggleTheme() {
    console.log("🎨 Tema değiştiriliyor...");
    
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    updateThemeButton();
    showToast(`Tema: ${currentTheme === 'dark' ? 'Karanlık' : 'Aydınlık'}`);
}

function updateThemeButton() {
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.innerHTML = currentTheme === 'dark' 
            ? '<i class="fas fa-sun"></i> Tema' 
            : '<i class="fas fa-moon"></i> Tema';
    }
}

// ===== PARMAK İZİ İLE AÇMA =====
function unlockWithFingerprint() {
    // Çift tıklamayı engelle
    if (fingerprintCooldown) {
        console.log("⏳ Lütfen bekleyin...");
        return;
    }
    
    fingerprintCooldown = true;
    console.log("👆 Parmak izi taranıyor...");
    
    const fingerprintBtn = document.querySelector('.fingerprint');
    if (fingerprintBtn) {
        // Animasyon başlat
        fingerprintBtn.style.background = '#4CAF50';
        fingerprintBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        showToast("Parmak izi taranıyor...");
        
        // 2 saniye sonra aç
        setTimeout(function() {
            unlockPhone();
            
            // Animasyonu sıfırla
            setTimeout(function() {
                fingerprintBtn.style.background = '';
                fingerprintBtn.innerHTML = '<i class="fas fa-fingerprint"></i>';
                fingerprintCooldown = false;
            }, 500);
        }, 2000);
    }
    
    // 3 saniye sonra cooldown'u kaldır (güvenlik)
    setTimeout(() => {
        fingerprintCooldown = false;
    }, 3000);
}

// ===== KİLİDİ AÇ =====
function unlockPhone() {
    console.log("🔓 Kilidi açıyor...");
    
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    if (!lockScreen || !homeScreen) {
        console.error("❌ Elementler bulunamadı!");
        return;
    }
    
    // Kilit ekranını kapat
    lockScreen.style.opacity = '0';
    lockScreen.style.transform = 'translateY(-20px)';
    lockScreen.style.transition = 'all 0.5s ease';
    
    setTimeout(function() {
        lockScreen.classList.remove('active');
        lockScreen.style.display = 'none';
        
        // Ana ekranı aç
        homeScreen.style.display = 'flex';
        homeScreen.style.opacity = '0';
        homeScreen.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            homeScreen.classList.add('active');
            homeScreen.style.opacity = '1';
            homeScreen.style.transform = 'translateY(0)';
            homeScreen.style.transition = 'all 0.5s ease';
            
            console.log("✅ Başarıyla açıldı!");
            showToast("Telefon açıldı!");
        }, 50);
    }, 500);
}

// ===== EKRANI KİLİTLE =====
function lockScreen() {
    console.log("🔒 Ekranı kilitle...");
    
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    // Uygulama penceresini kapat
    closeApp();
    
    // Ana ekranı kapat
    homeScreen.style.opacity = '0';
    homeScreen.style.transform = 'translateY(20px)';
    homeScreen.style.transition = 'all 0.5s ease';
    
    setTimeout(function() {
        homeScreen.classList.remove('active');
        homeScreen.style.display = 'none';
        
        // Kilit ekranını aç
        lockScreen.style.display = 'flex';
        lockScreen.style.opacity = '0';
        lockScreen.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            lockScreen.classList.add('active');
            lockScreen.style.opacity = '1';
            lockScreen.style.transform = 'translateY(0)';
            lockScreen.style.transition = 'all 0.5s ease';
            
            console.log("✅ Başarıyla kilitlendi!");
            showToast("Telefon kilitlendi!");
        }, 50);
    }, 500);
}

// ===== UYGULAMA AÇMA (ALERTSİZ + ANİMASYONLU) =====
function openApp(appName) {
    console.log(`📱 ${appName} uygulaması açılıyor...`);
    
    // Toast göster (alert YOK)
    showToast(`${appName} açılıyor...`);
    
    const appWindow = document.getElementById('appWindow');
    const appTitle = document.getElementById('appTitle');
    const appContent = document.getElementById('appContent');
    
    if (appWindow && appTitle && appContent) {
        // Başlık ve içerik
        appTitle.textContent = appName;
        appContent.innerHTML = `
            <div class="app-loading">
                <div class="loading-spinner"></div>
                <h4>${appName}</h4>
                <p>Uygulama yükleniyor...</p>
            </div>
        `;
        
        // ANİMASYONLU AÇILMA
        appWindow.style.display = 'flex';
        appWindow.style.opacity = '0';
        appWindow.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            appWindow.style.transition = 'all 0.3s ease';
            appWindow.style.opacity = '1';
            appWindow.style.transform = 'translateY(0)';
        }, 10);
    }
}

function closeApp() {
    const appWindow = document.getElementById('appWindow');
    if (appWindow) {
        appWindow.style.opacity = '0';
        appWindow.style.transform = 'translateY(20px)';
        appWindow.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            appWindow.style.display = 'none';
        }, 300);
    }
}

// ===== DİĞER FONKSİYONLAR =====
function openSearch() {
    openApp('Google Arama');
}

function openGoogle() {
    openApp('Google');
}

function openFolder(folderName) {
    openApp(`${folderName} Klasörü`);
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById('appToast');
    if (toast) {
        toast.textContent = message;
        toast.style.display = 'block';
        
        // 2 saniye sonra gizle
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }
}

// ===== KAYDIRMA SİSTEMİ =====
function initSwipe() {
    const lockScreen = document.getElementById('lockScreen');
    let startY = 0;
    
    lockScreen.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    
    lockScreen.addEventListener('touchend', function(e) {
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;
        
        if (diff > 50) { // Yukarı kaydırma
            console.log("⬆️ Yukarı kaydırıldı, açılıyor...");
            unlockPhone();
        }
    });
}

// ===== SAAT GÜNCELLEME =====
function updateTime() {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    const date = now.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '®');
    
    // Tüm zamanları güncelle
    document.querySelectorAll('.time, .lock-time').forEach(el => {
        if (el) el.textContent = time;
    });
    
    document.querySelectorAll('.lock-date').forEach(el => {
        if (el) el.textContent = date;
    });
}

// ===== GLOBAL FONKSİYONLAR =====
window.unlockPhone = unlockPhone;
window.lockScreen = lockScreen;
window.toggleTheme = toggleTheme;
window.openApp = openApp;
window.openSearch = openSearch;
window.openGoogle = openGoogle;
window.openFolder = openFolder;
window.closeApp = closeApp;
window.unlockWithFingerprint = unlockWithFingerprint;

console.log("✨ TemreOS hazır! Tüm fonksiyonlar yüklendi.");
