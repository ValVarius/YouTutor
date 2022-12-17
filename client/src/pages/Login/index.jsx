import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import "./style.css"

export default function Login(props) {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const [incorrect, setIncorrect] = useState("");
  const [notfound, setNotfound] = useState("");
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(loginState);

    API.login(loginState).then((res) => {

      if (res.data === "WRONG PASSWORD") {
        setIncorrect("Incorrect Password");
        setNotfound("");
      } else if (res.data === "WRONG USERNAME") {
        setNotfound("User Not Found");
        setIncorrect("");
      } else if (res.data.id) {
        setIncorrect("");
        setNotfound("");
        props.submitHandler(res.data);
        
        if (res.data.TeacherSkills) {
          console.log("THIS IS WHAT YOU GET FROM THE API: ", res);
          const teacherSkillsArray = [];
          res.data.TeacherSkills.forEach((element) => {
            teacherSkillsArray.push(element.skill);
          });

          API.getStudentMatch({ skills: teacherSkillsArray.join(",") })
            .then((newUser) => {
              props.passStudents(newUser.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (res.data.StudentSkills) {
          const studentSkillsArray = [];
          res.data.StudentSkills.forEach((element) => {
            studentSkillsArray.push(element.skill);
          });

          API.getTeacherMatch({ skills: studentSkillsArray.join(",") })
            .then((newUser) => {
              props.passTeachers(newUser.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        history.push("/profile");
      }

     
      
      // if (res.data.id) {
        
      // } else {
      //   props.submitHandler(false);
      //   history.push("/login");
      // }
    });
  };

  // const handleSessionBtnClick = (event) => {
  //   event.preventDefault();
  //   API.readSessions().then((res) => {
  //     console.log(res.data);
  //   });
  // };

  return (
    <div className="UserForm">
      <label className="label is-large">Credentials:</label>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="email"
            name="email"
            onChange={handleInputChange}
            value={loginState.email}
          />
        </div>
        <div className="warning">{notfound}</div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            className="input"
            placeholder="password"
            name="password"
            onChange={handleInputChange}
            value={loginState.password}
          />
        </div>
        <div className="warning">{incorrect}</div>
      </div>
      <br />
      <div className="buttons is-centered">
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={handleFormSubmit}>
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light">
              <Link to="/">Cancel</Link>
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
