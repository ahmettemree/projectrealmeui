// BASİT VE GARANTİ ÇALIŞAN
console.log("Android Simülatörü Yüklendi");

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM yüklendi");
    
    // Saati güncelle
    updateTime();
    setInterval(updateTime, 60000);
    
    // Kaydırma event'i
    initSwipe();
    
    // 5 saniye sonra otomatik aç (test için)
    setTimeout(function() {
        console.log("Test: Otomatik açılıyor...");
        // unlockPhone(); // Test etmek için aç
    }, 5000);
});

// Saati güncelle
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    const date = now.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '®');
    
    // Tüm zamanları güncelle
    document.querySelectorAll('.time, .lock-time').forEach(el => {
        el.textContent = time;
    });
    
    document.querySelectorAll('.lock-date').forEach(el => {
        el.textContent = date;
    });
}

// PARMAK İZİ İLE AÇ
function unlockWithFingerprint() {
    console.log("Parmak izi ile açılıyor...");
    
    const btn = document.querySelector('.fingerprint-btn');
    const icon = document.querySelector('.fingerprint-icon');
    
    // Animasyon başlat
    btn.style.background = '#4CAF50';
    icon.style.color = 'white';
    icon.style.transform = 'scale(1.2)';
    
    // 2 saniye bekle
    setTimeout(function() {
        unlockPhone();
        
        // Animasyonu sıfırla
        setTimeout(function() {
            btn.style.background = '';
            icon.style.color = '';
            icon.style.transform = '';
        }, 500);
    }, 2000);
}

// KİLİDİ AÇ
function unlockPhone() {
    console.log("Kilidi açıyor...");
    
    const lock = document.getElementById('lockScreen');
    const home = document.getElementById('homeScreen');
    
    if (!lock || !home) {
        console.error("Elementler bulunamadı!");
        return;
    }
    
    // Kilit ekranını kapat
    lock.style.opacity = '0';
    lock.style.transform = 'translateY(-20px)';
    lock.style.transition = 'all 0.5s ease';
    
    setTimeout(function() {
        lock.classList.remove('active');
        lock.style.display = 'none';
        
        // Ana ekranı aç
        home.style.display = 'flex';
        home.style.opacity = '0';
        home.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            home.classList.add('active');
            home.style.opacity = '1';
            home.style.transform = 'translateY(0)';
            home.style.transition = 'all 0.5s ease';
            
            console.log("Başarıyla açıldı!");
        }, 50);
    }, 500);
}

// EKRANI KİLİTLE
function lockScreen() {
    console.log("Ekranı kilitle...");
    
    const lock = document.getElementById('lockScreen');
    const home = document.getElementById('homeScreen');
    
    // Uygulama penceresini kapat
    const appWindow = document.getElementById('appWindow');
    if (appWindow) appWindow.style.display = 'none';
    
    // Ana ekranı kapat
    home.style.opacity = '0';
    home.style.transform = 'translateY(20px)';
    home.style.transition = 'all 0.5s ease';
    
    setTimeout(function() {
        home.classList.remove('active');
        home.style.display = 'none';
        
        // Kilit ekranını aç
        lock.style.display = 'flex';
        lock.style.opacity = '0';
        lock.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            lock.classList.add('active');
            lock.style.opacity = '1';
            lock.style.transform = 'translateY(0)';
            lock.style.transition = 'all 0.5s ease';
            
            console.log("Başarıyla kilitlendi!");
        }, 50);
    }, 500);
}

// KAYDIRMA SİSTEMİ
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
            console.log("Yukarı kaydırıldı, açılıyor...");
            unlockPhone();
        }
    });
}

// Uygulama aç
function openApp(appName) {
    console.log("Uygulama aç:", appName);
    alert(appName + " uygulaması açılıyor...");
    
    // Basit demo
    const content = document.getElementById('appContent');
    const title = document.getElementById('appTitle');
    const window = document.getElementById('appWindow');
    
    if (content && title && window) {
        title.textContent = appName;
        content.textContent = appName + " uygulaması yükleniyor...";
        window.style.display = 'flex';
    }
}

function closeApp() {
    document.getElementById('appWindow').style.display = 'none';
}

function openSearch() {
    openApp('Google Arama');
}

function openGoogle() {
    openApp('Google');
}

function openFolder(folder) {
    openApp(folder + ' Klasörü');
}

function toggleTheme() {
    alert("Tema değiştirilecek (sonra eklenir)");
}

// EMERGENCY UNLOCK için global fonksiyon
window.unlockPhone = unlockPhone;
window.lockScreen = lockScreen;
