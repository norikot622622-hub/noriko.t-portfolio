const orbs = document.querySelectorAll(".orb");
const positions = [];
const profile = document.querySelector(".profile"); // ← プロフィール要素
const profileRect = profile.getBoundingClientRect();

orbs.forEach((orb) => {
  let x, y;
  let safe = false;

  while (!safe) {
    x = Math.random() * 70 + 10; // 横 10〜80%
    y = Math.random() * 50 + 20; // 縦 20〜70%

    safe = true;

    // ① 既存のオーブとの距離チェック
    for (const pos of positions) {
      const dx = x - pos.x;
      const dy = y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 20) {
        safe = false;
        break;
      }
    }

    // ② プロフィールエリアとの重なりチェック
    const orbXpx = (x / 100) * window.innerWidth;
    const orbYpx = (y / 100) * window.innerHeight;

    if (
      orbXpx > profileRect.left &&
      orbXpx < profileRect.right &&
      orbYpx > profileRect.top &&
      orbYpx < profileRect.bottom
    ) {
      safe = false;
    }
  }

  positions.push({ x, y });
  orb.style.left = x + "%";
  orb.style.top = y + "%";
});
