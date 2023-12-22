import React , {useEffect, useContext}from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {

const {state, dispatch} = useContext(UserContext);

const navigate = useNavigate();

    // const callLogoutPage = async () => {

    //     try{
      
    //       const res = await fetch('/logout', {
    //         method:"GET",
    //         headers:{
    //           "Content-Type":"application/json"
    //         },
    //       });
      
    //       const data = await res.json();
    //       console.log(data);
      
    //       setUserData({...userData, name:data.name, email:data.email});
      
    //       if(!res.status === 400){
    //         const error = new Error(res.error);
    //         throw error;
    //       }
      
    //     }
    //     catch (err){
    //         console.log(err);
    //     }
    //   }
      
    useEffect(() => {
        fetch('/logout', {
            method:"GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({type:"USER", payload:false});
            navigate('/signin', {replace : true});
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
              }
        }).catch((err) => {
            console.log(err);
        });
    });
  return (
    <div>
      <h1>User Logout</h1>
    </div>
  )
}

export default Logout
