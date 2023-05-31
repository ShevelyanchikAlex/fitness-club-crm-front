import axios from "axios";
import {Cookies} from "react-cookie";

const API_URL = "http://localhost:8765/api/v1/order-service/schedules";
const cookies = new Cookies();

class ScheduleService {

    static async getAllSchedules(page = 0, size = 10) {
        return await axios.get(`${API_URL}/all`,
            {
                headers: {
                    'Authorization': cookies.get("token"),
                },
                params: {
                    page: page,
                    size: size,
                }
            }
        );
    };

    static async getAllSchedulesByTrainerId(page = 0, size = 10, trainerId) {
        return await axios.get(`${API_URL}/trainer/${trainerId}`,
            {
                headers: {
                    'Authorization': cookies.get("token"),
                },
                params: {
                    page: page,
                    size: size,
                }
            }
        );
    };

    static async saveSchedule(scheduleDto) {
        return await axios.post(`${API_URL}/create`, scheduleDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async updateSchedule(scheduleDto) {
        return await axios.patch(`${API_URL}/update`, scheduleDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async getScheduleById(id) {
        return await axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    };


    static async getSchedulesCount() {
        return await axios.get(`${API_URL}/count`, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    };

    static async getSchedulesCountByTrainerId(trainerId) {
        return await axios.get(`${API_URL}/count/trainer/${trainerId}`, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    };

}

export default ScheduleService;