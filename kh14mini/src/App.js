import { HashRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
      <HashRouter>
        <Menu />
        <MainContent />
      </HashRouter>
    </>
  );
}

export default App;
