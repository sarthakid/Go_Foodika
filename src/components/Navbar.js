

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import { useState } from 'react';
import Modal from '../Modal';
import { useCart } from './ContextReducer';


function Navbar() {
  const [cartView, setCartView] = useState(false)
  let data = useCart();
  
  const navigate = useNavigate();
  const handleLogout = ()=> {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-7 btn bg-white text-black mx-1" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-7 btn bg-white text-black mx-1" aria-current="page" to="/myOrder">My Order</Link>
                </li>
                : ""}
            </ul>

            {(!localStorage.getItem("authToken")) ?

              <div className='d-flex'>
                <Link className="btn bg-white text-black mx-1" to="/Login">Login</Link>
                <Link className="btn bg-white text-black mx-1" to="/createuser">signup</Link>
              </div>
                :
                <div>
<div className='btn bg-white text-success mx-2' onClick={()=>setCartView(true)}>
                My Cart {" "}
                <Badge pill bg="danger">{data.length}</Badge>
              </div>
{cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
              <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                Log Out
              </div>
              </div>
            }

            </div>
          </div>
      </nav>

    </div>
  )
}

export default Navbar





