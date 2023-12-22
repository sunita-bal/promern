import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';

const Contact = () => {

const [userData, setUserData] = useState({name:"",email:"",message:""});

  const callContactPage= async () => {

    try{
  
      const res = await fetch('/getData', {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      });
  
      const data = await res.json();
      console.log(data);
  
      setUserData({...userData, name:data.name, email:data.email});
  
      if(!res.status === 400){
        const error = new Error(res.error);
        throw error;
      }
  
    }
    catch (err){
        console.log(err);
    }
  }
  
  useEffect(() => {
     callContactPage();
  }, []);

const handleInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  setUserData({...userData, [name]:value})
}


const contactForm = async (e) => {
  e.preventDefault();

  const {name,email,message} = userData;
  const res = await fetch('/contact', {
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name,email,message
    })
  });

const data = await res.json();
console.log(data);


if(!data || data.error === "Please fill the contact form"){
  alert("Message not send");
  console.log("Message not send");
}
else{
  alert("Message send");
  setUserData({...userData, message:""});
}

}

  return (
    <>
      <div className='contact-box container'>
        <div className='contact-content'>
          <h1>Get In Touch</h1>
          <form method='POST'>
            <div class="form-row row">
              <div class="form-group col-md-6">
                <input  class="form-control" placeholder="Name" name="name" value={userData.name} onChange={handleInput}/>
              </div>
              <div class="form-group col-md-6">
               
                <input class="form-control"placeholder="Email" name="email" value={userData.email} onChange={handleInput} />
              </div>
            </div>
            <div class="form-group">
    
    <textarea placeholder="Message" class="form-control" id="exampleFormControlTextarea1" rows="3" name="message" value={userData.message} onChange={handleInput}></textarea>
  </div>
            
            <button type="submit" class="btn btn-primary" onClick={contactForm}>Send Message</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact
