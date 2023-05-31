import axios from "axios";
import {Cookies} from "react-cookie";

const API_URL = "http://localhost:8765/api/v1/news-service/news";
const cookies = new Cookies();

class NewsArticleService {

    static async getAllNewsArticles(page = 0, size = 10) {
        return await axios.get(`${API_URL}/all`,
            {
                params: {
                    page: page,
                    size: size,
                }
            }
        );
    };

    static async saveNewsArticle(newsArticleDto) {
        return await axios.post(`${API_URL}/create`, newsArticleDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async updateNewsArticle(newsArticleDto) {
        return await axios.patch(`${API_URL}/update`, newsArticleDto, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    }

    static async getNewsArticleById(id) {
        return await axios.get(`${API_URL}/${id}`);
    };

    static async getNewsFromNewsApi(category, daysOffset, country) {
        return await axios.get(`${API_URL}/news-api`,
            {
                params: {
                    category: category,
                    daysOffset: daysOffset,
                    country: country
                },
                headers: {
                    'Authorization': cookies.get("token"),
                }
            }
        );
    };

    static async getNewsArticlesCount() {
        return await axios.get(`${API_URL}/count`);
    };

    static async deleteNewsArticleById(id) {
        return await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': cookies.get("token"),
            }
        });
    };

}

export default NewsArticleService;