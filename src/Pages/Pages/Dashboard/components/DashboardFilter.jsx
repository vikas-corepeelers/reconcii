import React, { useEffect, useState } from "react";
import SimpleSelectBox from "../../../../components/SimpleSelectBox";
import {
  AGGREGATOR_SALES_ITEM,
  DASHBOARD_ITEMS,
  STORE_SALES_ITEM,
} from "../DashboardConstants";
import "../dashboard.style.css";
import DateRangeComponent from "../../../../components/DateRange";
import useDashboard from "../useDashboard";
import CustomSelect from "../../../../components/CustomSelect";
import DropdownWithCheckbox from "../../../../components/DropDownWithCheckbox";
import { useDispatch, useSelector } from "react-redux";
import InStore from "../../../../assets/Images/in_store.png";
import Download from "../../../../assets/Images/download.png";
import {
  setCurrentDashboardRequest,
  setDashboardFilters,
  setStoreList,
} from "../../../../Redux/Slices/Common";
import { format } from "date-fns";
import PrimaryButton from "../../../../components/PrimaryButton";
const BLANK_FILTERS = {
  startDate: new Date(),
  endDate: new Date(),
  salesLocation: "",
  salesType: "",
  cities: [],
  stores: [],
};
const DashboardFilter = () => {
  const dispatch = useDispatch();
  const {
    fetchCityList,
    fetchStoreList,
    getDashboard,
    downloadStoreReport,
    fetchTenderWiseStoresMissedInMapping,
    fetchOldEffectiveDate,
  } = useDashboard();
  let { cityList, storeList, loadingDashboard } = useSelector(
    (state) => state.CommonService
  );
  const [filterValues, setFilterValues] = useState({
    ...BLANK_FILTERS,
    salesLocation: DASHBOARD_ITEMS[0]?.key,
    salesType: STORE_SALES_ITEM[0]?.key,
  });

  useEffect(() => {
    fetchCityListAndSet();
    fetchTenderWiseStoresMissedInMapping();
    fetchOldEffectiveDate();
  }, []);

  const fetchCityListAndSet = async () => {
    let cityList = await fetchCityList();
    setFilterValues({ ...filterValues, cities: cityList });
  };

  useEffect(() => {
    onCityChange(filterValues?.cities);
  }, [filterValues?.cities?.length]);

  const handleFilterChange = (name, value) => {
    if (name === "salesLocation") {
      let updatedObj = {
        [name]: value,
        salesType:
          value === DASHBOARD_ITEMS[0]?.key
            ? STORE_SALES_ITEM[0]?.key
            : AGGREGATOR_SALES_ITEM[0].key,
      };
      setFilterValues({
        ...filterValues,
        [name]: value,
        salesType:
          value === DASHBOARD_ITEMS[0]?.key
            ? STORE_SALES_ITEM[0]?.key
            : AGGREGATOR_SALES_ITEM[0].key,
      });
      dispatch(setDashboardFilters(updatedObj));
    } else if (name === "salesType") {
      let updatedObj = {
        salesLocation: filterValues["salesLocation"],
        [name]: value,
      };
      setFilterValues({
        ...filterValues,
        [name]: value,
      });
      dispatch(setDashboardFilters(updatedObj));
    }
  };

  const onDateChange = (date) => {
    setFilterValues({ ...filterValues, startDate: date[0], endDate: date[1] });
  };

  const onCityChange = async (cities) => {
    if (cities?.length === 0) {
      setFilterValues({ ...filterValues, stores: [] });
      dispatch(setStoreList([]));
      return null;
    }
    let params = {
      startDate: format(filterValues?.startDate, "yyyy-MM-dd"),
      endDate: format(filterValues?.endDate, "yyyy-MM-dd"),
      cities: cities,
    };
    let storeList = await fetchStoreList(params);
    let storeListIds = storeList
      ?.filter((str) => str.posDataSync === true)
      ?.map((item) => item?.code);
    setFilterValues({ ...filterValues, stores: storeListIds });
  };

  const onStoreChange = (stores) => {
    setFilterValues({ ...filterValues, stores: stores });
  };

  const searchDashboardData = () => {
    let params = {
      startDate: format(filterValues?.startDate, "yyyy-MM-dd 00:00:00"),
      endDate: format(filterValues?.endDate, "yyyy-MM-dd 23:59:59"),
      stores: filterValues.stores,
    };
    getDashboard(params);
    dispatch(setCurrentDashboardRequest(params));
  };

  const submitStoreReportRequest = async () => {
    let req = {
      cities: filterValues.cities,
    };
    await downloadStoreReport(req);
  };

  return (
    <div>
      <div className="box filter-row gap-3">
        <CustomSelect
          data={DASHBOARD_ITEMS}
          option_value={"key"}
          option_label={"label"}
          onChange={(e) => handleFilterChange("salesLocation", e.target.value)}
          value={filterValues?.salesLocation}
          additionalStyle={{ minWidth: "150px" }}
        />
        <DateRangeComponent
          startDate={filterValues?.startDate}
          endDate={filterValues.endDate}
          onDateChange={onDateChange}
        />
        <CustomSelect
          data={
            filterValues?.salesLocation === DASHBOARD_ITEMS[0]?.key
              ? STORE_SALES_ITEM
              : AGGREGATOR_SALES_ITEM
          }
          option_value={"key"}
          option_label={"label"}
          onChange={(e) => handleFilterChange("salesType", e.target.value)}
          value={filterValues?.salesType}
          additionalStyle={{ minWidth: "150px" }}
        />
        <DropdownWithCheckbox
          placeholder={"Select City"}
          data={cityList}
          option_value={"key"}
          option_label={"label"}
          selectedLabel="Cities - "
          selectedOptions={filterValues.cities}
          setSelectedOptions={(cities) =>
            setFilterValues({ ...filterValues, cities: cities })
          }
        />
        <DropdownWithCheckbox
          data={storeList}
          placeholder={"Select Store"}
          option_value={"code"}
          option_label={"name"}
          selectedLabel="Stores - "
          selectedOptions={filterValues.stores}
          setSelectedOptions={onStoreChange}
          disableOptionOnKey={{ key: "posDataSync", value: false }}
        />

        <div>
          <PrimaryButton
            disabled={filterValues.stores?.length === 0}
            label="Search"
            onClick={searchDashboardData}
            loading={loadingDashboard}
          />
        </div>
      </div>
      <div>
        <div className="selected-store-div">
          <div className="">
            <img src={InStore} alt="store" />
            <p>
              Selected Stores: <b>{filterValues.stores?.length}</b>
            </p>
          </div>
          <div>
            <img src={InStore} alt="store" />
            <p>
              Total Stores: <b>{storeList?.length}</b>
            </p>
          </div>
          <div>
            <a
              style={{ opacity: filterValues.cities?.length === 0 ? 0.2 : 1 }}
              href="/"
              disabled={filterValues.cities?.length === 0}
              onClick={(e) => {
                e.preventDefault();
                submitStoreReportRequest();
              }}
            >
              <img src={Download} alt="store" style={{ marginRight: 0 }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilter;
