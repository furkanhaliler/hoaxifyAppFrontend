import React from "react";
import ProfileCard from "./ProfileCard";

const UserPage = (props) => {
  const { username } = props;
  return (
    <div className="container">
      <ProfileCard username={username}></ProfileCard>
    </div>
  );
};

export default UserPage;
