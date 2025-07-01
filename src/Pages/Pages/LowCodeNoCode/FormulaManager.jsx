import React, { useState } from "react";
import FormulaBuilder from "./FormulaBuilder";
import { useParams } from "react-router-dom";
import ExpandableCard from "../DefineLogic/ExpandableCard";

export default function FormulaManager() {
  const params = useParams();

  return (
    <div className="bg-white p-4 shadow-md">
      <h4 class="box-title font-bold text-base mb-3">
        Formula Manager - {params?.tender}
      </h4>
      <ExpandableSection report={{ name: "POS" }} />
      <ExpandableSection report={{ name: "Zomato" }} />
    </div>
  );
}

const ExpandableSection = ({ report }) => {
  const [formulas, setFormulas] = useState([
    {
      name: "Zomato Commission",
      parts: [
        { type: "field", value: "zomato_net_amount" },
        { type: "operator", value: "*" },
        { type: "field", value: "slab_rate" },
      ],
    },
    {
      name: "PG Applied On",
      parts: [
        { type: "field", value: "zomato_net_amount" },
        { type: "operator", value: "+" },
        { type: "field", value: "zomato_tax_paid_by_customer" },
      ],
    },
  ]);

  const updateFormula = (index, updated) => {
    const copy = [...formulas];
    copy[index] = updated;
    setFormulas(copy);
  };
  return (
    <ExpandableCard header={report?.name}>
      {formulas.map((f, i) => (
        <FormulaBuilder
          key={i}
          formula={f}
          onUpdate={(updated) => updateFormula(i, updated)}
        />
      ))}
    </ExpandableCard>
  );
};
