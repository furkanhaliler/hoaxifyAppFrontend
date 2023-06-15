import React from "react";
import { withRouter } from "react-router-dom";

const ProfileCard = (props) => {
  const pathUsername = props.match.params.username;
  const loggedInUsername = props.username;
  let message = "You cannot edit here.";
  if (pathUsername === loggedInUsername) {
    message = "You can edit here.";
  }
  return <div>{message}</div>;
};

export default withRouter(ProfileCard);
