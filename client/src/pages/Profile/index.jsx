import React, { useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import "./style.css";
import { Link } from "react-router-dom";
// import StarRatingComponent from "react-star-rating-component";
export default function Profile(props) {
  //   const SearchResultArr = [];
  const User = props.currentUser;
  const BASE_URL = props.BASE_URL;
  console.log(props);

  const [dropdown, setDropdown] = useState({
    dropTeacher: "dropdown",
    dropStudent: "dropdown"
  });

  const dropClick = (event) => {
    event.stopPropagation();
    setDropdown({
      dropTeacher: "dropdown is-active",
    });
  };
  const dropClick2 = (event) => {
    event.stopPropagation();
    setDropdown({
      dropStudent: "dropdown is-active",
    });
  };
  const dropClickOff = (event) => {
    event.stopPropagation();
    setDropdown({
      dropTeacher: "dropdown",
      dropStudent: "dropdown"
    });
  };

  return (
    <div className="ProfilePage center-element" onClick={dropClickOff}>
      {/* FIRST ROW */}
      <div className="columns ">
        <div className="column is-4">
          <ProfileCard
            userdata={User}
            studentsearch={props.studentsearch}
            teachersearch={props.teachersearch}
            BASE_URL={props.BASE_URL}
          />
        </div>

        <div className="column is-4">
          {/* Iif the user has created a Teacher post it will be visible here */}
          <button className="button is-link is-outlined tutor-button">
            <Link to="/newTeacherPost">LOOK FOR A STUDENT</Link>
          </button>

          {User.Teacher ? (
            <div className="box teacher-box">
              <article className="media">
                <div className="media-content">
                  <div className="content center-element">
                    <br />
                    <div>
                      <p className="title is-4 ">Your Teacher Post</p>
                      <p className="title is-6 left-element">
                        ABOUT:{" "}
                        <span className="is-4">{User.Teacher.about}</span>
                      </p>
                      {/*  */}
                      <div className={dropdown.dropTeacher}>
                        <div className="dropdown-trigger">
                          <button
                            className="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                            onClick={dropClick}
                          >
                            <span>Your Teaching Skills</span>
                            <span className="icon is-small">
                              <i
                                className="fas fa-angle-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </button>
                        </div>
                        <div
                          className="dropdown-menu"
                          id="dropdown-menu"
                          role="menu"
                        >
                          <div className="dropdown-content">
                            {User.TeacherSkills.map((element) => (
                              <div className="dropdown-item" value={element.skill} key={element.skill}>
                                {element.skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="column is-4">
          {/* If the usere has created a Student post it will be visible here */}
          <button className="button is-danger is-outlined tutor-button">
            <Link to="/newpost">LOOK FOR TEACHER</Link>
          </button>
          {User.Studentpost ? (
            <div className="box student-post">
              <article className="media">
                <div className="media-content">
                  <div className="content center-element">
                    <br />
                    <div>
                      <p className="title is-4 ">What you are Learning</p>
                      <p className="title is-6 left-element">
                        ABOUT:{" "}
                        <span className="is-4">{User.Studentpost.about}</span>
                      </p>
                      <div className={dropdown.dropStudent}>
                        <div className="dropdown-trigger">
                          <button
                            className="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                            onClick={dropClick2}
                          >
                            <span>Your Teaching Skills</span>
                            <span className="icon is-small">
                              <i
                                className="fas fa-angle-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </button>
                        </div>
                        <div
                          className="dropdown-menu"
                          id="dropdown-menu"
                          role="menu"
                        >
                          <div className="dropdown-content">
                            {User.StudentSkills.map((element) => (
                              <div className="dropdown-item" value={element.skill} key={element.skill}>
                                {element.skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* <div className="select is-multiple">
                        <select multiple size="4">
                          {User.StudentSkills.map((element) => (
                            <option value={element.skill} key={element.skill}>
                              {" "}
                              {element.skill}
                            </option>
                          ))}
                        </select>
                      </div> */}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* SECOND ROW ////////////////////////////////////////////// */}
      <div className="columns ">
        {/* If there are any stundents matches, they are listed here */}
        <div className="column is-5">
          <ul className="center-element">
            {props.studentsearch
              ? props.studentsearch.map((userInfo) => (
                  <li key={userInfo.studentResults[0].User.id}>
                    <div className="box studentbox">
                      <article className="media">
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <img
                              src={
                                userInfo.studentResults
                                  ? BASE_URL +
                                    userInfo.studentResults[0].User.picture
                                  : "https://bulma.io/images/placeholders/128x128.png"
                              }
                              alt="user"
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong>
                                {userInfo.studentResults
                                  ? userInfo.studentResults[0].User.first_name +
                                    " " +
                                    userInfo.studentResults[0].User.last_name
                                  : ""}
                              </strong>{" "}
                              <small>
                                {" "}
                                asks for help on {userInfo.postDate}
                              </small>
                              <br />
                              <strong>
                                This student is looking for a tutor.{" "}
                              </strong>
                              You have{" "}
                              <strong>
                                {Math.floor(userInfo.percentage)}%
                              </strong>{" "}
                              of the skills he is looking for.
                              <br />
                              you can connect him by Email:
                              <br />{" "}
                              {userInfo.studentResults
                                ? userInfo.studentResults[0].User.email
                                : ""}
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <div className="palceholder"></div>

        <div className="column is-2"></div>

        {/* If there are any techers matches, they are rendered here */}
        <div className="column is-5">
          <ul>
            {props.teachersearch
              ? props.teachersearch.map((userInfo) => (
                  <li key={userInfo.teacherResults[0].User.id}>
                    <div className="box teacherbox">
                      <article className="media">
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <img
                              src={
                                userInfo.teacherResults
                                  ? BASE_URL +
                                    userInfo.teacherResults[0].User.picture
                                  : "https://bulma.io/images/placeholders/128x128.png"
                              }
                              alt={userInfo.teacherResults[0].User.picture}
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong>
                                {userInfo.teacherResults
                                  ? userInfo.teacherResults[0].User.first_name +
                                    " " +
                                    userInfo.teacherResults[0].User.last_name
                                  : ""}
                              </strong>{" "}
                              <small>can help you!</small>
                              <br />
                              {
                                userInfo.teacherResults[0].User.first_name
                              } has{" "}
                              <strong>
                                {Math.floor(userInfo.percentage)}%
                              </strong>{" "}
                              of the skill you are looking for!
                              <br />
                              you can connect with{" "}
                              {userInfo.teacherResults[0].User.first_name} by
                              Email:
                              <br />{" "}
                              {userInfo.teacherResults
                                ? userInfo.teacherResults[0].User.email
                                : ""}
                            </p>
                          </div>
                          {/* <nav className="level is-mobile">
                            <div className="level-left">
                              <a className="level-item" aria-label="reply">
                                <span className="icon is-small">
                                  <i
                                    className="fas fa-reply"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </a>
                              <a className="level-item" aria-label="retweet">
                                <span className="icon is-small">
                                  <i
                                    className="fas fa-retweet"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </a>
                              <a className="level-item" aria-label="like">
                                <span className="icon is-small">
                                  <i
                                    className="fas fa-heart"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </a>
                            </div>
                          </nav> */}
                        </div>
                      </article>
                    </div>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}
