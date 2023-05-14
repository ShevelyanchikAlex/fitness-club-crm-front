import axios from "axios";
import {Cookies} from "react-cookie";

const API_URL = "http://localhost:8765/api/v1/auth-service/auth";
const cookies = new Cookies();

class AuthService {

    static async login(authenticationRequest) {
        return await axios.post(`${API_URL}/login`, authenticationRequest);
    };

    static async signup(userDto) {
        return await axios.post(`${API_URL}/signup`, userDto);
    };

    static async logout() {
        cookies.remove("token", {path: '/'});
        localStorage.removeItem("user-email");
        localStorage.removeItem("user-role");
    }

}

export default AuthService;