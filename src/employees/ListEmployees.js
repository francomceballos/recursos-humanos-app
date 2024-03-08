import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';


export default function ListEmployees() {

    const urlBase = "http://localhost:8080/rrhh-app/employees";

    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [employeeIdToDelete, setEmployeeToDelete] = useState(null);

    useEffect(()=>{
        loadEmployees();
    }, []);
    

    const loadEmployees = async () => {
        const result = await axios.get(urlBase);
        setEmployees(result.data);
        console.log(result.data);
    }
    const deleteEmployee = async (id) => {
        setEmployeeToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${urlBase}/${employeeIdToDelete}`);
            loadEmployees();
        }   catch (error) {
            console.error("There was an error deleting the employee:", error);
        }
        setShowModal(false);
    }

    const closeModal = () => {
        setShowModal(false);
    };
    

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Human Resources System</h3>
        </div>

        <table className="table table-striped table-hover table-success align-middle caption-top" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <caption>List of employees</caption>
        <thead className='table-dark'>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Area</th>
                <th scope="col">Salary</th>
                <th scope='col'>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                employees.map((employee, index) => (
                <tr key={index}>
                <th scope="row">{employee.idEmployee}</th>
                    <td>{employee.name}</td>
                    <td>{employee.area}</td>
                    <td>
                        <NumericFormat 
                        value={employee.salary}
                        displayType={'text'}
                        thousandsSeparator=','
                        prefix={'$ '}
                        decimalScale={3} 
                        fixedDecimalScale
                        />
                    </td>
                    <td className=''>
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

            {/* Modal for delete confirmation */}
        {showModal && (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this employee?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
