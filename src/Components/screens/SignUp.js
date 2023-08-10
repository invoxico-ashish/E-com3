import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import axios from "axios";

function SignUp() {


    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })
    const navigate = useNavigate();
    // useEffect(()=>{

    // })
    // const handlesubmit = (e) => {
    //     e.preventDefault();
    //     axios.post("http://localhost:5000/api/createuser")
    //     .then( (response)=> {
    //         console.log(response);
    //     })
    //     .catch((error)=> {
    //         console.log(error);
    //     })
    // };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        });
        const Json = await response.json()
        console.log(Json);
        if (!Json.success) {
            alert("enter valid credentials")
        } else (
          navigate("/login")

        );
    console.log(credentials)
};

const onchange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
}

return (
    <>
        <div className="container">
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">name</label>
                    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onchange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">address</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name="location" value={credentials.location} onChange={onchange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'> Already a User

                </Link>
            </form>
        </div>
    </>
)
}

export default SignUp