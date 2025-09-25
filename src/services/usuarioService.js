import { axiosConfig } from '../helpers/axios-config';

const getUsuarios = () => {
    return axiosConfig.get('usuario');
}

const createUsuario = (data) => {
    return axiosConfig.post('usuario', data);
}

const updateUsuario = (usuarioId, data) => {
    return axiosConfig.put(`usuario/${usuarioId}`, data);
}



export {
    getUsuarios, createUsuario, updateUsuario
}

