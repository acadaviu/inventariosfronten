import React, { useState, useEffect } from 'react';
import { getMarcas, createMarca, updateMarca } from '../../services/marcaService' 
import Swal from 'sweetalert2';
const moment = require('moment');

export const MarcaView = () => {

const [marcas, setMarcas] = useState([]);

const listarMarcas = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const res = await getMarcas();
      setMarcas(res.data);
      
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
};

useEffect(() => {
    listarMarcas();
}, []);

  return (
    <div className='container-fluid mt-4'>
      <form>
        <div className='col-lg-8'>
          <label className='form-label'>Nombre </label>
          <input  required name='nombre' />
        </div>
      </form>
    </div>

  )
}
