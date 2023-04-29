import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/error/NotFound";

const AppRouter = () => {
    return (
        <Routes>
            {/*<Route path="/" element={<Users/>} exact={true}/>*/}
            {/*<Route path="/users" element={<Users/>} exact={true}/>*/}
            {/*<Route path="/users/:id" element={<UserItem/>} exact={true}/>*/}
            {/*<Route path="/deposits" element={<Deposits/>} exact={true}/>*/}
            {/*<Route path="/bank-fund-account" element={<BankFundAccount/>} exact={true}/>*/}
            {/*<Route path="/create-deposit" element={<CreateDeposit/>} exact={true}/>*/}
            {/*<Route path="/sign-up" element={<SignUp/>} exact={true}/>*/}
            {/*<Route path="/users/edit/:id" element={<EditUser/>} exact={true}/>*/}
            <Route path="*" element={<NotFound/>} exact={true}/>
        </Routes>
    );
};

export default AppRouter;