import React from "react";
import { withRouter } from "react-router-dom";
import { Authentication } from "../shared/AuthenticationContext";

const ProfileCard = (props) => {
  return (
    <Authentication.Consumer>
      {(value) => {
        const pathUsername = props.match.params.username;
        const loggedInUsername = value.state.username;
        let message = "You cannot edit here.";
        if (pathUsername === loggedInUsername) {
          message = "You can edit here.";
        }
        return <div>{message}</div>;
      }}
    </Authentication.Consumer>
  );
};

export default withRouter(ProfileCard);
