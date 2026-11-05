import axios from 'axios';

const API_URL = 'http://localhost:8080/api/stroski';

const getAllStroski = (params = {}) => {
    return axios.get(API_URL, { params });
};

const getKategorije = () => {
    return axios.get(`${API_URL}/kategorije`);
};

const getStrosekById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createStrosek = (strosek) => {
    return axios.post(API_URL, strosek);
};

const updateStrosek = (id, strosek) => {
    return axios.put(`${API_URL}/${id}`, strosek);
};

const deleteStrosek = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const StrosekServis = {
    getAllStroski,
    getKategorije,
    getStrosekById,
    createStrosek,
    updateStrosek,
    deleteStrosek
};

export default StrosekServis;