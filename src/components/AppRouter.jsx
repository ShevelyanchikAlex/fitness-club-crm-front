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
import AdminUsersTable from "./pages/admin/AdminUsersTable";
import AdminTrainersTable from "./pages/admin/AdminTrainersTable";
import AdminServicesTable from "./pages/admin/AdminServicesTable";
import AdminServiceCreationForm from "./pages/admin/form/AdminServiceCreationForm";
import AdminTrainerCreationForm from "./pages/admin/form/AdminTrainerCreationForm";
import Schedule from "./pages/schedule/Schedule";
import TrainerTrainersTable from "./pages/trainer/TrainerTrainersTable";
import TrainerReservationsTable from "./pages/trainer/TrainerReservationsTable";
import TrainerScheduleTable from "./pages/trainer/TrainerScheduleTable";
import TrainerScheduleCreationForm from "./pages/trainer/form/TrainerScheduleCreationForm";
import AdminScheduleTable from "./pages/admin/AdminScheduleTable";
import AdminScheduleCreationForm from "./pages/admin/form/AdminScheduleCreationForm";
import AdminServiceEditForm from "./pages/admin/form/AdminServiceEditForm";
import AdminTrainerEditForm from "./pages/admin/form/AdminTrainerEditForm";
import AdminScheduleEditForm from "./pages/admin/form/AdminScheduleEditForm";
import AdminReservationsTable from "./pages/admin/AdminReservationsTable";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} exact={true}/>
            <Route path="/home" element={<Home/>} exact={true}/>
            <Route path="/services" element={<Services/>} exact={true}/>
            <Route path="/schedule" element={<Schedule/>} exact={true}/>
            <Route path="/trainers" element={<Trainers/>} exact={true}/>
            <Route path="/contacts" element={<AboutFitnessClub/>} exact={true}/>
            <Route path="/user/services" element={<ClientReservedServices/>} exact={true}/>
            <Route path="/auth/sign-up" element={<SignUp/>} exact={true}/>
            <Route path="/auth/login" element={<Login/>} exact={true}/>
            <Route path="/user/profile" element={<Profile/>} exact={true}/>
            <Route path="/trainer/trainers" element={<TrainerTrainersTable/>} exact={true}/>
            <Route path="/trainer/reservations" element={<TrainerReservationsTable/>} exact={true}/>
            <Route path="/trainer/schedule" element={<TrainerScheduleTable/>} exact={true}/>
            <Route path="/trainer/schedule/create" element={<TrainerScheduleCreationForm/>} exact={true}/>
            <Route path="/admin/users" element={<AdminUsersTable/>} exact={true}/>
            <Route path="/admin/trainers" element={<AdminTrainersTable/>} exact={true}/>
            <Route path="/admin/services" element={<AdminServicesTable/>} exact={true}/>
            <Route path="/admin/reservations" element={<AdminReservationsTable/>} exact={true}/>
            <Route path="/admin/services/edit" element={<AdminServiceEditForm/>} exact={true}/>
            <Route path="/admin/services/create" element={<AdminServiceCreationForm/>} exact={true}/>
            <Route path="/admin/trainers/create" element={<AdminTrainerCreationForm/>} exact={true}/>
            <Route path="/admin/trainers/update" element={<AdminTrainerEditForm/>} exact={true}/>
            <Route path="/admin/schedule/create" element={<AdminScheduleCreationForm/>} exact={true}/>
            <Route path="/admin/schedule/update" element={<AdminScheduleEditForm/>} exact={true}/>
            <Route path="/admin/schedule" element={<AdminScheduleTable/>} exact={true}/>
            <Route path="*" element={<NotFound/>} exact={true}/>
        </Routes>
    );
};

export default AppRouter;