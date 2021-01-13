import React from "react";
import { useHistory } from "react-router-dom";

import Fab from "@material-ui/core/Fab";

import Home from "@material-ui/icons/Home";

const HomeButton = () => {
  let history = useHistory();

  return (
    <div className={"home-button"}>
      <Fab color="primary" aria-label="back" onClick={() => history.push("/")}>
        <Home />
      </Fab>
    </div>
  );
};

export default HomeButton;
