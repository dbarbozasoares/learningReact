/* eslint-disable no-unused-vars */
import { uploads } from "../../utils/config";
import "./EditProfile.css";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setImageProfile] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // handles file uploaded from user
  const handleFile = (e) => {
    const image = e.target.files[0];

    // update preview image
    setPreviewImage(image);

    // update profile image
    setImageProfile(image);
  };
  return (
    <div id="edit-profile">
      <h2>Edit your profile</h2>
      <p className="subtitle">
        Add a profile pic and tell more about yourself...
      </p>
      {/* Image preview */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Current name"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Profile Image:</span>
          <input type="file" />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Profile description"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          <span>Change password</span>
          <input
            type="password"
            placeholder="Input your new password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default EditProfile;
