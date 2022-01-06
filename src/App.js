import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import TimerContainer from "./components/Timer/TimerContainer";
import Login from "./components/Login/Login";

function App() {
  return (
      <BrowserRouter>
          <div className="app-wrapper">
              <Header/>
              <Navbar/>
              <div className="app-wrapper-content">
                <Route path='/timer' render={ () => <TimerContainer />}/>
                <Route path='/login' render={ () => <Login />}/>
              </div>
          </div>
      </BrowserRouter>

  );
}

export default App;
