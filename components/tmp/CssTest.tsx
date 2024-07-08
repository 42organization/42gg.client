import './style.scss';

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
      <div className='test-box'>test</div>

      <button onClick={() => switchTheme()}>switch</button>
    </div>
  );
};

export default CssTest;
