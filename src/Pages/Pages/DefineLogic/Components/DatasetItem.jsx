import React, { useRef, useState } from "react";

const DatasetItem = ({ item, removeDataset }) => {
  return (
    <div className="dataset-item">
      <div className="header">
        <p className="title">{item?.dataset_name}</p>
        <button onClick={removeDataset}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      <div className="container">
        <ul>
          {item?.columns?.map((columnItem) => {
            return <li key={columnItem}>{columnItem?.label}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DatasetItem;
