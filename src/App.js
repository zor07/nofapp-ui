import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TimerContainer from "./components/Timer/TimerContainer";
import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Component} from "react";
import {initializeApp} from "./redux/app-reducer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store from "./redux/redux-store";

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path='/timer' element={<TimerContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

const AppContainer = compose(
    connect(mapStateToProps, {initializeApp}))
(App);

const AppMain = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}

export default AppMain