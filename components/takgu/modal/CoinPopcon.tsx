import { useEffect } from 'react';
import styles from 'styles/modal/CoinPopcon.module.scss';
interface amountProps {
  amount: number;
  coin: number;
}

export default function CoinPopcon({ amount, coin }: amountProps) {
  const tilts = ['r', 'l'];
  const height = [0.015, 0.02, 0.025];
  const width = [200, 230, 260];

  useEffect(() => {
    const handleClickMouseWrapper = (e: MouseEvent) => {
      handleClickMouse(e);
    };
    document.addEventListener('click', handleClickMouseWrapper);

    return () => {
      document.removeEventListener('click', handleClickMouseWrapper);
    };
  }, []);

  const handleClickMouse = (e: MouseEvent) => {
    const numElement = document.createElement('span');
    numElement.className = styles.appear;
    if (coin != 0) numElement.textContent = `+${coin}`;
    numElement.style.position = 'fixed';
    numElement.style.top = e.clientY + 'px';
    numElement.style.left = e.clientX - 20 + 'px';
    document.body.appendChild(numElement);
    for (let i = 0; i < amount; i++) {
      const randomTilt = tilts[Math.floor(Math.random() * 2)];
      const randomheight = height[Math.floor(Math.random() * 3)];
      const randomwidth = width[Math.floor(Math.random() * 3)];
      const x1 = e.clientX;
      const y1 = e.clientY;
      //left bar
      const x2 = e.clientX - randomwidth;
      const y2 = e.clientY + 400;
      //right bar
      const x3 = e.clientX + randomwidth;
      const y3 = e.clientY + 400;

      const a = randomheight;
      const y_lr = randomTilt === 'l' ? y2 : y3;
      const x = randomTilt === 'l' ? x2 : x3;
      const b = (y1 - y_lr - a * (x1 * x1 - x * x)) / (x1 - x);
      const c = y1 - a * x1 * x1 - b * x1;

      const circle = document.createElement('img');
      circle.className = styles.circle;
      circle.src = '/image/coinImage.svg';
      document.body.appendChild(circle);
      let sum = x1;

      const t = setInterval(function () {
        circle.style.display = 'block';
        const y = a * sum * sum + b * sum + c;
        circle.style.top = y + 'px';
        circle.style.left = sum + 'px';

        randomTilt === 'l' ? sum-- : sum++;
        if (randomTilt === 'l' ? sum <= x : sum >= x) {
          clearInterval(t);
          circle.style.display = 'none';
          document.body.removeChild(circle);
        }
      }, 5);
    }
    setTimeout(() => {
      document.body.removeChild(numElement);
    }, 1500);
  };
  return <></>;
}
