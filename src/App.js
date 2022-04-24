
import CreationPage from "./Pages/CreationPage";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import TaskPage from "./Pages/TaskPage";
import { Route, Router,Switch,BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ChatPage from "./Pages/ChatPage";
import OwnTaskPage from "./Pages/OwnTaskPage";
import Profile from "./Pages/Profile";
import RegisterPage from "./Pages/RegisterPage";
import VideoChat from "./Pages/VideoChat";
import LogOut from "./Pages/LogOut";

function App() {
  return (

    <BrowserRouter>
    <NavBar/>
    <Switch>
    <Route exact path="/" component={LandingPage}/>
    <Route exact path={"/login"} component={Login}/>
    <Route exact path="/register" component={RegisterPage}/>
    <Route exact path="/projects" component={CreationPage}/>
    <Route exact path={"/grouptask"} component={TaskPage}/>
    <Route exact path={"/profile"} component={Profile}/>
    <Route exact path={"/chat"} component={ChatPage}/>
    <Route exact path={"/mywork"} component={OwnTaskPage}/>
    <Route exact path={"/video"} component={VideoChat}/>
    <Route exact path={"/logout"} component={LogOut}/>
    </Switch>
    </BrowserRouter>
    

    
  );
}

export default App;
