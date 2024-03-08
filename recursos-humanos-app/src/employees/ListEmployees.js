import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { NumericFormat } from 'react-number-format';

export default function ListEmployees() {

    const urlBase = "http://localhost:8080/rrhh-app/employees";

    const [employees, setEmployees] = useState([]);

    useEffect(()=>{
        loadEmployees();
    }, []);

const loadEmployees = async () => {
    const result = await axios.get(urlBase);
    setEmployees(result.data);
    console.log(result.data);
}

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Human Resources System</h3>
        </div>

        <table className="table table-striped table-hover align-middle">
        <thead className='table-dark'>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Area</th>
                <th scope="col">Salary</th>
            </tr>
        </thead>
        <tbody>
            {
                employees.map((employee, index) => (
                <tr key={index}>
                <th scope="row">{employee.idEmployee}</th>
                    <td>{employee.name}</td>
                    <td>{employee.area}</td>
                    <td><NumericFormat value={employee.salary}
                        displayType={'text'}
                        thousandsSeparator=',' prefix={'$'}
                        decimalScale={2} fixedDecimalScale/>
                    </td>
                </tr>
            ))
            }
        </tbody>
        </table>
    </div>
  )
}
