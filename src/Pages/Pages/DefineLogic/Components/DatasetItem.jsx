import React, { useRef, useState } from "react";

const DatasetItem = ({ item }) => {
  return (
    <div className="dataset-item">
      <div className="header">
        <p className="title">{item?.tableName}</p>
      </div>
      <div className="container">
        <ul>
          {item?.columns?.map((columnItem) => {
            return (
              <li key={columnItem?.columnName}>{columnItem?.columnName}</li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DatasetItem;
