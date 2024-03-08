import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div classNameName='container'>
        <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
        <a className="navbar-brand" href="/">HR System</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div classNameName="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add">Add employee</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
