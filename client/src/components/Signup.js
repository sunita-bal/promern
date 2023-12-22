import React , {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink, useNavigate} from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const PostData = async (e) => {
       e.preventDefault();

       const {name,email,password,cpassword} = user;

       const res = await fetch("/register", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            name,email,password,cpassword
        })
       });

       const data = await res.json();
       console.log(data);

       if (data.status === 422 && data.error === "Missing required fields") {
        window.alert("Fill in the following required fields");
      } 
      else if (data.status === 422 && data.error === "email already exist") {
        window.alert("Email already exists. Please use a different email.");
      } 
      else if (data.status === 422 && data.error === "password are not matching") {
        window.alert("password are not matching");
      } 
      else {
        window.alert("Registration Successful");
        console.log("Registration Successful");
        navigate("/signin");
      }
    }

    return (
        <>
        <div className='register-form'>
            <form method="POST" className='container register'>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="name" 
                    name="name"
                    className="form-control" id="name" 
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Enter Name" autoComplete='off' />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" 
                    name="email"
                    className="form-control" id="email" 
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Enter email" autoComplete='off'/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    name="password"  
                    className="form-control" id="password" 
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Password" autoComplete='off'/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Your Password</label>
                    <input type="cpassword" 
                    name="cpassword"
                    className="form-control" id="cpassword" 
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your Password" autoComplete='off'/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={PostData}>Register</button>
                <NavLink to='/signin'>Im already register</NavLink>
            </form>
            </div>
        </>
    )
}

export default Signup
