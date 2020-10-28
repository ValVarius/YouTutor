import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import { Link } from "react-router-dom";
// import ImageUpload from '../../components/ImageWidget';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

export default function SignUp(props) {
  const getPicture = (event) => {
    let Picture = event.target.files[0];
    console.log(Picture);
    // let PictureUrl = URL.createObjectURL(event.target.files[0]);
    const data = new FormData();
    data.append("image", Picture, Picture.name);

    API.storeImg(data).then((res) => {
      let url = res.data.imageUrl;
      console.log("back from server", res.data.imageUrl);
      console.log(url);
      setUserState({
        ...userState,
        picture: res.data.imageUrl,
      });
    });
  };

  const [userState, setUserState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    picture: "",
  });
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(userState);

    API.createUser(userState).then((res) => {
      console.log(res.data);

      if (res.data) {
        props.submitHandler(res.data);
        setUserState({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          picture: "",
        });
        history.push("/profile");
      } else {
        props.submitHandler(false);

        history.push("/signup");
      }
    });
  };

  return (
    <form className="UserForm ">
      <label className="label is-large">Sign Up:</label>
      <div className="field">
        <label className="label">First Name</label>
        <div className="control">
          <input
            className="input is-rounded"
            type="text"
            onChange={handleInputChange}
            name="first_name"
            value={userState.first_name || ""}
            placeholder="John"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Last Name</label>
        <div className="control">
          <input
            className="input is-rounded"
            type="text"
            onChange={handleInputChange}
            name="last_name"
            value={userState.last_name || ""}
            placeholder="Smith"
          />
        </div>
      </div>

      {/* <div className="field">
  <label className="label">UserName</label>
  <div className="control">
    <input className="input" type="text" onChange={handleInputChange} name="username" value={userState.username} placeholder="Create a Username"/>
  </div>
</div> */}

      {/* <div className="field">
  <label className="label">ZipCode</label>
  <div className="control">
    <input className="input" type="text" onChange={handleInputChange} name="zipcode" value={userState.zipcode} placeholder="98101"/>
  </div>
</div> */}

      <div className="field">
        <label className="label">Email</label>
        <p className="control has-icons-left">
          <input
            className="input is-rounded"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            name="email"
            value={userState.email || ""}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <p className="control has-icons-left">
          <input
            type="password"
            className="input is-rounded"
            onChange={handleInputChange}
            name="password"
            value={userState.password || ""}
            placeholder="Password"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>

      {/* <ImageUpload getPicture= {getPicture}/> */}
      <br />

      <div class="file has-name is-warning is-centered">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="profile"
            onChange={getPicture}
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">Choose a Profile Picture</span>
            <span class="file-name">{userState.picture}</span>
          </span>
        </label>
      </div>

      <br />

      <div className="card-image" id="previewImg">
        <figure className="image is-4by5">
          <img
            src={props.BASE_URL + userState.picture}
            alt={userState.picture}
          />
        </figure>
      </div>

      <br />
      <div className="buttons is-centered">
        <div className="field is-grouped ">
          <div className="control">
            <button className="button is-link" onClick={handleFormSubmit}>
              {/* <Link to ='/profile'>Submit</Link> */} Submit
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
    </form>
  );
}
