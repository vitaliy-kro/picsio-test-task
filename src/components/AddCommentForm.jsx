import { useState, useEffect } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import { LOCALSTORAGE_KEYS } from "../consts";
import { toastError, toastSuccess } from "../helpers/notifications";

export const AddCommentForm = ({ addComment }) => {
  const [comment, setComment] = useState(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.COMMENT_KEY)) || ""
  );
  useEffect(() => {
    localStorage.setItem(
      LOCALSTORAGE_KEYS.COMMENT_KEY,
      JSON.stringify(comment)
    );
  }, [comment]);

  const generateId = () => {
    return Math.floor(Math.random() * 101);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!comment.trim()) {
        return toastError("Write something!");
      }
      await addComment({
        body: comment,
        postId: generateId(),
        userId: generateId(),
      });
      setComment("");
      toastSuccess("Comment added successfuly!");
    } catch (e) {
      toastError("Something get wrong, try again!");
    }
  };

  return (
    <>
      <TextareaAutosize
        minRows={5}
        placeholder="Write your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" onClick={handleSubmit} variant="contained">
        Send
      </Button>
    </>
  );
};
