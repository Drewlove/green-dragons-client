import React from "react";
import ShimmerItem from "./ShimmerItem";

const ShimmerList = (props) => {
  const renderListItems = () => {
    let rows = [];
    for (let i = 0; i < props.listLength; i++) {
      rows.push(
        <li className="list-main-item" key={i}>
          <ShimmerItem />
        </li>
      );
    }
    return rows;
  };

  return <ul className="list-main-wrapper">{renderListItems()}</ul>;
};

export default ShimmerList;
