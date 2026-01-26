// ===== TEMREOS V.04 - BOOT FIX =====
console.log("🚀 TemreOS V.04 Boot Fix Aktif!");

let bootFinished = false;

// ===== BOOT SEQUENCE =====
function startBootSequence() {
    console.log("📱 Boot başlıyor...");
    
    if (bootFinished) return;
    
    // 1. Boot Screen 1: 5 SANİYE
    setTimeout(() => {
        console.log("🔄 Boot 1 → Boot 2");
        document.getElementById('bootScreen1').style.display = 'none';
        document.getElementById('bootScreen2').style.display = 'flex';
        
        // 2. Boot Screen 2: 5 SANİYE
        setTimeout(() => {
            console.log("🔄 Boot 2 → Lock Screen");
            
            // Exit animasyonu
            document.getElementById('bootScreen2').style.opacity = '0';
            document.getElementById('bootScreen2').style.transition = 'opacity 0.8s ease';
            
            setTimeout(() => {
                document.getElementById('bootScreen2').style.display = 'none';
                showLockScreen();
                updateTime();
                bootFinished = true;
                console.log("✅ Boot tamamlandı!");
                showToast("📱 TemreOS V.04 yüklendi!");
            }, 800);
        }, 5000); // Boot 2: 5 SANİYE
    }, 5000); // Boot 1: 5 SANİYE
}

// ===== SAYFA YÜKLENDİĞİNDE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 DOM hazır, boot başlatılıyor...");
    
    // Boot'u başlat
    startBootSequence();
    
    // Saat güncellemesi
    setInterval(updateTime, 60000);
    
    // Tema yükle
    loadTheme();
    
    // Kaydırma event'leri
    initSwipeGestures();
});

// ===== EKRAN GEÇİŞLERİ =====
function showLockScreen() {
    console.log("🔒 Kilit ekranı gösteriliyor...");
    
    // Diğer ekranları gizle
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('appWindow').style.display = 'none';
    
    // Kilit ekranını göster
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.style.display = 'flex';
    lockScreen.style.opacity = '0';
    
    setTimeout(() => {
        lockScreen.style.opacity = '1';
        lockScreen.style.transition = 'opacity 0.5s ease';
    }, 50);
}

function unlockPhone() {
    console.log("🔓 Telefon açılıyor...");
    
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.style.opacity = '0';
    lockScreen.style.transform = 'translateY(-20px)';
    lockScreen.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        lockScreen.style.display = 'none';
        
        const homeScreen = document.getElementById('homeScreen');
        homeScreen.style.display = 'flex';
        homeScreen.style.opacity = '0';
        
        setTimeout(() => {
            homeScreen.style.opacity = '1';
            homeScreen.style.transition = 'opacity 0.5s ease';
            showToast("📱 Ana ekrana hoş geldiniz!");
        }, 50);
    }, 500);
}

// ===== ACİL BOOT ATLAMA =====
function skipBoot() {
    console.log("⏭️ Boot atlanıyor...");
    
    // Tüm boot ekranlarını kapat
    document.getElementById('bootScreen1').style.display = 'none';
    document.getElementById('bootScreen2').style.display = 'none';
    
    // Direkt kilit ekranını aç
    showLockScreen();
    updateTime();
    bootFinished = true;
    
    showToast("⏭️ Boot atlandı, direkt açıldı!");
}

// ===== ZAMAN GÜNCELLEME =====
function updateTime() {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    const date = now.toLocaleDateString('tr-TR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });
    
    document.querySelectorAll('.time, .status-time, .lock-time').forEach(el => {
        if (el) el.textContent = time;
    });
    
    document.querySelectorAll('.lock-date').forEach(el => {
        if (el) el.textContent = date;
    });
}

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== ACİL TEST İÇİN =====
// Konsola yaz: skipBoot() → Boot'u atla
// Konsola yaz: unlockPhone() → Kilit ekranını aç

window.skipBoot = skipBoot;
window.unlockPhone = unlockPhone;

console.log("✨ TemreOS V.04 Boot Fix hazır!");
