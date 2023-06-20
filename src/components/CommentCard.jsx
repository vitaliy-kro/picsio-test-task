import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import { DeleteSharp } from "@mui/icons-material";
import { stringAvatar } from "../helpers/stringAvatar";
import { toastError, toastSuccess } from "../helpers/notifications";

export const CommentCard = ({ user, body, id, deleteComment }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={async () => {
              try {
                await deleteComment(id);
                toastSuccess("Comment deleted successfully");
              } catch (e) {
                toastError("Something get wrong, try again!");
              }
            }}
          >
            <DeleteSharp />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar
            alt={`${user.username} avatar`}
            {...stringAvatar(user.username)}
          />
        </ListItemAvatar>
        <ListItemText
          primary={user.username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {body}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
