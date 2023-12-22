import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


const Signin = () => {
 
 const {state, dispatch} = useContext(UserContext);


  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const loginUser = async (e) => {
      e.preventDefault();

      const res = await fetch("/login", {
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            email,password
        }) 
  });

  const data = await res.json();
  if(data.error === "Register new email Id"){
    window.alert("Register Your EmailId")
    navigate("/signup");
  }
  else if(data.status===400 || !data){
    window.alert('Invalid login credential');
  }

  else{
    dispatch({type:"USER", payload:true})
    window.alert('Login Successfully');
    navigate("/");
  }


}


  return (
    <>
      <div className='register-form'>
        <form method="POST">
          <div class="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" name="email" class="form-control" id="email" placeholder="Enter email" autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value) } />
          </div>

          <div class="form-group">
            <label htmlFor="password">Password</label>

            <input type="password" name="password" class="form-control" id="password" placeholder="Password" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />

          </div>
          <button type="submit" class="btn btn-primary" value="Log In" onClick={loginUser}>Log In</button>
        </form>
      </div>
    </>
  )
}

export default Signin
