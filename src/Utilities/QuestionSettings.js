import React, { useState, useEffect } from "react";

import * as list from "../Lists/ohrList";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";

const QuestionSettings = (props) => {
  const [step, setStep] = useState(1);
  const [questionMode, setQuestionMode] = useState("");

  const [amountValue, setAmountValue] = useState("medium");
  const [customAmountValue, setCustomAmountValue] = useState(10);

  const [chapters, setChapters] = useState({});

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return askMode();
      case 2:
        return askChapters();
      case 3:
        return askAmount();
      default:
        return null;
    }
  };

  useEffect(() => {
    if (Object.keys(chapters).length) return;

    const setDefaultCheckedChapters = () => {
      const chapterList = list.ohrList;
      const newChapters = chapters;

      chapterList.forEach((element) => (newChapters[element.value] = true));
      setChapters(newChapters);
    };

    setDefaultCheckedChapters();
  }, [chapters]);

  const incrementStep = () => setStep(step + 1);

  const handleRadioChange = (event) => {
    setAmountValue(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setCustomAmountValue(newValue);
  };

  const getChapterLenght = () => {
    let x;
    const chapterList = list.ohrList;
    let data = [];
    let allChapters = getSelectedChapters();

    allChapters.forEach((element) => {
      chapterList.forEach((value) => {
        if (value.value === element) {
          for (x = 0; x < value.data.length; x++) {
            data.push(value.data[x]);
          }
        }
      });
    });
    return data.length;
  };

  const chapterSelectChangeHandler = (event) => {
    const newChapters = chapters;
    newChapters[event.target.name] = !newChapters[event.target.name];
    setChapters({ ...newChapters });
  };

  const getSelectedChapters = () => {
    return Object.keys(chapters).filter((key) => chapters[key]);
  };

  const selectQuestionMode = (mode) => {
    setQuestionMode(mode);
    incrementStep();
  };

  const setQuestions = () => {
    let amount;

    if (amountValue === "medium") {
      amount = "25";
      console.log(getChapterLenght());
      if (amount > getChapterLenght()) {
        amount = getChapterLenght();
      }
    } else if (amountValue === "large") {
      amount = "50";
      if (amount > getChapterLenght()) {
        amount = getChapterLenght();
      }
    } else if (amountValue === "max") {
      amount = getChapterLenght();
    } else {
      amount = customAmountValue;
    }

    let settings = [
      {
        mode: questionMode,
        chapters: getSelectedChapters(),
        amount: amount,
      },
    ];

    props.setQuestionSettings(settings);
  };

  const renderAllChapters = () => {
    let content;
    const chapterList = list.ohrList;

    content = chapterList.map((value, index) => (
      <FormControlLabel
        key={index}
        checked={chapters[value.value]}
        onChange={chapterSelectChangeHandler}
        name={value.value}
        control={<Checkbox color="primary" />}
        label={value.chapter + ` (amount: ${value.data.length})`}
      />
    ));
    return content;
  };

  const askMode = () => (
    <div className={"center m-top-50"}>
      <p className={"bold"}>Do you want to learn the terms or descriptions?</p>
      <div className={"card-list"}>
        <Card className={"card"} onClick={() => selectQuestionMode("terms")}>
          <CardContent className={"card-content"}>
            I want to learn the terms
          </CardContent>
        </Card>
        <Card
          className={"card"}
          onClick={() => selectQuestionMode("descriptions")}
        >
          <CardContent className={"card-content"}>
            I want to learn the descriptions
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const askChapters = () => (
    <div className={"center m-top-50"}>
      <p className={"bold f-size-20"}>Which chapters would you like to test?</p>
      <div className={"chapter-group"}>
        <FormControl>{renderAllChapters()}</FormControl>
      </div>
      <div className={"chapter-button"}>
        <Button variant="contained" color="primary" onClick={incrementStep}>
          Submit
        </Button>
      </div>
    </div>
  );

  const askAmount = () => (
    <div className={"center m-top-50"}>
      <p className={"bold"}>
        How many questions do you want? (max: {getChapterLenght()})
      </p>
      <div className={"amount-group"}>
        <FormControl>
          <RadioGroup value={amountValue} onChange={handleRadioChange}>
            <FormControlLabel value="medium" label="25" control={<Radio />} />
            <FormControlLabel value="large" label="50" control={<Radio />} />
            <FormControlLabel value="max" label="Max" control={<Radio />} />
            <FormControlLabel
              value="custom"
              label="Custom"
              control={<Radio />}
            />
          </RadioGroup>
          {amountValue === "custom" ? (
            <div className={"slider"}>
              <Slider
                defaultValue={10}
                onChange={handleSliderChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={getChapterLenght()}
              />
            </div>
          ) : null}
        </FormControl>
      </div>
      <div className={"amount-button"}>
        <Button variant="contained" color="primary" onClick={setQuestions}>
          Submit
        </Button>
      </div>
    </div>
  );

  return <div>{renderQuestion()}</div>;
};

export default QuestionSettings;
