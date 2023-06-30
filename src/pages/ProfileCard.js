import React from "react";
import { withRouter } from "react-router-dom";
// import { Authentication } from "../shared/AuthenticationContext";
import { connect } from "react-redux";

const ProfileCard = (props) => {
  // return (
  //   <Authentication.Consumer>{ (value) => {
  const pathUsername = props.match.params.username;
  const loggedInUsername = props.username;
  let message = "You cannot edit here.";
  if (pathUsername === loggedInUsername) {
    message = "You can edit here.";
  }
  return <div>{message}</div>;
  //     }}
  //   </Authentication.Consumer>
  // );
};

const mapStateToProps = (store) => {
  return {
    username: store.username,
  };
};

export default connect(mapStateToProps)(withRouter(ProfileCard));
