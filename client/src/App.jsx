import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NewStudentPost from "./pages/NewStudentPost";
import NewTeacherPost from "./pages/NewTeacherPost";
import Navbar from "./components/Navbar";
import API from "./utils/API";

function App() {
  const [currentUser, setCurrentUser] = useState(false); //contains info on the current user
  const [studentsearch, setStudentSearch] = useState(false); //stores the list of matching student
  const [teachersearch, setTeacherSearch] = useState(false); //stores the list of matching teachers
  const BASE_URL = "http://www.you-tutor.com/"
  // const BASE_URL = "http://localhost:8080/";

  useEffect(() => {
    API.readSessions().then((res) => {
      // console.log(res.data);

      if (res.data.user) {
        setCurrentUser(res.data.user);

        // if the user has requested to learn a set of skills this api call finds a match for them and stores the results in the teachersearch.
        if (res.data.user.StudentSkills) {
          const studentSkillsArray = [];
          res.data.user.StudentSkills.forEach((element) => {
            studentSkillsArray.push(element.skill);
          });

          
          API.getTeacherMatch({ skills: studentSkillsArray.join(",") })
            .then((newUser) => {
              passTeachers(newUser.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // if the user has requested to tuor this api call matches their declared skills with a list of students and stores the results in the studentsearch.
        if (res.data.user.TeacherSkills) {
          const teacherSkillsArray = [];
          res.data.user.TeacherSkills.forEach((element) => {
            teacherSkillsArray.push(element.skill);
          });

          API.getStudentMatch({ skills: teacherSkillsArray.join(",") })
            .then((newUser) => {
              passStudents(newUser.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        setCurrentUser(false);
      }
    });
  }, []);

  // function to store results in the studentsearch
  const passStudents = (students) => {
    setStudentSearch(students);
  };
  // function to store results in the teachersearch
  const passTeachers = (teachers) => {
    setTeacherSearch(teachers);
  };

  const loginSubmitHandler = (userData) => {
    setCurrentUser(userData);
  };

  const logoutHandle = () => {
    setCurrentUser(false);
  };

  return (
    <Router>
      <div className="container is-fluid">
        <div className="notification">
          <Navbar currentUser={currentUser} logoutHandle={logoutHandle} />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/signup">
              <SignUp submitHandler={loginSubmitHandler} BASE_URL={BASE_URL} />
            </Route>

            <Route exact path="/profile">
              <Profile
                currentUser={currentUser}
                studentsearch={studentsearch}
                teachersearch={teachersearch}
                BASE_URL={BASE_URL}
              />
            </Route>

            <Route exact path="/login">
              <Login
                submitHandler={loginSubmitHandler}
                passStudents={passStudents}
                passTeachers={passTeachers}
              />
            </Route>

            <Route exact path="/newpost">
              <NewStudentPost
                currentUser={currentUser}
                submitHandler={loginSubmitHandler}
                passTeachers={passTeachers}
              />
            </Route>

            <Route exact path="/newTeacherPost">
              <NewTeacherPost
                currentUser={currentUser}
                submitHandler={loginSubmitHandler}
                passStudents={passStudents}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
