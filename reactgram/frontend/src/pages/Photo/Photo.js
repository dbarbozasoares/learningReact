import "./Photo.css";

import { uploads } from "../../utils/config";

// components
import LoadingAndError from "../../components/LoadingAndError";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";
import Message from "../../components/Message";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, likePhoto, commentPhoto } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  // Comments
  const [commentText, setCommentText] = useState("");

  // Photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // Update Liked photo from current user
  const handleLike = () => {
    dispatch(likePhoto(photo._id));

    resetMessage();
  };

  // add comment from current user
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(commentPhoto(commentData));

    setCommentText("");

    resetMessage();
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comments: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
              <input type="submit" value="Send" />
            </form>
            {photo.comments.length === 0 && <p>No comments yet...</p>}
            {photo.comments.map((comment) => {
              return (
                <div className="comment" key={comment.comment}>
                  <div className="author">
                    {comment.userImage && (
                      <img
                        src={`${uploads}/users/${comment.userImage}`}
                        alt={comment.userName}
                      />
                    )}
                    <Link to={`/users/${comment.userId}`}>
                      <p>{comment.userName}</p>
                    </Link>
                  </div>
                  <p>{comment.comment} </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
