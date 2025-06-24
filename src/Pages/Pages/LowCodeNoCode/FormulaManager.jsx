import React, { useState } from "react";
import FormulaBuilder from "./FormulaBuilder";

export default function FormulaManager() {
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
    <div>
      {formulas.map((f, i) => (
        <FormulaBuilder
          key={i}
          formula={f}
          onUpdate={(updated) => updateFormula(i, updated)}
        />
      ))}
    </div>
  );
}
