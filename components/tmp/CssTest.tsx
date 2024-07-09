import styles from './style.module.scss';

const CssTest = () => {
  const switchTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };
  return (
    <div id='container'>
      <h1>TEST menu</h1>
      <div className={styles.test_box}>test</div>
      <div className={styles.fuck}>????</div>
      <button onClick={() => switchTheme()}>switch</button>
    </div>
  );
};

export default CssTest;
