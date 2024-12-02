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

export default function Uploads() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const onSubmit = () => {};

  return (
    <div className="">
      <BlankCard header={<h4 class="box-title font-bold text-base">UPLOAD</h4>}>
        <div className="pt-3 w-full">
          <div className="md:w-1/3 mb-3">
            <CustomSelect
              label="Tender"
              data={TENDER_OPTIONS}
              option_value={"key"}
              option_label={"label"}
              // onChange={(e) =>
              //   handleFilterChange("salesLocation", e.target.value)
              // }
              // value={filterValues?.salesLocation}
            />
          </div>
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
          {/* {profileUpdateParams?.status && (
            <Alert type="success" message={profileUpdateParams?.status} />
          )} */}
          {/* <CustomInput
            placeholder="Name"
            label="Name"
            type="text"
            name="name"
            value={profileUpdateParams?.name}
            onChange={(e) => handleProfileUpdate("name", e.target.value)}
            error={profileUpdateParamsError?.name}
          />
          <CustomInput
            placeholder="Email"
            label="Email"
            type="text"
            name="email"
            value={profileUpdateParams?.email}
            onChange={(e) => handleProfileUpdate("email", e.target.value)}
            error={profileUpdateParamsError?.email}
            // disabled
          />
          <CustomInput
            placeholder="Mobile"
            label="Mobile"
            type="text"
            name="mobile"
            value={profileUpdateParams?.mobile}
            onChange={(e) => handleProfileUpdate("mobile", e.target.value)}
            error={profileUpdateParamsError?.mobile}
          /> */}
          <div className="md:w-1/3 mt-3">
            <PrimaryButton label="Upload" onClick={onSubmit} />
          </div>
        </div>
      </BlankCard>
    </div>
  );
}
