import React,{useEffect} from 'react'
import ProfileCard from "../../components/ProfileCard"
import "./style.css"
import API from "../../utils/API"
import { Link } from "react-router-dom";
import TeacherCard from '../../components/TeacherCard';




export default function Profile(props) {


  console.log(props);
  
    
    const User = props.currentUser;
    // const teacherAdd = props.currentUser.Teachers
    return (


        <div className = "ProfilePage">

            <ProfileCard userdata= {User}/>
            {/* <TeacherCard teacherdata= {teacherAdd}/> */}
            
            <button className="button is-link is-outlined"><Link to ='/newTeacherPost'>This is where Teachers go to create an add and Look For Students</Link></button>

            <button className="button is-danger is-outlined"><Link to ='/newpost'>This is where students go if they need a Teacher</Link></button>
            

        </div>
           
    )
}
