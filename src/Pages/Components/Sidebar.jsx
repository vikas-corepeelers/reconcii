import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ImgConst from '../../Utils/ImgConstants';

const MANAGER_SIDEBAR = [
  { id: 'dashboard', label: "Dashboard", route: "/dashboard", icon: "dashboard" },
  { id: 'reconciliations', label: "Reconciliations", route: "/Reconciliations", icon: "currency_exchange" },
  { id: 'vouchers', label: "Vouchers", route: "/vouchers", icon: "confirmation_number" },
  { id: 'reports', label: "Reports", route: "/reports", icon: "report" },
  { id: 'uploads', label: "Uploads", route: "/uploads", icon: "upload_file" },
  { id: 'settings', label: "Settings", route: "/settings", icon: "settings" },
  { id: 'definelogic', label: "Define Logic", route: "/definelogic", icon: "input" },
  // { id: 'my_ads', label: "My Ads", route: "/advertisers/advertisement/list", icon: "receipt_long" },
  // { id: 'ads_performance', label: "Ads Performance", route: "/advertisers/advertisement/performance/list", icon: "ads_click" },
  // { id: 'add_new_ad', label: "Add New Add", route: "/advertisers/advertisement/add", icon: "featured_video" },
];

const Sidebar = () => {

  const menuArray = MANAGER_SIDEBAR;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const parm = useLocation();
  let path = parm.pathname;


  useEffect(() => {
    if (path) {
      selectedSidebar(path);
    }
  }, [path]);

  const selectedSidebar = (key) => {
    // console.log(")(", key);
    switch (key) {
      case "/dashboard":
        setSelectedIndex(0);
        break;
      case "/Reconciliations":
        setSelectedIndex(1);
        break;
      case "/voucher":
        setSelectedIndex(2);
        break;
      case "/reports":
        setSelectedIndex(3);
        break;
      case "/uploads":
        setSelectedIndex(4);
        break;
      case "/settings":
          setSelectedIndex(5);
          break;
      // case "/reconciliation/allrequest": // as of now we are disabling /uploadConfig
      //   setSelectedIndex(7);
      //   break;
      case "/definelogic":
        setSelectedIndex(6);
        break;

      default:
        setSelectedIndex(0);
        break;
    }
  };  

  return (
    <aside className="w-64 bg-white border-r border-Background flex flex-col">
        <div className="flex items-center justify-center my-3">
        <img src={ImgConst.ReconciiLogo} alt="Logo" className="h-14"/>
        </div>
      <nav className="p-4 border-t border-Background">
        <ul className="space-y-4">
          {menuArray?.map((item, i) => {
            return (
              <MenuItem key={item?.id} menuArray={item} selectedIndex={selectedIndex} onSelect={()=>setSelectedIndex(index)} index={i}/>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

const MenuItem = ({ menuArray, selectedIndex, setSelectedIndex, index }) => {

  const [open, setOpen] = useState(false);
  
  return (
    <li>
      <NavLink
        disabled={menuArray?.children}
        onClick={() => {setOpen(!open); setSelectedIndex(index)}}
        to={menuArray?.children ? undefined : menuArray?.route}
        exact
        className={`flex p-2 rounded-md ${selectedIndex === index ? 'navLinkSelected' : 'navLink'}`}
      >
        {menuArray?.icon && <span className="material-icons-outlined mr-2">{menuArray?.icon}</span> }
        <div className="flex-1">{menuArray?.label}</div>
        {menuArray?.children ? (
          <div className="flex justify-center items-end">
            <span className="material-icons-outlined">
              {open ? "keyboard_arrow_down" : "keyboard_arrow_right"}
            </span>
          </div>
        ) : null}
      </NavLink>
      {menuArray?.children && open ? (
        <ul className="ml-8">
            {menuArray?.children?.map((item)=>{
                return(
                    <MenuItem key={item?.id} menuArray={item} />
                )
            })}
        </ul>
      ) : null}
    </li>
  );
};
