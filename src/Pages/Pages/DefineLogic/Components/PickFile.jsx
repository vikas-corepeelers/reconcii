import React, { useRef, useState } from "react";
import PrimaryButton from "../../../../components/PrimaryButton";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { setExcelFiles } from "../../../../Redux/Slices/Logics";
import DatasetItem from "./DatasetItem";
export default function PickFile() {
  const dispatch = useDispatch();
  let excelFiles = useSelector((state) => state.LogicsService.excelFiles);

  const hiddenFileInput = useRef(null);

  let [fileList, setFileList] = useState([]);

  const removeDataset = (index) =>{
    let localDataset = [...excelFiles];
    localDataset.splice(index, 1)
    dispatch(setExcelFiles(localDataset))
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFile = async (fileData) => {
    let existingFilesData = [...excelFiles];
    let localExcelFilesDescription = [];

    // Use Promise.all to wait for all the readDataFromExcel promises
    let data = await Promise.all(
      fileData.map(async (item, index) => {
        // Wait for readDataFromExcel to resolve
        let newData = await readDataFromExcel(item);

        // Push to localExcelFilesDescription if dataset_name exists
        if (newData?.dataset_name) {
          localExcelFilesDescription.push(newData);
        }

        // Return the processed file info
        return {
          filename: item.name,
          id: new Date().getTime() + index,
          size: item.size,
        };
      })
    );

    dispatch(
      setExcelFiles(existingFilesData.concat(localExcelFilesDescription))
    );
    setFileList([...fileList, ...data]);
  };

  const handleChange = (event) => {
    const fileUploaded = Object.values(event.target.files);
    handleFile(fileUploaded);
  };

  const readDataFromExcel = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            // Get the first worksheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Get the column names (first row in the Excel sheet)
            if (jsonData.length > 0) {
              let columns = [];
              if (jsonData[0]?.length > 0) {
                columns = jsonData[0].map((item) => ({
                  value: item,
                  label: item,
                }));
              }

              // Create the dataset object
              const dataset = {
                dataset_name: file.name,
                value: file.name,
                label: file.name,
                columns: columns,
              };

              resolve(dataset); // Resolve the promise with the dataset
            } else {
              resolve({});
            }
          } catch (error) {
            reject(error); // Reject the promise if there is an error
          }
        };

        reader.onerror = (err) => reject(err); // Handle file read error
        reader.readAsArrayBuffer(file); // Read the file
      } else {
        resolve({});
      }
    });
  };

  return (
    <div className="font-Roboto text-Text-secondary border-text-primary rounded-md">
      <div>
        <input
          type="file"
          ref={hiddenFileInput}
          accept=".xlsx, .xls"
          onChange={handleChange}
          style={{ display: "none" }}
          multiple
        />
        <div className="flex py-2 justify-end p-2">
        <div className="fixed-upload-button">
          <PrimaryButton
            label={"Browse File"}
            leftIcon={
              <span className="material-icons-outlined">upload_file</span>
            }
            onClick={handleClick}
          />
        </div>
        </div>
      </div>
      <div className="dataset-list">
        {excelFiles?.map((item, index) => {
          return <DatasetItem item={item} key={item?.dataset_name} removeDataset={() => removeDataset(index)} />;
        })}
        {excelFiles?.length === 0 && 
        <div className="dataset-list zero-state">
          No dataset selected
        </div> }
      </div>
    </div>
  );
}
