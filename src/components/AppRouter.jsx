import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/sign-up" element={<SignUp/>} exact={true}/>
            <Route path="/auth/login" element={<Login/>} exact={true}/>
            <Route path="*" element={<NotFound/>} exact={true}/>
        </Routes>
    );
};

export default AppRouter;