import "./Profile.css";

import { uploads } from "../../utils/config";

// components
import LoadingAndError from "../../components/LoadingAndError";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  getUserPhotos,
  resetMessage,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // Edit states
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editId, setEditId] = useState("");

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    console.log(id);
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  // handles file uploaded from user
  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  // Reset component message
  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponentMessage();
  };

  // Delete photo
  const handleDelete = (photoId) => {
    dispatch(deletePhoto(photoId));
    resetComponentMessage();
  };

  // Show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  };

  // Update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = { title: editTitle, id: editId };

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };

  // Cancel photo edition
  const handleCancelEdit = () => {
    hideOrShowForms();
  };

  // Edit a photo
  const handleEditPhoto = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditImage(photo.image);
    setEditTitle(photo.title);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {userAuth && id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Share something cool:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Photo Title:</span>
                <input
                  type="text"
                  placeholder="Insert a title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Image:</span>
                <input type="file" onChange={handleFile} />
              </label>
              <LoadingAndError
                loading={loadingPhoto}
                error={errorPhoto}
                type={"Post"}
              />
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editing:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Insert new title"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />
              <input type="submit" value="Update" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            </form>
          </div>
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>Published Photos</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {userAuth && id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEditPhoto(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Look
                  </Link>
                )}
                {photos.length === 0 && <p>No published photos found.</p>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
