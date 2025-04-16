import "./Photo.css";

import { uploads } from "../../utils/config";

// components
import LoadingAndError from "../../components/LoadingAndError";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto, likePhoto } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  // Comments

  // Photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // Like and comment
  const handleLike = () => {
    dispatch(likePhoto(photo._id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
    </div>
  );
};

export default Photo;
