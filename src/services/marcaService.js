import { axiosConfig } from '../helpers/axios-config';

const getMarcas = () => {
    return axiosConfig.get('marca');
}

const createMarca = (data) => {
    return axiosConfig.post('marca', data);
}

const updateMarca = (marcaId, data) => {
    return axiosConfig.put(`marca/${marcaId}`, data);
}



export {
    getMarcas, createMarca, updateMarca
}

