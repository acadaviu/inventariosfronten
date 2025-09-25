import React, { useState, useEffect } from 'react'
import { getMarcas } from '../../services/marcaService';
import { getEstadosEquipos } from '../../services/estadoService';
import { getTiposEquipos } from '../../services/tipoService';
import { getUsuarios } from '../../services/usuarioService';
import { createInventario } from '../../services/inventarioService';
import Swal from 'sweetalert2';


export const InventarioNew = ({ handleOpenModal, listarInventarios }) => {

  const [ usuarios, setUsuarios ] = useState([]);
  const [ marcas, setMarcas ] = useState([]);
  const [ tipos, setTipos ] = useState([]);
  const [ estados, setEstados ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState([]);
  const { serial = '', modelo = '', descripcion = '', color = '', 
    foto = '', fechaCompra = '', precio = '', usuario, marca, tipo, estado } = valoresForm

  const listarUsuarios = async () => {
    try {
      const { data } = await getUsuarios();
      setUsuarios(data);

    } catch (error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    listarUsuarios();
  }, []);


  const listarMarcas = async () => {
    try {
      const { data } = await getMarcas();
      setMarcas(data);

    } catch (error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    listarMarcas();
  }, []);


  const listarTipos = async () => {
    try {
      const { data } = await getTiposEquipos();
      setTipos(data);

    } catch (error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    listarTipos();
  }, []);



  const listarEstados = async () => {
    try {
      const { data } = await getEstadosEquipos();
      setEstados(data);

    } catch (error){
      console.log(error);
      
    }
  }

  useEffect(() => {
    listarEstados();
  }, []);



  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const inventario = {
      serial, modelo, descripcion, color, foto, 
      fechaCompra, precio,
      usuario: {
        _id: usuario
      },
      marca: {
        _id: marca
      },
      tipoEquipo: {
        _id: tipo
      },
      estadoEquipo: {
        _id: estado
      }
    }
    console.log(inventario);

    try {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const { data } = await createInventario(inventario);
      handleOpenModal();
      listarInventarios();
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nuevo Inventario</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className='row'>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name='serial'
                  value={serial}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Modelo </label>
                <input type="text" name='modelo'
                  value={modelo}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Descripción </label>
                <input type="text" name='descripcion'
                  value={descripcion}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Color </label>
                <input type="text" name='color'
                  value={color}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Foto </label>
                <input type="url" name='foto'
                  value={foto}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Compra </label>
                <input type="date" name='fechaCompra'
                  value={fechaCompra}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Precio </label>
                <input type="number" name='precio'
                  value={precio}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Usuario </label>
                <select className='form-select'
                  required
                  name='usuario'
                  value={usuario}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    usuarios.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Marca </label>
                <select className='form-select'
                  required
                  name='marca'
                  value={marca}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    marcas.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo Equipo</label>
                <select className='form-select'
                  required
                  name='tipo'
                  value={tipo}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    tipos.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Estado Equipo</label>
                <select className='form-select'
                  required
                  name='estado'
                  value={estado}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    estados.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Guardar</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

