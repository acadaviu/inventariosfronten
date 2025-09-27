import React, { useState, useEffect, use } from 'react';
import { getMarcas, createMarca, updateMarca } from '../../services/marcaService' 
import Swal from 'sweetalert2';
const moment = require('moment');

export const MarcaView = () => {

const [ valoresForm, setValoresForm  ] = useState([]);
const [marcas, setMarcas] = useState([]);
const [editando, SetEditando] = useState([]);
const [marcaEditando, setMarcaEditando] = useState([]);
const {nombre = '', estado = ''} = valoresForm;

const listarMarcas = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const respuesta = await getMarcas();
      setMarcas(respuesta.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
};

useEffect(() => {
    listarMarcas();
}, []);


const handleOnChange = (e) => {
  setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
}


  const handleCrearMarca = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text:  'Cargando...'
      });
      Swal.showLoading();

      const respuesta = await createMarca(valoresForm)
      setValoresForm({ nombre: '', estado: '' })
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCrearMarca(e)}>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='mb-3'>
              <label className='form-label'>Nombre </label>
              <input  required name='nombre'  type='text' className='form-control'
              onChange={(e) => handleOnChange(e)}/>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='mb-3'>
              <label className='form-label'>Estado </label>
              <select required  name='estado' className='form-select' onChange={(e) => handleOnChange(e)} > 
                <option value=''>---SELECCIONAR---</option>
                <option value='Activo'>Activo</option>
                <option value='Inactivo'>Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <button className='btn btn-primary'>Guardar</button> 
      </form>

      <table className='table'>
      <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
      <tbody>
          {
            marcas.length > 0 && marcas.map((marca, index) => {
              return <tr key={marca._id || index }>
                <th scope='row'> {index + 1}</th>
                <td>{marca.nombre}</td>
                <td>{marca.estado}</td>
                <td>{moment(marca.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(marca.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>

                <td>
                  <button className='btn btn-warning btn-sm me-2' 
                  //onClick={(e) => handleEditar(e, marca)}
                  >
                    Actualizar</button>
                  <button className='btn btn-danger btn-sm'>Eliminar</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>


    </div>

  )
}
