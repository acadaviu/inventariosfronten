import { axiosConfig } from '../helpers/axios-config';

const getTiposEquipos = () => {
    return axiosConfig.get('tipoEquipo');
}

const createTipoEquipo = (data) => {
    return axiosConfig.post('tipoEquipo', data);
}

const updateTipoEquipo = (tipoEquipoId, data) => {
    return axiosConfig.put(`tipoEquipo/${tipoEquipoId}`, data);
}



export {
    getTiposEquipos, createTipoEquipo, updateTipoEquipo
}
