import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';


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
    const deleteEmployee = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
        if (isConfirmed) {
            // Proceed with the delete operation
            try {
                await axios.delete(`${urlBase}/${id}`);
                // Optionally, refresh the list of employees or remove the deleted employee from the state
                loadEmployees(); // Assuming loadEmployees is a function that fetches the updated list
            } catch (error) {
                console.error("There was an error deleting the employee:", error);
                // Handle error (e.g., show an error message)
            }
        }
    };
    

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
                <th></th>
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
                    <td className='text-center'>
                        <div>
                        <Link className='btn btn-primary btn-sm me-3' to={`/edit/${employee.idEmployee}`}>Edit</Link>
                        <button onClick={()=> deleteEmployee(employee.idEmployee)} className='btn btn-danger btn-sm'> Delete</button>
                        </div>
                    </td>
                </tr>
            ))
            }
        </tbody>
        </table>
    </div>
  )
}
