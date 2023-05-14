import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import Services from "./pages/services/Services";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home/>} exact={true}/>
            <Route path="/services" element={<Services/>} exact={true}/>
            <Route path="/auth/sign-up" element={<SignUp/>} exact={true}/>
            <Route path="/auth/login" element={<Login/>} exact={true}/>
            <Route path="/user/profile" element={<Profile/>} exact={true}/>
            <Route path="*" element={<NotFound/>} exact={true}/>
        </Routes>
    );
};

export default AppRouter;