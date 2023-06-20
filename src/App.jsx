import { useEffect, useState } from "react";
import axios from "axios";
import { Container, List } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { CommentCard } from "./components/CommentCard";
import { AddCommentForm } from "./components/AddCommentForm";
import { QUERY_KEYS } from "./consts";

axios.defaults.baseURL = QUERY_KEYS.BACKEND_URL;

function App() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get("/comments?limit=10");
      setComments(res.data.comments);
    };

    fetchComments();
  }, []);

  const addComment = async (comment) => {
    const res = await axios.post("/comments/add", comment);
    setComments((prev) => [...prev, res.data]);
  };

  const deleteComment = async (id) => {
    await axios.delete(`/comments/${id}`);
    const filtredComments = comments.filter((c) => c.id !== id);
    setComments(filtredComments);
  };

  return (
    <Container>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            user={comment.user}
            body={comment.body}
            id={comment.id}
            deleteComment={deleteComment}
          />
        ))}
      </List>
      <AddCommentForm addComment={addComment} />
      <ToastContainer />
    </Container>
  );
}

export default App;
