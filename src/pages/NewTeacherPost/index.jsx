import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import FilterSkills from "../../components/Filter";

export default function NewTeacherPost(props) {
  console.log(props);

  const [userState, setUserState] = useState({
    skills: ["None"],
    about: "",
    YearsofExperience: "",
  });

  const history = useHistory();

  const loginState = {
    email: props.currentUser.email,
  };

  const handleInputChange = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const getSkills = (chosen) => {
    // console.log(chosen);
    let chosenskills = chosen;
    setUserState({
      skills: chosenskills,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("inside the handleformsubmit");
    console.log(userState);

    API.deleteTeacherCurrentPost(props.currentUser)
      .then((result) => {
        console.log("PreviousPostDeleted: " + result);
        API.createTeacherPost(userState)
          .then((newUser) => {
            console.log(newUser);
            setUserState({
              about: "",
              YearsofExperience: "",
            });
            API.deleteTeacherSkills()
              .then((result) => {
                console.log("Skills deleted from current User: ", result);

                API.saveTeacherSkills(userState.skills)
                  .then((result) => {
                    console.log("Skills saved to current User: ", result);
                    API.login(loginState).then((res) => {
                      console.log(res.data);
                      props.submitHandler(res.data);

                      API.getStudentMatch({
                        skills: userState.skills.join(","),
                      })
                        .then((newUser) => {
                          console.log(
                            "MATCH RESULT STUDENT SKILLS FOR STUDENTS: ",
                            newUser.data
                          );
                          props.passStudents(newUser.data);
                          history.push("/profile");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="UserForm">
        <label className="label is-large">Post your Add as a Teacher:</label>
        <FilterSkills getSkills={getSkills} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="field">
          <label className="label">About</label>
          <div className="control">
            <input
              className="input"
              type="text"
              onChange={handleInputChange}
              name="about"
              value={userState.about || ""}
              placeholder="About"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">YearsofExperience</label>
          <div className="control">
            <input
              className="input"
              type="text"
              onChange={handleInputChange}
              name="YearsofExperience"
              value={userState.YearsofExperience || ""}
              placeholder="YearsofExperience"
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={handleFormSubmit}>
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light">
              <Link to="/profile">Cancel</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
