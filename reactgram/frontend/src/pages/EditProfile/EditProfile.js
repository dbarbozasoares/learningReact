import "./EditProfile.css";
import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import LoadingAndError from "../../components/LoadingAndError";
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill form with user data
  useEffect(() => {
    console.log(user);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
      console.log(user);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather user data from states
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // handles file uploaded from user
  const handleFile = (e) => {
    const image = e.target.files[0];

    // update preview image
    setPreviewImage(image);

    // update profile image
    setProfileImage(image);
  };
  return (
    <div id="edit-profile" autoComplete="off">
      <h2>Edit your profile</h2>
      <p className="subtitle">
        Add a profile pic and tell more about yourself...
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Anti-autofill hidden fields */}
        <input type="text" name="fake-username" style={{ display: "none" }} />
        <input
          type="password"
          name="fake-password"
          style={{ display: "none" }}
        />

        <input
          type="text"
          name="display-name"
          placeholder="Current name"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          name="user-email"
          autoComplete="off"
          placeholder="E-mail"
          disabled
          value={email || ""}
        />
        <label>
          <span>Profile Image:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <input
          type="text"
          name="not-a-bio"
          autoComplete="new-password"
          placeholder="Profile description"
          onChange={(e) => setBio(e.target.value)}
          value={bio || ""}
        />
        <label>
          <span>Change password</span>
          <input
            type="password"
            name="not-password"
            autoComplete="new-password"
            placeholder="Input your new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        <LoadingAndError loading={loading} error={error} type={"Update"} />
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
