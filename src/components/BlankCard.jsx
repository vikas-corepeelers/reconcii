import React from "react";

export default function BlankCard({
  header = null,
  body = null,
  children = null,
}) {
  return (
    <div className="box font-Roboto">
      <div className="box-body">
        {header && <div className="box-header !border-b-0 !p-0">{header}</div>}
        {body}
        {children}
      </div>
    </div>
  );
}
