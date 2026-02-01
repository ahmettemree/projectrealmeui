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

// ===== KİLİT EKRANI FİX =====

// 1. PARMAK İZİ ÇALIŞTIR
function unlockWithFingerprint() {
    console.log("👆 Parmak izi taranıyor...");
    
    const fingerprintIcon = document.querySelector('.fingerprint-icon');
    if (!fingerprintIcon) {
        console.error("❌ Parmak izi ikonu bulunamadı!");
        return;
    }
    
    // Animasyon başlat
    fingerprintIcon.classList.add('scanning');
    showToast("👆 Parmak izi taranıyor...");
    
    // 2 saniye sonra aç
    setTimeout(() => {
        unlockPhone();
        
        // Animasyonu sıfırla
        setTimeout(() => {
            fingerprintIcon.classList.remove('scanning');
        }, 500);
    }, 2000);
}

// 2. KAYDIRMA ÇALIŞTIR
function initSwipeGestures() {
    const lockScreen = document.getElementById('lockScreen');
    if (!lockScreen) {
        console.error("❌ Lock screen bulunamadı!");
        return;
    }
    
    console.log("🔄 Kaydırma gesture'ları başlatılıyor...");
    
    let startY = 0;
    let isSwiping = false;
    
    // Touch events
    lockScreen.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isSwiping = true;
        this.style.transition = 'none';
    });
    
    lockScreen.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        const currentY = e.touches[0].clientY;
        const diff = startY - currentY;
        
        if (diff > 0) {
            const translateY = Math.min(diff, 100);
            this.style.transform = `translateY(-${translateY}px)`;
            this.style.opacity = 1 - (translateY / 200);
        }
    });
    
    lockScreen.addEventListener('touchend', function() {
        if (!isSwiping) return;
        isSwiping = false;
        
        const diff = startY - currentY;
        
        if (diff > 50) {
            console.log("⬆️ Yukarı kaydırma algılandı, açılıyor...");
            unlockPhone();
        } else {
            this.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            this.style.transform = 'translateY(0)';
            this.style.opacity = '1';
        }
    });
    
    // Mouse events (PC için)
    lockScreen.addEventListener('mousedown', function(e) {
        startY = e.clientY;
        isSwiping = true;
        this.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isSwiping) return;
        
        const lockScreen = document.getElementById('lockScreen');
        const currentY = e.clientY;
        const diff = startY - currentY;
        
        if (diff > 0) {
            const translateY = Math.min(diff, 100);
            lockScreen.style.transform = `translateY(-${translateY}px)`;
            lockScreen.style.opacity = 1 - (translateY / 200);
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (!isSwiping) return;
        isSwiping = false;
        
        const lockScreen = document.getElementById('lockScreen');
        const diff = startY - currentY;
        
        if (diff > 50) {
            console.log("⬆️ Mouse kaydırma algılandı, açılıyor...");
            unlockPhone();
        } else {
            lockScreen.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            lockScreen.style.transform = 'translateY(0)';
            lockScreen.style.opacity = '1';
        }
    });
}

// 3. GLOBAL FONKSİYONLARI TEKRAR TANIMLA
window.unlockWithFingerprint = unlockWithFingerprint;
window.unlockPhone = unlockPhone;
window.skipBoot = skipBoot;

// 4. SAYFA YÜKLENDİĞİNDE KONTROL ET
document.addEventListener('DOMContentLoaded', function() {
    console.log("🔍 Kilit ekranı kontrol ediliyor...");
    
    // Kilit ekranı var mı?
    const lockScreen = document.getElementById('lockScreen');
    console.log("Lock screen:", lockScreen ? "BULUNDU" : "BULUNAMADI");
    
    // Parmak izi butonu var mı?
    const fingerprintBtn = document.querySelector('.fingerprint-area');
    console.log("Parmak izi butonu:", fingerprintBtn ? "BULUNDU" : "BULUNAMADI");
    
    // Event listener'ları ekle
    if (fingerprintBtn) {
        fingerprintBtn.onclick = unlockWithFingerprint;
        console.log("✅ Parmak izi event'i eklendi");
    }
    
    // Kaydırma gesture'larını başlat
    initSwipeGestures();
});
