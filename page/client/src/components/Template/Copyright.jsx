import React from "react";
import { Typography, Link } from "@material-ui/core/";

const Copyright = () => {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://auth-practice-5202.herokuapp.com/login">
          PaperHands
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <br />
    </div>
  );
};

export default Copyright;
