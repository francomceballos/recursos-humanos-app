import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditEmployee() {

    const urlBase = "http://localhost:8080/rrhh-app/employees";


    let navigation= useNavigate();

    const {id} = useParams();

    const [employee, setEmployees]=useState({
        name:"",
        area:"",
        salary:""
    })

    const{name, area, salary} = employee

    useEffect(()=>{
        loadEmployee();
    },[])

    const loadEmployee = async () => {
        const result = await axios.get(`${urlBase}/${id}`)
        setEmployees(result.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setEmployees({...employee, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${urlBase}/${id}`, employee)
        // Redirigimos a la pagina de inicio
        navigation('/');
    }


  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Edit employee</h3>
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
                className="btn btn-warning btn-sm me-3">Save</button>
            <a href='/' className='btn btn-danger btn-sm'>Cancel</a>    
        </div>
        </form>
    </div>
  )
}
