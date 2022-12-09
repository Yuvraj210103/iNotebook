import React,{useEffect} from 'react'
import homeSvg from './Assets/home2.svg'
import { Link } from "react-router-dom";

export const Home = (props) => {
  useEffect(() => {
    props.showNotes(true);
  }, []);
  
  return (
    <div className='max-w-[1000px] items-center h-screen mx-8 md:mx-12'>
        <div className='container grid md:grid-cols-2 '>
            <div className="text  mt-12 order-2 md:order-1">

            <h1 className='text-4xl md:text-7xl font-extrabold'><span className='text-purple-700'>i</span>Notebook</h1>
            <p className='text-2xl md:text-3xl font-bold my-3'>Your notebook on-cloud safe and secure</p>
            <p className='my-3 font-bold'>An online web platform where you can create, edit, update, delete your notes/information privately and securely without any disturbance. For more info you can checkout our <Link to="/about"> <span className='underline text-blue-500 cursor-pointer'>About Page</span> </Link></p>
            <Link to="/newnote"><button className='mx-auto bg-purple-600 text-white px-3 py-2 my-3 font-bold hover:scale-95'>Create New Note</button></Link>
            </div>
            <div className="img mt-12 order-1 md:order-2">
                <img src={homeSvg} alt="Home" className='md:ml-24'/>
              
            </div>
            
        </div>
    </div>
  )
}
