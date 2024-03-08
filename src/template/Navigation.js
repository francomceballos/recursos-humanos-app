import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className='container'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><strong>Human Resources</strong></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" aria-current="page" href="/"><strong>Home</strong></a>
              <Link className="nav-link " to="/add"><strong>Add employee</strong></Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
