import React from "react";
import { Typography, Link } from "@material-ui/core/";

const Copyright = () => {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/OktarianTB">
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
