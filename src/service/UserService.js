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

    static async updateUserEmailByActualEmail(actualEmail, updatedEmail) {
        return await axios.patch(`${API_URL}/update/${actualEmail}/email`, null, {
            params: {
                updatedEmail: updatedEmail,
            },
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async updateUserStatus(id, userStatus) {
        return await axios.patch(`${API_URL}/update/${id}/status`, null, {
            params: {
                status: userStatus
            },
            headers: {
                'Authorization': cookies.get("token")
            }
        });
    }

    static async updateUserProfileImage(email, profileImage) {
        return await axios.post(`${API_URL}/update/${email}/profile-image`, profileImage, {
            headers: {
                'Authorization': cookies.get("token"),
                'Content-Type': `multipart/form-data; boundary=${profileImage._boundary}`,
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

    static async getUserProfileByEmail(email) {
        return await axios.get(`${API_URL}/${email}/with-profile-image`,
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