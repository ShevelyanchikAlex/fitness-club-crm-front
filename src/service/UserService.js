import axios from "axios";
import {Cookies} from "react-cookie";

const API_URL = "http://localhost:8765/api/v1/user-service/users";
const cookies = new Cookies();

class UserService {

    static async getAllUsers(page = 0, size = 10) {
        return await axios.get(API_URL,
            {
                params: {
                    page: page,
                    size: size,
                },
                headers: {
                    'Authorization': cookies.get("token"),
                }
            }
        );
    };

    static async updateUser(userDto) {
        return await axios.patch(`${API_URL}/update`, userDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async getUserById(id) {
        return await axios.get(`${API_URL}/${id}`,
            {
                headers: {
                    'Authorization': cookies.get("token"),
                }
            }
        );
    };

    static async getUserByEmail(email) {
        return await axios.get(`${API_URL}/email/${email}`,
            {
                headers: {
                    'Authorization': cookies.get("token"),
                }
            }
        );
    };

    static async getUserOrders(id) {
        return await axios.get(`${API_URL}/${id}/orders`,
            {
                headers: {
                    'Authorization': cookies.get("token"),
                }
            }
        );
    };

    static async getUsersCount() {
        return await axios.get(`${API_URL}/count`,
            {
                headers: {
                    'Authorization': cookies.get("token"),
                }
            }
        );
    };

}

export default UserService;