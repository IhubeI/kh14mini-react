import MainContent from "./components/MainContent";
import Menu from "./components/Menu";

import { BrowserRouter, HashRouter } from "react-router-dom";

const App = ()=>{
  return (
    <>
      <HashRouter>
        <Menu/>
        <MainContent/>
      </HashRouter>
    </>
  );
}

export default App;