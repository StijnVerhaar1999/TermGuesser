import React, { useState, useEffect } from "react";
import HomeButton from "../../Utilities/HomeButton";

import * as list from "../../Lists/ohrList";
import ItemList from "./ItemList";

const List = () => {
  const [renderList, setList] = useState();

  useEffect(() => {
    showList();
  }, []);

  const showList = async () => {
    const chapterList = list.ohrList;
    setList(
      chapterList.map((value, index) => (
        <ItemList key={index} list={value}></ItemList>
      ))
    );
  };

  return (
    <div className={"ohrList"}>
      <HomeButton />
      {renderList ? renderList : null}
    </div>
  );
};

export default List;
