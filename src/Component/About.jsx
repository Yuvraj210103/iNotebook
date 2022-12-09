import React,{useEffect} from 'react'
import { Link,} from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const About = (props) => {
  useEffect(() => {
    props.showNotes(false);
  }, []);
  
  return (
    <div className='mx-8 h-screen justify-center items-center my-12'>
      <Link to="/">  <button className='text-purple-500 text-xl mr-auto my-6 flex items-center'><AiOutlineArrowLeft className='mx-1'/> Home</button></Link>

      <h1 className='text-4xl md:text-7xl font-extrabold'><span className='text-purple-700'>i</span>Notebook</h1>
            <p className='text-2xl md:text-3xl font-bold my-3'>Your notebook on-cloud safe and secure</p>
            <p className='my-3 font-bold'>An online web platform where you can create, edit, update, delete your notes/information privately and securely without any disturbance.</p>
    </div>
  )
}

export default About