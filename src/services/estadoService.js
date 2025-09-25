import { axiosConfig } from '../helpers/axios-config';

const getEstadosEquipos = () => {
    return axiosConfig.get('estadoEquipo');
}

const createEstadoEquipo = (data) => {
    return axiosConfig.post('estadoEquipo', data);
}

const updateEstadoEquipo = (estadoEquipoId, data) => {
    return axiosConfig.put(`estadoEquipo/${estadoEquipoId}`, data);
}



export {
    getEstadosEquipos, createEstadoEquipo, updateEstadoEquipo
}

