import React, { useEffect, useState } from "react";
import CardComponent from "../Components/CardComponent";
import "../Styles/DefineLogic.css";
import DateRange from "../../components/DateRange";
import FileUpload from "../../components/FileUpload";
import BlankCard from "../../components/BlankCard";
import PrimaryButton from "../../components/PrimaryButton";
import Select from 'react-select';
import OutlineButton from "../../components/OutlineButton";

const DefineLogic = () => {

  const dataSetOptions = [
    {
      dataset_name: 'Custom',
      value: 'Custom',
      label: 'Custom',
    },
    {
      dataset_name: 'Zomato',
      value: 'Zomato',
      label: 'Zomato',
      columns: [
        {value: 'bill_subtotal', label: 'bill_subtotal'},
        {value: 'merchant_pack_charge', label: 'merchant_pack_charge'},
        {value: 'merchant_voucher_discount', label: 'merchant_voucher_discount'},
        {value: 'cancellation_refund', label: 'cancellation_refund'},
        {value: 'logistics_charge',	 label: 'logistics_charge'},
        {value: 'pro_discount_passthrough', label: 'pro_discount_passthrough'},
        {value: 'customer_discount',  label: 'customer_discount'},
        {value: 'rejection_penalty_charge',  label: 'rejection_penalty_charge'},
        {value: 'user_credits_charge',   label: 'user_credits_charge'},
        {value: 'promo_recovery_adj',  label: 'promo_recovery_adj'},
        {value: 'icecream_handling',  label: 'icecream_handling'},
        {value: 'icecream_deductions',  label: 'icecream_deductions'},
        {value: 'order_support_cost', label: 'order_support_cost'},
        {value: 'credit_note_amount',  label: 'credit_note_amount'},
        {value: 'merchant_delivery_charge', label: 'merchant_delivery_charge'}
      ]
    },
    {
      dataset_name: 'Swiggy',
      value: 'Swiggy',
      label: 'Swiggy',
      columns: [
        {value: 'bill_subtotal', label: 'bill_subtotal'},
        {value: 'merchant_pack_charge', label: 'merchant_pack_charge'},
        {value: 'merchant_voucher_discount', label: 'merchant_voucher_discount'},
        {value: 'cancellation_refund', label: 'cancellation_refund'},
        {value: 'logistics_charge',	 label: 'logistics_charge'},
        {value: 'pro_discount_passthrough', label: 'pro_discount_passthrough'},
        {value: 'customer_discount',  label: 'customer_discount'},
        {value: 'rejection_penalty_charge',  label: 'rejection_penalty_charge'},
        {value: 'user_credits_charge',   label: 'user_credits_charge'},
        {value: 'promo_recovery_adj',  label: 'promo_recovery_adj'},
        {value: 'icecream_handling',  label: 'icecream_handling'},
        {value: 'icecream_deductions',  label: 'icecream_deductions'},
        {value: 'order_support_cost', label: 'order_support_cost'},
        {value: 'credit_note_amount',  label: 'credit_note_amount'},
        {value: 'merchant_delivery_charge', label: 'merchant_delivery_charge'}
      ]
    }
];

  const [logicData, setLogicData] = useState([
    {
      id: 1,
      logicName: '',
      fields: [
        {
          type: "data_field",
          dataset: "Table 1",
          field: "Salary",
          selectedDataSetValue: '',
          selectedFieldValue: '',
          customFieldValue: ''
        },
        {
          type: "operator",
          dataset: "",
          field: "+",
          selectedFieldValue: '',
        },
        {
          type: "data_field",
          dataset: "Table 2",
          field: "DA",
          selectedDataSetValue: '',
          selectedFieldValue: '',
          customFieldValue: ''
        },
      ],
      sub_logic: [],
    },
  ]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onAddDataFieldClicked = (rowData, data, item, index) => {
    if (rowData.hasOwnProperty("parentId")) {
      //check sub logic
      let modifiedData = logicData.map((dataItem) => {
        if (dataItem?.id === rowData?.parentId) {
          let modifiedAddedDataField = dataItem?.sub_logic.map(
            (subLogicItem) => {
              if (rowData?.id === subLogicItem?.id) {
                let updatedSubLogicField = [
                  ...subLogicItem?.fields,
                  {
                    type: "operator",
                    dataset: "",
                    field: "+",
                    selectedFieldValue: '',
                  },
                  {
                    type: "data_field",
                    dataset: "Table 2",
                    field: "unknown sub",
                    selectedDataSetValue: '',
                    selectedFieldValue: '',
                    customFieldValue: ''
                  },
                ];
                return { ...subLogicItem, fields: updatedSubLogicField };
              } else {
                return subLogicItem;
              }
            }
          );
          return { ...dataItem, sub_logic: modifiedAddedDataField };
        } else {
          return dataItem;
        }
      });
      setLogicData(modifiedData);
    } else {
      let modifiedData = logicData.map((dataItem) => {
        if (dataItem?.id === rowData?.id) {
          let updatedField = [
            ...dataItem?.fields,
            {
              type: "operator",
              dataset: "",
              field: "+",
              selectedFieldValue: '',
            },
            {
              type: "data_field",
              dataset: "Table 3",
              field: "unknow main",
              selectedDataSetValue: '',
              selectedFieldValue: '',
              customFieldValue: ''
            },
          ];
          return { ...dataItem, fields: updatedField };
        } else {
          return dataItem;
        }
      });
      setLogicData(modifiedData);
    }
  };

  function optionsForDataSet(index) {
    let options = [...dataSetOptions];
    for (let i = 0; i < index; i++) {
      options.push({...logicData[i], dataset_name: logicData[i].logicName})
    }    
    return options
  }
  function checkOpts(value) {
    let result = dataSetOptions.some(e => e.dataset_name === value)
    return result
  }

  const onSelectFieldValue = (fieldValue, logicItem, index, isDataSet = false) => {
    if (logicItem.hasOwnProperty("parentId")) {
      let modifiedData = logicData.map((dataItem, i) => {
        if (logicItem?.parentId === dataItem?.id) {
          let modifiedLogic = dataItem?.sub_logic.map((subLogicItem) => {
              if (subLogicItem?.id === logicItem?.id) {
                let modifiedFields = subLogicItem?.fields.map((field, i) => {
                  if (index === i) {
                    if (isDataSet) {
                      return {...field, selectedDataSetValue: fieldValue}  
                    }
                    return {...field, selectedFieldValue: fieldValue}
                  }
                  return field
                })
                return {...subLogicItem, fields: modifiedFields}
              } else {
                return subLogicItem
              }
            })
            return {...dataItem, sub_logic: modifiedLogic}
        } else return dataItem;
      });
      setLogicData(modifiedData);
    } else {
      // main logic item
      let modifiedData = logicData.map((dataItem) => {
        if (dataItem?.id === logicItem?.id) {
          let modifiedFields = dataItem?.fields.map((field, i) => {
            if (index === i) {
              if (isDataSet) {
                return {...field, selectedDataSetValue: fieldValue}  
              }
              return {...field, selectedFieldValue: fieldValue};
            } else return field;
          })
          return {...dataItem, fields: modifiedFields};
        }
        return dataItem;
      })      
      setLogicData(modifiedData)
    }
  }

  const onSubLogicClick = (data) => {
    let modifiedData = logicData.map((logicItem, index) => {
      if (data?.id === logicItem?.id) {
        let modifiedSubLogicData = [
          ...logicItem?.sub_logic,
          {
            parentId: logicItem?.id,
            id: Math.floor(Math.random() * 100000),
            fields: [
              {
                type: "data_field",
                dataset: "Table 1",
                field: "Salary",
                selectedDataSetValue: '',
                selectedFieldValue: '',
                customFieldValue: ''
              },
              {
                type: "operator",
                dataset: "",
                field: "+",
                selectedFieldValue: '',
              },
              {
                type: "data_field",
                dataset: "Table 2",
                field: "DA",
                selectedDataSetValue: '',
                selectedFieldValue: '',
                customFieldValue: ''
              },
            ],
          },
        ];
        return { ...logicItem, sub_logic: modifiedSubLogicData };
      } else {
        return logicItem;
      }
    });
    setLogicData(modifiedData);
  };

  const onAddLogic = () => {
    setLogicData([
      ...logicData,
      {
        id: Math.floor(Math.random() * 100000),
        logicName: '',
        fields: [
          {
            type: "data_field",
            dataset: "Table 1",
            field: "Salary",
            selectedDataSetValue: '',
            selectedFieldValue: '',
            customFieldValue: ''
          },
          {
            type: "operator",
            dataset: "",
            field: "+",
            selectedFieldValue: '',
          },
          {
            type: "data_field",
            dataset: "Table 2",
            field: "DA",
            selectedDataSetValue: '',
            selectedFieldValue: '',
            customFieldValue: ''
          },
        ],
        sub_logic: [],
      },
    ]);
  };

  const onDeleteLogic = (logicItem) => {
    if (logicItem.hasOwnProperty("parentId")) {
      // sub logic item
      let modifiedData = logicData.map((item, i) => {
        if (logicItem?.parentId === item?.id) {
          let modifiedSubLogicData = [...item?.sub_logic];
          let removedData = modifiedSubLogicData.findIndex(
            (item) => item.id === logicItem.id
          );
          modifiedSubLogicData.splice(removedData, 1);
          return { ...item, sub_logic: modifiedSubLogicData };
        } else return item;
      });
      setLogicData(modifiedData);
    } else {
      // main logic item
      let modifiedData = [...logicData];
      const removeIndex = modifiedData.findIndex(
        (item) => item.id === logicItem.id
      );
      modifiedData.splice(removeIndex, 1);
      setLogicData(modifiedData);
    }
  };

  const onChangeCustomInput = (fieldValue, logicItem, index) => {
    if (logicItem.hasOwnProperty("parentId")) {
      let modifiedData = logicData.map((dataItem, i) => {
        if (logicItem?.parentId === dataItem?.id) {
          let modifiedLogic = dataItem?.sub_logic.map((subLogicItem) => {
              if (subLogicItem?.id === logicItem?.id) {
                let modifiedFields = subLogicItem?.fields.map((field, i) => {
                  if (index === i) {
                    return {...field, customFieldValue: fieldValue}
                  }
                  return field
                })
                return {...subLogicItem, fields: modifiedFields}
              } else {
                return subLogicItem
              }
            })
            return {...dataItem, sub_logic: modifiedLogic}
        } else return dataItem;
      });
      setLogicData(modifiedData);
    } else {
      let modifiedData = logicData.map((dataItem) => {
        if (dataItem?.id === logicItem?.id) {
          let modifiedFields = dataItem?.fields.map((field, i) => {
            if (index === i) {
              return {...field, customFieldValue: fieldValue};
            } else return field;
          })
          return {...dataItem, fields: modifiedFields};
        }
        return dataItem;
      })
      setLogicData(modifiedData)
    }
  }

  const renderMiddleFieldView = (
    logicData,
    fieldItem,
    index,
    isLast,
    isMainRow = false,
    i
  ) => {
    if (fieldItem?.type === "data_field") {
      return (
        <div className="fieldView">
          {false ? (
            <div className="titleDiv">
              <PrimaryButton
                onClick={() => {
                  onAddDataFieldClicked(logicData, fieldItem);
                }}
                label={"Add Data Field"}
              />
            </div>
          ) : (
            <div>
              <label>Select Data Field {`${index / 2 + 1}`}</label>
            </div>
          )}
          <div className="flex">
            <div className="ddSelection">
              <div style={{width: '100%'}}>
                <Select
                  style={{ height: 20, width: "100%"}}
                  menuPortalTarget={document.body} 
                  // MenuProps={{ autoFocus: false }}
                  // value={fieldItem?.selectedFieldValue}
                  onChange={(e) => {onSelectFieldValue(e.value, logicData, index)}}
                  options={optionsForDataSet(i).map((option, i) => {return option})}
                  // onClose={() => setSearchText("")}
                />
              </div>
              {fieldItem?.selectedFieldValue !== 'Custom' ? checkOpts(fieldItem?.selectedFieldValue) ? <div style={{width: '100%'}}>
                <Select
                  styles={{ height: 30, 
                    menu: ({ width, ...css }) => ({ ...css })
                   }}
                  //  placeholder="Please select"
                  menuPortalTarget={document.body}
                  // MenuProps={{ autoFocus: false }}
                  // value={fieldItem?.selectedDataSetValue}
                  onChange={(e) => {onSelectFieldValue(e.value, logicData, index, true)}}
                  // onClose={() => setSearchText("")}
                  options={dataSetOptions.filter((dataSet) => {
                    return dataSet?.dataset_name === fieldItem?.selectedFieldValue
                  })[0]?.columns?.map((option, i) => {return option})}
                />
              </div> : null : <input className="customField" onChange={(e) => {onChangeCustomInput(e.target.value, logicData, index)}}/>}
            </div>
            {isLast &&
              <div className="ml-2 self-center">
                <PrimaryButton
                  onClick={() => {
                    onAddDataFieldClicked(logicData, fieldItem);
                  }}
                  label={"+"}
                />
              </div>}
          </div>
          {index === 0 && isMainRow ? (
            <div className="fieldValueView">
              <label>Set Specific Field Value : </label>
              <input
                className="input"
                onChange={(e) => {
                  onSetFieldValue(e.target.value, logicData);
                }}
              />
            </div>
          ) : (
            <div />
          )}
          {index === 0 && isMainRow ? (
            <div className="bottomButton">
              <PrimaryButton label="Add Sub Logic"
                onClick={() => onSubLogicClick(logicData)}
              />
              <PrimaryButton label="Add New Logic"
                onClick={() => onAddLogic()}
              />
            </div>
          ) : <div/>}
        </div>
      );
    } else if (fieldItem?.type === "operator") {
      return (
        <div className="min-w-24" style={{ paddingTop: 30, paddingInline: 10 }}>
          <Select 
            // style={{ height: 30, width: "100%" }}
            styles={{
               width: "100%",
              indicatorSeparator: () => ({ display: "none" }),
              valueContainer: () => ({
                display:'flex',
                marginLeft: 10
                // alignItems:'center',
              }),
              // indicatorsContainer: () => ({
              //   backgroundColor:'red',
              //   padding: 0,
              // })
            }}
            isSearchable={false}
            menuPortalTarget={document.body} 
            // MenuProps={{ autoFocus: false }}
            // value={fieldItem?.selectedFieldValue}
            defaultValue={"+"}
            placeholder=''
            onChange={(e) => {onSelectFieldValue(e.value, logicData, index)}}
            // onClose={() => setSearchText("")}


        // onChange={setSelectedOption}


            options={[
              {value:'+',label:'+'},
              {value:'-',label:'-'},
              {value:'*',label:'*'},
              {value:'/',label:'/'},
            ]}
          />
        </div>
      );
    } else return null;
  };

  const renderRightButton = (item) => {
    return (
      <div className="rightSideView">
        <div>
          <OutlineButton label="Delete" onClick={() => onDeleteLogic(item)}/>
        </div>
        <div className="mt-2">
          <PrimaryButton label="Save"/>
        </div>
      </div>
    );
  };

  const renderItemSeparator = () => {
    return <div className="border-t-0.5 border-color-gray my-3 ml-36"/>
  }

  const renderFormula = (logicData) => {    
    let labelText = ''
    logicData?.fields.map((field) => {
      if (field?.type === "data_field") {
        if (field?.selectedDataSetValue) {
          labelText = labelText + " " + field?.selectedDataSetValue 
        } else if (field?.customFieldValue) {
          labelText = labelText + " " + field?.customFieldValue 
        }
      } else if (field?.type === "operator") {
        if (field?.selectedFieldValue) {
          labelText = labelText + " " + field?.selectedFieldValue
        }
      }
    })
    return labelText ? <h3 className="mb-2 text-base leading-5 font-bold">{labelText}</h3> : null
  }


  return (
    <div className="">
      <BlankCard
        body={
          <div className="p-6 flex-1 font-Roboto">
            <div className="flex ">
              <div className="items-center min-w-36 flex">
                <h3 className="text-wrap">Select Date Range</h3>
              </div>
              <div className="col-span-12 rounded-md border-1">
                <DateRange
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={onDateChange}
                />
              </div>
            </div>

            <div className="flex mt-3">
              <div className="mt-1 min-w-36 flex ">
                <h3 className="text-wrap">Upload Data Files</h3>
              </div>
              <div className="">
                <FileUpload />
                <div className="flex mt-2 gap-2">
                  <OutlineButton label={'Delete'}/>
                  <OutlineButton label={'Upload'}/>
                </div>
              </div>
            </div>

            <div className="mt-3">
              {logicData.map((logicItem, i) => {
                return (
                  <div key={i}>
                    <div className="logicView">
                      <div className="min-w-36 flex">
                        <h3 style={{wordWrap: 'break-word'}}>{`Defined Logic ${logicItem?.logicName}`}</h3>
                      </div>
                      <div className="fieldMiddleView overflow-x-scroll no-scrollbar">
                        {renderFormula(logicItem)}
                        <div className="flex">
                          {logicItem?.fields.map((fieldItem, index) => {
                            return renderMiddleFieldView(
                              logicItem,
                              fieldItem,
                              index,
                              logicItem.fields.length - 1 === index,
                              true,
                              i
                            );
                          })}
                        </div>
                      </div>
                      {renderRightButton(logicItem)}
                    </div>
                    {logicData.length !== i+1 && renderItemSeparator()}
                    {logicItem?.sub_logic.map((subLogicItem, subIndex) => {
                      return (
                        <div className="logicView">
                          <div className="titleView">
                          </div>
                          <div className="titleViewSubLogin">
                            <label>{`Defined Logic ${logicItem?.logicName} - ${
                              subIndex + 1
                            }`}</label>
                          </div>
                          <div className="fieldMiddleView overflow-x-scroll no-scrollbar">
                            {subLogicItem?.fields.map((fieldItem, index) => {
                              return renderMiddleFieldView(
                                subLogicItem,
                                fieldItem,
                                index,
                                subLogicItem?.fields.length - 1 === index,
                                i
                              );
                            })}
                          </div>
                          {renderRightButton(subLogicItem)}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        }
      />
    </div>
  );

};

export default DefineLogic;
