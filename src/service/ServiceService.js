import axios from "axios";
import {Cookies} from "react-cookie";

const API_URL = "http://localhost:8765/api/v1/order-service/services";
const cookies = new Cookies();

class ServiceService {

    static async getAllServices(page = 0, size = 10) {
        return await axios.get(API_URL,
            {
                params: {
                    page: page,
                    size: size,
                }
            }
        );
    };

    static async updateService(userDto) {
        return await axios.patch(`${API_URL}/update`, userDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async getServiceById(id) {
        return await axios.get(`${API_URL}/${id}`);
    };


    static async getServicesCount() {
        return await axios.get(`${API_URL}/count`);
    };

}

export default ServiceService;