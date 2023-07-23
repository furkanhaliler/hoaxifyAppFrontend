import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = (props) => {
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const routeParams = useParams();

  const pathUsername = routeParams.username;
  let message = "You cannot edit here.";
  if (pathUsername === loggedInUsername) {
    message = "You can edit here.";
  }
  return <div>{message}</div>;
};

export default ProfileCard;
