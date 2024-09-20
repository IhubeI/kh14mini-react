import Menu from "./components/Menu";
import MainContent from "./components/MainContent";
import { HashRouter, BrowserRouter } from "react-router-dom";

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
