import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const fieldOptions = [
  { label: "Bill Subtotal", value: "bill_subtotal" },
  { label: "MVD", value: "mvd" },
  { label: "Pack Charge", value: "merchant_pack_charge" },
  { label: "Net Amount", value: "zomato_net_amount" },
  { label: "Slab Rate", value: "slab_rate" },
];

const operatorOptions = ["+", "-", "*", "/"];
const parenthesisOptions = ["(", ")"];

export default function FormulaBuilder({ formula, onUpdate }) {
  const [formulaParts, setFormulaParts] = useState(formula.parts || []);

  const updatePart = (index, value) => {
    const updated = [...formulaParts];
    updated[index].value = value;
    setFormulaParts(updated);
    onUpdate({ ...formula, parts: updated });
  };

  const addPart = (type) => {
    const defaultValue =
      type === "field"
        ? fieldOptions[0].value
        : type === "operator"
        ? operatorOptions[0]
        : type === "number"
        ? "0"
        : parenthesisOptions[0];

    const updated = [...formulaParts, { type, value: defaultValue }];
    setFormulaParts(updated);
    onUpdate({ ...formula, parts: updated });
  };

  const removePart = (index) => {
    const updated = formulaParts.filter((_, i) => i !== index);
    setFormulaParts(updated);
    onUpdate({ ...formula, parts: updated });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formulaParts);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setFormulaParts(items);
    onUpdate({ ...formula, parts: items });
  };

  const formulaString = formulaParts.map((p) => p.value).join(" ");

  return (
    <div className="">
      <div className="flex text-sm font-medium text-gray-800 mb-2 bg-white border-b border-gray-200 p-2">
        <div className="flex-1">{formula.name}</div>
        <div>
          <div className="flex gap-2">
            <button
              onClick={() => addPart("field")}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              + Field
            </button>
            <button
              onClick={() => addPart("operator")}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              + Operator
            </button>
            <button
              onClick={() => addPart("parenthesis")}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              + ( / )
            </button>
            <button
              onClick={() => addPart("number")}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              + Number
            </button>
          </div>
        </div>
      </div>
      <div className="p-2">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="formula-parts" direction="horizontal">
            {(provided) => (
              <div
                className="flex flex-wrap items-center gap-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {formulaParts.map((part, index) => (
                  <Draggable
                    key={index}
                    draggableId={`part-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm shadow-sm"
                      >
                        {part.type === "field" && (
                          <select
                            value={part.value}
                            onChange={(e) => updatePart(index, e.target.value)}
                            className="bg-white border border-gray-300 rounded px-1 py-0.5 text-xs"
                          >
                            {fieldOptions.map((f) => (
                              <option key={f.value} value={f.value}>
                                {f.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {part.type === "operator" && (
                          <select
                            value={part.value}
                            onChange={(e) => updatePart(index, e.target.value)}
                            className="bg-white border border-gray-300 rounded px-1 py-0.5 text-xs"
                          >
                            {operatorOptions.map((op) => (
                              <option key={op} value={op}>
                                {op}
                              </option>
                            ))}
                          </select>
                        )}

                        {part.type === "parenthesis" && (
                          <select
                            value={part.value}
                            onChange={(e) => updatePart(index, e.target.value)}
                            className="bg-white border border-gray-300 rounded px-1 py-0.5 text-xs"
                          >
                            {parenthesisOptions.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        )}

                        {part.type === "number" && (
                          <input
                            type="number"
                            value={part.value}
                            onChange={(e) => updatePart(index, e.target.value)}
                            className="w-16 border border-gray-300 rounded px-1 py-0.5 text-xs"
                            placeholder="0"
                          />
                        )}

                        <button
                          onClick={() => removePart(index)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {/* Add Part Buttons */}
      <div className="mt-2 text-xs text-gray-600">
        <span className="font-medium">Preview:</span>{" "}
        <code className="bg-gray-100 px-2 py-1 rounded">{formulaString}</code>
      </div>
    </div>
  );
}
