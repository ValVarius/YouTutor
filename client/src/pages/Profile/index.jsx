import React from "react";
import ProfileCard from "../../components/ProfileCard";
import "./style.css";
import { Link } from "react-router-dom";
// import StarRatingComponent from "react-star-rating-component";
export default function Profile(props) {
//   const SearchResultArr = [];
  const User = props.currentUser;


  // console.log(User);
  console.log(props);

  //   const updateTutorRating = (nextValue, prevValue, name) => {
  //     const dataToSupplyIntoAPI = {
  //       rating: nextValue,
  //     };
  //   };

  //   const getTutors = () => {
  //     return [{ id: 3, name: "Sveta", rating: 3 }];
  //   };

  //   const tutors = getTutors();
  //   const tutorCards = [];

  // for (let i = 0; i < tutors.length; i++) {
  //     const tutor = tutors[i];
  //     tutorCards.push(
  //         <div>
  //             {tutor.name} : <StarRatingComponent name={tutor.id} value={tutor.rating} onStarClick={
  //                 (nextValue, prevValue, name) => updateTutorRating(nextValue, prevValue, name)
  //             } />
  //         </div>
  //     );
  // }

  return (
    <div className="ProfilePage center-element">
      <div className="columns ">
        <div className="column is-2">
          <ProfileCard
            userdata={User}
            studentsearch={props.studentsearch}
            teachersearch={props.teachersearch}
            BASE_URL={props.BASE_URL}
          />
        </div>

        <div className="column is-4 center-element">
          <button className="button is-link is-outlined tutor-button">
            <Link to="/newTeacherPost">LOOK FOR A STUDENT</Link>
          </button>

          {/* If there are any stundents matches, they are listed here */}
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
                                  ? userInfo.studentResults[0].User.picture
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
          <div className="palceholder"></div>
        </div>

        <div className="column is-4">
          <button className="button is-danger is-outlined tutor-button">
            <Link to="/newpost">LOOK FOR TEACHER</Link>
          </button>

          {/* If there are any techers matches, they are rendered here */}
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
                                  ? userInfo.teacherResults[0].User.picture
                                  : "https://bulma.io/images/placeholders/128x128.png"
                              }
                              alt="teacher"
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
                              <small>
                                can help you!
                              </small>
                              <br />
                              {userInfo.teacherResults[0].User.first_name} has{" "}
                              <strong>
                                {Math.floor(userInfo.percentage)}%
                              </strong>{" "}
                              of the skill you are looking for!
                              <br />
                              you can connect with {userInfo.teacherResults[0].User.first_name} by Email:
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
        <div className="column is-2">
            {/* Iif the user has created a Teacher post it will be visible here */}
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
                      <p className="title is-6 left-element">SKILLS:</p>
                      <div className="select is-multiple">
                        <select multiple size="4">
                          {User.TeacherSkills.map((element) => (
                            <option value={element.skill} key={element.skill}>
                              {" "}
                              {element.skill}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* <nav className="level is-mobile">
                    <div className="level-left">
                      <a className="level-item" aria-label="reply">
                        <span className="icon is-small">
                          <i className="fas fa-reply" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a className="level-item" aria-label="retweet">
                        <span className="icon is-small">
                          <i className="fas fa-retweet" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a className="level-item" aria-label="like">
                        <span className="icon is-small">
                          <i className="fas fa-heart" aria-hidden="true"></i>
                        </span>
                      </a>
                    </div>
                  </nav> */}
                </div>
              </article>
            </div>
          ) : (
            ""
          )}


          {/* If the usere has created a Student post it will be visible here */}
          {User.Studentpost ? (
            <div className="box student-post">
              <article className="media">
                <div className="media-content">
                  <div className="content center-element">
                    <br />
                    <div>
                      <p className="title is-4 ">Your Student Post</p>
                      <p className="title is-6 left-element">
                        ABOUT:{" "}
                        <span className="is-4">
                          {User.Studentpost.about}
                        </span>
                      </p>
                      <p className="title is-6 left-element">SKILLS:</p>
                      <div className="select is-multiple">
                        <select multiple size="4">
                          {User.StudentSkills.map((element) => (
                            <option value={element.skill} key={element.skill}>
                              {" "}
                              {element.skill}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* <nav className="level is-mobile">
                    <div className="level-left">
                      <a className="level-item" aria-label="reply">
                        <span className="icon is-small">
                          <i className="fas fa-reply" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a className="level-item" aria-label="retweet">
                        <span className="icon is-small">
                          <i className="fas fa-retweet" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a className="level-item" aria-label="like">
                        <span className="icon is-small">
                          <i className="fas fa-heart" aria-hidden="true"></i>
                        </span>
                      </a>
                    </div>
                  </nav> */}
                </div>
              </article>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
