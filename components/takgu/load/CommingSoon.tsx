import styles from 'styles/load/CommingSoon.module.scss';

// code by: https://codepen.io/bratzie/pen/dOgXBq#anon-signup
export default function Loading() {
  return (
    <div>
      <div className={styles.display}>
        <div>
          <h2 className={styles.loadTextRed}>Comming Soon !!!</h2>
          <h2 className={styles.loadTextWhite}>Comming Soon !!!</h2>
        </div>
        <div className={styles.loadBottom}>
          <h2 className={styles.loadTextRedBottom}>Comming Soon !!!</h2>
          <h2 className={styles.loadTextWhiteBottom}>Comming Soon !!!</h2>
        </div>
      </div>
      <div className={styles.container}>
        <div>
          <div className={styles.spinner}>
            <h1 className={styles.title}>42GG</h1>
            <svg className={[styles.raquet, styles.r1].join(' ')}>
              <ellipse
                className={styles.front}
                cx='44'
                cy='50'
                rx='35'
                ry='50'
              />
              <ellipse
                className={styles.middle}
                cx='42'
                cy='50'
                rx='35'
                ry='50'
              />
              <ellipse
                className={styles.back}
                cx='40'
                cy='50'
                rx='35'
                ry='50'
              />
              <rect
                className={styles.outer}
                x='40'
                y='100'
                width='10'
                height='42'
              />
              <rect
                className={styles.inner}
                x='38'
                y='100'
                width='10'
                height='41'
              />
              <rect
                className={styles.outer}
                x='35'
                y='100'
                width='10'
                height='40'
              />
              <ellipse
                className={styles.shadow}
                id='sor-1'
                cx='40'
                cy='50'
                rx='7'
                ry='10'
              />
            </svg>
            <svg className={[styles.raquet, styles.r2].join(' ')}>
              <ellipse
                className={styles.back}
                cx='40'
                cy='50'
                rx='35'
                ry='50'
              />
              <ellipse
                className={styles.middle}
                cx='42'
                cy='50'
                rx='35'
                ry='50'
              />
              <ellipse
                className={styles.front}
                cx='44'
                cy='50'
                rx='35'
                ry='50'
              />
              <rect
                className={styles.outer}
                x='35'
                y='100'
                width='10'
                height='42'
              />
              <rect
                className={styles.inner}
                x='37'
                y='100'
                width='10'
                height='41'
              />
              <rect
                className={styles.outer}
                x='40'
                y='100'
                width='10'
                height='40'
              />
              <ellipse
                className={styles.shadow}
                id='sor-2'
                cx='44'
                cy='50'
                rx='7'
                ry='10'
              />
            </svg>
            <div className={styles.ball_container}>
              <svg className={styles.ball}>
                <circle cx='20' cy='20' r='12' />
              </svg>
            </div>
            <svg className={styles.shadow}>
              <ellipse
                className={styles.sr_1}
                cx='70'
                cy='30'
                rx='50'
                ry='15'
              />
              <ellipse
                className={styles.sb}
                cx='150'
                cy='30'
                rx='15'
                ry='4.5'
              />
              <ellipse
                className={styles.sr_2}
                cx='230'
                cy='30'
                rx='50'
                ry='15'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
