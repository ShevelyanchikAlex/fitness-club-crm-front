import axios from "axios";
import {Cookies} from "react-cookie";

const API_URL = "http://localhost:8765/api/v1/user-service/trainers";
const cookies = new Cookies();

class TrainerService {

    static async getAllTrainers(page = 0, size = 10) {
        return await axios.get(API_URL,
            {
                params: {
                    page: page,
                    size: size,
                }
            }
        );
    };

    static async saveTrainer(trainerDro) {
        return await axios.post(`${API_URL}/create`, trainerDro, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async updateTrainer(trainerDto) {
        return await axios.patch(`${API_URL}/update`, trainerDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async getTrainerById(id) {
        return await axios.get(`${API_URL}/${id}`,
            {
                headers: {
                    'Authorization': cookies.get("token"),
                }
            }
        );
    };


    static async getTrainerReservations(id) {
        return await axios.get(`${API_URL}/${id}/orders`,
            {
                headers: {
                    'Authorization': cookies.get("token"),
                }
            }
        );
    };

    static async getTrainersCount() {
        return await axios.get(`${API_URL}/count`);
    };

}

export default TrainerService;