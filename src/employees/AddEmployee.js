import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddEmployee() {
    let navigation= useNavigate();

    const [employee, setEmployees]=useState({
        name:"",
        area:"",
        salary:""
    })

    const{name, area, salary} = employee

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setEmployees({...employee, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/rrhh-app/employees";
        await axios.post(urlBase, employee);
        // Redirigimos a la pagina de inicio
        navigation('/');
    }


  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Add employee</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" 
            id="name" name='name' required={true} 
            value={name} onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="area" 
                className="form-label">Area</label>
            <input type="text" className="form-control" 
            id="area" name='area'
            value={area} onChange={(e) => onInputChange(e)} />
        </div>
        <div className="mb-3">
            <label htmlFor="salary" 
                className="form-label">Salary</label>
            <input type="number" step="any" className="form-control" 
            id="salary" name='salary'
            value={salary} onChange={(e) => onInputChange(e)}/>
        </div>
        <div className='text-center'>
            <button type="submit" 
                className="btn btn-warning btn-sm me-3">Add</button>
            <a href='/' className='btn btn-danger btn-sm'>Cancel</a>    
        </div>
        </form>
    </div>
  )
}
