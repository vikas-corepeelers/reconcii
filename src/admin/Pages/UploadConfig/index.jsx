import React, { useEffect, useRef, useState } from "react";
import BlankCard from "../../../components/BlankCard";
import PrimaryButton from "../../../components/PrimaryButton";
import Alert from "../../../components/Alert";

import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];
import "./upload.style.css";
import CustomSelect from "../../../components/CustomSelect";

const TENDER_OPTIONS = [
  { key: "key1", label: "Promo Master" },
  { key: "key2", label: "Budget Master" },
  { key: "key3", label: "Swiggy" },
  { key: "key4", label: "Freebies Master" },
  { key: "key5", label: "Zomato" },
  { key: "key6", label: "MagicPin" },
  { key: "key7", label: "DotPe" },
];

export default function UploadConfig() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const onSubmit = () => {};

  return (
    <div className="">
      <BlankCard
        header={<h4 class="box-title font-bold text-base">UPLOAD CONFIG</h4>}
      >
        <div className="pt-3 w-full">
          <div className="custom-file-picker">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            >
              <div className="drag-drop-component">
                <i
                  className="fas fa-file-alt"
                  style={{ fontSize: "30px", marginBottom: "15px" }}
                ></i>
                <p>Drag & Drop your files here</p>
              </div>
            </FileUploader>
          </div>
          <div className="md:w-1/3 mt-3">
            <PrimaryButton label="Upload" onClick={onSubmit} />
          </div>
        </div>
      </BlankCard>
    </div>
  );
}
