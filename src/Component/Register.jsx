import React,{useEffect,useState} from 'react'
import registerImg from './Assets/register.svg'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link ,useNavigate} from "react-router-dom";

const Register = (props) => {
  useEffect(() => {
    props.showNotes(false);
  }, []);
  let history = useNavigate()

  const [cred, setCred] = useState({ fullName:"", email:"",password:""})

  const handleClick =async (e)=>{
    e.preventDefault();
    const response = await fetch(`https://bored-cod-fez.cyclic.app/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({ name:cred.fullName, email: cred.email, password: cred.password})
      
    });
    const json = await response.json();
    console.log(json)
    
    if(json.createUserSuccess){
      //redirect
     
      history("/login")
      props.showAlert("Registered successful , Please Login Now", "bg-green-500")
    }
    else{
      props.showAlert("User Not created", "bg-red-500")
    }
   
  
  }
  const onChange = (e)=>{
    setCred({...cred, [e.target.name]: e.target.value})
  }
  
  return (

    <div className="grid md:grid-cols-2 my-16 gap-x-24">
    
      
      <div className="img mx-4 order-2">

      <img src={registerImg} alt="" className=''/>

      </div>

    <div className=' flex-col justify-center items-center mx-8 md:mx-20 order-1'>

        <Link to="/">  <button className='text-purple-500 mr-auto my-6 flex items-center'><AiOutlineArrowLeft className='mx-1'/> Home</button></Link>

        <h1 className='text-3xl font-extrabold '>Create a new account</h1>
        <h3 className='my-1'>Use your email to create a new account</h3>

        <input className='w-full border border-black my-3 py-2 px-3' onChange={onChange} name="fullName" value={cred.fullName} type="email" placeholder='Name *' />
        <input className='w-full border border-black my-3 py-2 px-3' onChange={onChange} name="email" value={cred.email} type="email" placeholder='Email ID *' />
        <input className='w-full border border-black my-3 py-2 px-3' onChange={onChange} name="password" value={cred.password} type="password" placeholder='Password *' />

        <button disabled={cred.password.length<3 || cred.fullName.length<2 || cred.email.length<5} className='w-full p-2 bg-purple-500 text-white font-bold my-3' onClick={handleClick}>Register Now</button>

        <h3> Have an account? <Link to="/login"> <span className='underline text-blue-500'>login</span></Link></h3>
    </div>
    </div>
  )
}

export default Register