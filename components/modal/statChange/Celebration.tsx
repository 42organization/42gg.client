import { useEffect } from 'react';
import styles from 'styles/modal/StatChangeModal.module.scss';

export default function Celebration() {
  useEffect(() => {
    for (let i = 0; i < 200; i++) {
      // Random rotation
      const randomRotation = Math.floor(
        Math.random() * document.documentElement.clientWidth
      );

      // Random width & height between 0 and viewport
      const randomWidth = Math.floor(Math.random() * 100);
      const randomHeight = Math.floor(
        Math.random() * document.documentElement.clientHeight
      );

      // Random animation-delay
      const randomAnimationDelay = Math.floor(Math.random() * 5);

      // Random colors
      const colors = [
        '#0CD977',
        '#FF1C1C',
        '#FF93DE',
        '#5767ED',
        '#FFC61C',
        '#8497B0',
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Create confetti piece
      const confetti = document.createElement('div');
      confetti.className = styles.confetti;
      confetti.style.top = randomHeight + 'px';
      confetti.style.right = randomWidth + '%';
      confetti.style.backgroundColor = randomColor;
      confetti.style.transform =
        'skew(15deg) rotate(' + randomRotation + 'deg)';
      confetti.style.animationDelay = randomAnimationDelay + 's';
      document.getElementById('confetti-wrapper')?.appendChild(confetti);
    }
  }, []);

  return (
    <div className={`${styles.fixedContainer} ${styles.back}`}>
      <div id='confetti-wrapper'></div>
    </div>
  );
}
