import React from "react";

const ItemList = (props) => {
  return (
    <div className={"m-bot-50"}>
      <p className={"bold f-size-20"}>{props.list.chapter}</p>
      {props.list.data.map((value, index) => (
        <div key={index}>
          <p className={"bold f-size-11"}>{value.term}: </p>
          <p className={"f-size-11"}>{value.definition}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
