import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";

import { useHistory } from "react-router-dom";

const Home = () => {
  let history = useHistory();

  const goToScreen = (event) => {
    let target = event.target;
    let screen = target.id;
    history.push(`/${screen}`);
  };

  return (
    <div className={"center m-top-50"}>
      <p className={"bold home"}>Select an option</p>
      <div className="card-list">
        <Card className="card" onClick={goToScreen}>
          <CardContent id="guess" className="card-content">
            Guess the term/descriptions
          </CardContent>
        </Card>

        <Card className="card" onClick={goToScreen}>
          <CardContent id="list" className="card-content">
            List of all the terms with their description
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
