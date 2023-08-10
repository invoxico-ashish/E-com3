import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Modal from '../Model';
import Card from './Card';
import Cart from './screens/Cart';
import { useCart } from './CartReducer';
// import Badge from "react-bootstrap/Badge"
// import Badge from "react-bootstrap/Badge"

function Navbar() {

    let data = useCart();
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    const handleLog = () => {
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Gofood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5 " aria-current="page" to="/">My Order</Link>
                                    </li> : ""
                            }
                        </ul>
                        {
                            (!localStorage.getItem("authToken")) ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-1" to="/login">LogIn</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/createuser">Sign UP</Link>
                                </div> :
                                <>
                                    <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                                        My Cart {" "}
                                        <div class="badge bg-secondary badge rounded-pill bg-danger">{data.length} </div>
                                    </div>
                                    {
                                        cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null
                                    }
                                    <div className='btn bg-danger text-white mx-2 ' onClick={handleLog}>
                                        Logout
                                    </div>
                                </>

                        }

                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar