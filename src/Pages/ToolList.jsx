import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imgConst from "../Utils/ImgConstants";

function ToolList() {
  const [toolList, setToolList] = useState([]);

  useEffect(() => {
    try {
      let toolsString = localStorage.getItem("organizationTools");
      if (toolsString) {
        let tools = JSON.parse(toolsString);
        setToolList(tools);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  console.log("toolList", toolList);

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      {toolList?.map((tool) => {
        return <Tool tool={tool} key={tool.id} />;
      })}
    </div>
  );
}

export default ToolList;

const Tool = ({ tool }) => {
  const navigate = useNavigate();
  const selectAndContinue = () => {
    if (tool?.active_tool) {
      localStorage.setItem("activeTool", tool?.id);
      navigate("/dashboard");
    }
  };

  return (
    <button onClick={() => selectAndContinue()}>
      <div className={`tool-card ${tool?.active_tool ? "" : "disabled"}`}>
        <div className="header">
          <img src={tool?.id === 1 ? imgConst.ReconciiLogo : imgConst.Tool} />
          {tool?.active_tool && (
            <img src={imgConst.Selected} className="checked-icon" />
          )}
        </div>
        <div className="tool-details">
          <p>{tool?.tool_name}</p>
          <p>{tool?.description}</p>
        </div>
      </div>
    </button>
  );
};
