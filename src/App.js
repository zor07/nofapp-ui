import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="app-wrapper">
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
            Content
        </div>
    </div>
  );
}

export default App;
