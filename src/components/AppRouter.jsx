import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import Services from "./pages/service/Services";
import Trainers from "./pages/trainer/Trainers";
import AboutFitnessClub from "./pages/AboutFitnessClub";
import ClientReservedServices from "./pages/service/ClientReservedServices";
import UsersTable from "./pages/admin/UsersTable";
import TrainersTable from "./pages/admin/TrainersTable";
import ServicesTable from "./pages/admin/ServicesTable";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home/>} exact={true}/>
            <Route path="/services" element={<Services/>} exact={true}/>
            <Route path="/trainers" element={<Trainers/>} exact={true}/>
            <Route path="/contacts" element={<AboutFitnessClub/>} exact={true}/>
            <Route path="/user/services" element={<ClientReservedServices/>} exact={true}/>
            <Route path="/auth/sign-up" element={<SignUp/>} exact={true}/>
            <Route path="/auth/login" element={<Login/>} exact={true}/>
            <Route path="/user/profile" element={<Profile/>} exact={true}/>
            <Route path="/admin/users" element={<UsersTable/>} exact={true}/>
            <Route path="/admin/trainers" element={<TrainersTable/>} exact={true}/>
            <Route path="/admin/services" element={<ServicesTable/>} exact={true}/>
            <Route path="*" element={<NotFound/>} exact={true}/>
        </Routes>
    );
};

export default AppRouter;