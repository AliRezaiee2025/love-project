// script.js

// گرفتن عناصر اصلی
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hero = document.getElementById('hero');
const bgImage = document.getElementById('bgImage');   // << اضافه‌شود
noBtn.addEventListener('mouseenter', moveNoBtnRandom);
const videoSection = document.getElementById('videoSection');
const confettiCanvas = document.getElementById('confettiCanvas');
const celebrationVideo = document.getElementById('celebrationVideo');

// ایجاد کنفیِتی اگر کانواس موجود باشد
let confetti = null;
if (confettiCanvas && window.confetti) {
  confetti = window.confetti.create(confettiCanvas, { resize: true, useWorker: true });
}



function moveNoBtnRandom() {
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const padding = 10; // فاصله امن از لبه‌ها

  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  const maxX = viewportWidth - btnWidth - padding;
  const maxY = (viewportHeight / 2) - btnHeight - padding; // فقط نیمه بالایی

  const x = Math.random() * maxX; // افقی تصادفی
  const y = Math.random() * maxY; // عمودی تصادفی اما بالای صفحه

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}




// وقتی موس روی نخیر میره → فرار کنه
noBtn.addEventListener("mouseover", moveNoBtnRandom);

noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoBtnRandom();
});

noBtn.addEventListener("click", moveNoBtnRandom);



// کلیک روی "بلی"
yesBtn.addEventListener('click', () => {
  // پنهان کردن صفحه اول
  hero.style.display = 'none';

  // نمایش بخش ویدئو
  videoSection.style.display = 'flex';

  // نمایش کانواس کنفیِتی
  if (confetti) {
    confettiCanvas.style.display = 'block';

    // تابع پخش کنفیِتی به صورت پیوسته
    function launchConfetti() {
      confetti({
        particleCount: 3 + Math.random() * 3, // تعداد ذرات
        angle: Math.random() * 60 + 60,       // زاویه
        spread: Math.random() * 60 + 40,      // پراکندگی
        origin: { x: Math.random(), y: Math.random() * 0.6 }
      });
    }

    // هر 100 میلی‌ثانیه کنفیِتی پرتاب شود
    const confettiInterval = setInterval(launchConfetti, 100);

    // وقتی ویدئو تمام شد، توقف کنفیِتی
    celebrationVideo.addEventListener('ended', () => {
      clearInterval(confettiInterval);
      confettiCanvas.style.display = 'none';
    });
  }

  // شروع خودکار ویدئو
  celebrationVideo.play().catch(e => console.log("پخش اتوماتیک ویدئو ممکن نشد:", e));
});
