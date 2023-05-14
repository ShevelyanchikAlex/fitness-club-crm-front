import axios from "axios";
import {Cookies} from "react-cookie";

const API_URL = "http://localhost:8765/api/v1/order-service/orders";
const cookies = new Cookies();

class ServiceService {

    static async getAllOrders(page = 0, size = 10) {
        return await axios.get(API_URL,
            {
                params: {
                    page: page,
                    size: size,
                }
            }
        );
    };

    static async getAllOrdersByUserId(page = 0, size = 10, userId) {
        return await axios.get(`${API_URL}/user/${userId}`,
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

    static async saveOrder(orderDto) {
        return await axios.post(API_URL, orderDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async updateOrder(userDto) {
        return await axios.patch(`${API_URL}/update`, userDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async getOrderById(id) {
        return await axios.get(`${API_URL}/${id}`);
    };


    static async getOrdersCount() {
        return await axios.get(`${API_URL}/count`);
    };

}

export default ServiceService;