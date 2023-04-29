import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
      <BrowserRouter>
          <Header/>
          <AppRouter/>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
