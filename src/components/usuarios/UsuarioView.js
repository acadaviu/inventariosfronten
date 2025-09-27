import React, { useState, useEffect, use } from 'react';
import { getUsuarios, createUsuario, updateUsuario } from '../../services/usuarioService' 
import Swal from 'sweetalert2';
const moment = require('moment');

export const UsuarioView = () => {

const [ valoresForm, setValoresForm  ] = useState([]);
const [usuarios, setUsuarios] = useState([]);
const [editando, SetEditando] = useState([]);
const [marcaEditando, setMarcaEditando] = useState([]);
const {nombre = '', estado = ''} = valoresForm;

const listarUsuarios = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const respuesta = await getUsuarios();
      setUsuarios(respuesta.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
};

useEffect(() => {
    listarUsuarios();
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

      const respuesta = await createUsuario(valoresForm)
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
          <div className='col-lg-4'>
            <div className='mb-3'>
              <label className='form-label'>Nombre </label>
              <input  required name='nombre'  type='text' className='form-control'
              onChange={(e) => handleOnChange(e)}/>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='mb-3'>
              <label className='form-label'>Email </label>
              <input  required name='email'  type='email' className='form-control'
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
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
      <tbody>
          {
            usuarios.length > 0 && usuarios.map((usuario, index) => {
              return <tr key={usuario._id || index }>
                <th scope='row'> {index + 1}</th>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.estado}</td>
                <td>{moment(usuario.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(usuario.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>

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
