// ===== TEMREOS V.04 - TÜM JAVASCRIPT =====
console.log("🚀 TemreOS V.04 Başlatılıyor...");

// Global variables
let currentApp = null;
let appAnimationEnabled = true;
let fingerprintCooldown = false;
let dialerNumber = '';

// ===== BOOT SEQUENCE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 TemreOS V.04 yükleniyor...");
    
    // HIZLI BOOT: 1. ekran 1.5 sn, 2. ekran 1.5 sn
    setTimeout(() => {
        // İlk ekrandan ikinciye geç
        document.getElementById('bootScreen1').style.display = 'none';
        document.getElementById('bootScreen2').style.display = 'flex';
        
        // 2. İkinci boot ekranı (1.5 sn)
        setTimeout(() => {
            // Boot ekranını kapat
            document.getElementById('bootScreen2').classList.add('exit');
            
            // Kilit ekranını göster
            setTimeout(() => {
                document.getElementById('bootScreen2').style.display = 'none';
                showLockScreen();
                updateTime();
            }, 500); // Exit animasyonu
        }, 1500); // 2. ekran 1.5 saniye
    }, 1500); // 1. ekran 1.5 saniye
    
    // Saat güncellemesi
    setInterval(updateTime, 60000);
    
    // Tema yükle
    loadTheme();
    
    // Kaydırma event'leri
    initSwipeGestures();
    
    console.log("✅ TemreOS V.04 hazır!");
});
    
    // Saat güncellemesi
    setInterval(updateTime, 60000);
    
    // Tema yükle
    loadTheme();
    
    // Kaydırma event'leri
    initSwipeGestures();
    
    console.log("✅ TemreOS V.04 hazır!");
});

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
    
    // Tüm zaman elementlerini güncelle
    document.querySelectorAll('.time, .status-time, .lock-time').forEach(el => {
        if (el) el.textContent = time;
    });
    
    document.querySelectorAll('.lock-date').forEach(el => {
        if (el) el.textContent = date;
    });
}

// ===== EKRAN GEÇİŞLERİ =====
function showLockScreen() {
    document.getElementById('lockScreen').style.display = 'flex';
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('appWindow').style.display = 'none';
}

function unlockPhone() {
    console.log("🔓 Telefon açılıyor...");
    
    // Kilit ekranını kapat
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.style.opacity = '0';
    lockScreen.style.transform = 'translateY(-20px)';
    lockScreen.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        lockScreen.style.display = 'none';
        
        // Ana ekranı aç
        const homeScreen = document.getElementById('homeScreen');
        homeScreen.style.display = 'flex';
        homeScreen.style.opacity = '0';
        
        setTimeout(() => {
            homeScreen.style.opacity = '1';
            homeScreen.style.transition = 'opacity 0.5s ease';
            showToast("📱 TemreOS V.04'e hoş geldiniz!");
        }, 50);
    }, 500);
}

function lockScreen() {
    console.log("🔒 Ekran kilitleniyor...");
    
    // Uygulama varsa kapat
    if (currentApp) {
        closeApp();
    }
    
    // Ana ekranı kapat
    const homeScreen = document.getElementById('homeScreen');
    homeScreen.style.opacity = '0';
    homeScreen.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        homeScreen.style.display = 'none';
        
        // Kilit ekranını aç
        const lockScreen = document.getElementById('lockScreen');
        lockScreen.style.display = 'flex';
        lockScreen.style.opacity = '0';
        lockScreen.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            lockScreen.style.opacity = '1';
            lockScreen.style.transition = 'opacity 0.5s ease';
            showToast("📱 Ekran kilitlendi");
        }, 50);
    }, 300);
}

// ===== PARMAK İZİ İLE AÇMA =====
function unlockWithFingerprint() {
    if (fingerprintCooldown) return;
    fingerprintCooldown = true;
    
    console.log("👆 Parmak izi taranıyor...");
    
    const fingerprintIcon = document.querySelector('.fingerprint-icon');
    if (fingerprintIcon) {
        fingerprintIcon.classList.add('scanning');
        showToast("👆 Parmak izi taranıyor...");
        
        // 2 saniye animasyon
        setTimeout(() => {
            unlockPhone();
            
            // Animasyonu sıfırla
            setTimeout(() => {
                fingerprintIcon.classList.remove('scanning');
                fingerprintCooldown = false;
            }, 500);
        }, 2000);
    }
    
    // 3 saniye sonra cooldown'u kaldır
    setTimeout(() => {
        fingerprintCooldown = false;
    }, 3000);
}

// ===== UYGULAMA AÇMA (BEYAZ EKRAN + ANİMASYON) =====
function openApp(appId) {
    if (currentApp) return;
    
    console.log(`📱 ${appId} uygulaması açılıyor...`);
    currentApp = appId;
    
    // Tıklanan ikonu bul
    const clickedIcon = document.querySelector(`[data-app="${appId}"] .icon-circle`);
    let iconRect = { top: 0, left: 0, width: 60, height: 60 };
    
    if (clickedIcon) {
        const rect = clickedIcon.getBoundingClientRect();
        iconRect = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        };
    }
    
    // 1. BEYAZ AÇILIŞ EKRANI OLUŞTUR
    const openingOverlay = document.createElement('div');
    openingOverlay.className = 'app-opening';
    openingOverlay.style.position = 'fixed';
    openingOverlay.style.top = `${iconRect.top}px`;
    openingOverlay.style.left = `${iconRect.left}px`;
    openingOverlay.style.width = `${iconRect.width}px`;
    openingOverlay.style.height = `${iconRect.height}px`;
    openingOverlay.style.backgroundColor = '#FFFFFF';
    openingOverlay.style.borderRadius = '18px';
    openingOverlay.style.zIndex = '999';
    
    document.body.appendChild(openingOverlay);
    
    // 2. ANİMASYON BAŞLAT
    setTimeout(() => {
        openingOverlay.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        openingOverlay.style.top = '0';
        openingOverlay.style.left = '0';
        openingOverlay.style.width = '100%';
        openingOverlay.style.height = '100%';
        openingOverlay.style.borderRadius = '0';
        
        // 3. ANİMASYON BİTİNCE UYGULAMAYI AÇ
        setTimeout(() => {
            // App penceresini hazırla
            const appWindow = document.getElementById('appWindow');
            const appTitle = document.getElementById('appTitle');
            const appContent = document.getElementById('appContent');
            
            // Başlık ve içerik yükle
            const appTitles = {
                'settings': 'Ayarlar',
                'camera': 'Kamera',
                'messages': 'Mesajlar',
                'phone': 'Telefon',
                'chrome': 'Chrome',
                'gallery': 'Galeri',
                'music': 'Müzik',
                'files': 'Dosyalar',
                'calendar': 'Takvim',
                'calculator': 'Hesap Makinesi',
                'weather': 'Hava Durumu',
                'notes': 'Notlar'
            };
            
            appTitle.textContent = appTitles[appId] || appId;
            
            // İçerik yükle
            const contentTemplate = document.getElementById(`${appId}Content`);
            if (contentTemplate) {
                appContent.innerHTML = contentTemplate.innerHTML;
                
                // Ayarlar için event listener'ları ekle
                if (appId === 'settings') {
                    initSettingsApp();
                }
                // Telefon için
                if (appId === 'phone') {
                    dialerNumber = '';
                    updateDialerDisplay();
                }
            } else {
                appContent.innerHTML = `<div class="app-page">
                    <h3>${appTitles[appId] || appId}</h3>
                    <p>Uygulama içeriği yükleniyor...</p>
                </div>`;
            }
            
            // App penceresini göster
            appWindow.style.display = 'flex';
            appWindow.style.opacity = '0';
            
            setTimeout(() => {
                appWindow.style.opacity = '1';
                appWindow.style.transition = 'opacity 0.3s ease';
                
                // Beyaz overlay'ı kaldır
                setTimeout(() => {
                    openingOverlay.remove();
                    showToast(`${appTitles[appId] || appId} açıldı`);
                }, 100);
            }, 50);
        }, 400); // Animasyon süresi
    }, 10);
}

// ===== UYGULAMA KAPATMA (ANİMASYONLU) =====
function closeApp() {
    if (!currentApp) return;
    
    console.log(`📱 ${currentApp} uygulaması kapatılıyor...`);
    
    // Tıklanan ikonu bul
    const clickedIcon = document.querySelector(`[data-app="${currentApp}"] .icon-circle`);
    let iconRect = { top: 0, left: 0, width: 60, height: 60 };
    
    if (clickedIcon) {
        const rect = clickedIcon.getBoundingClientRect();
        iconRect = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        };
    }
    
    // 1. BEYAZ KAPANIŞ EKRANI OL
