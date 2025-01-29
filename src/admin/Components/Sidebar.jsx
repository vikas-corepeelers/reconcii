import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ImgConst from "../../Utils/ImgConstants";

const MANAGER_SIDEBAR = [
  {
    id: "dashboard",
    label: "Dashboard",
    route: "/admin/dashboard",
    icon: "dashboard",
  },
  {
    id: "modules",
    label: "Modules",
    route: "/admin/modules",
    icon: "checklist",
  },
  {
    id: "groups",
    label: "Groups",
    route: "/admin/groups",
    icon: "diversity_3",
  },
  {
    id: "users",
    label: "Users",
    route: "/admin/users",
    icon: "badge",
  },
  {
    id: "upload-config",
    label: "Upload Config",
    route: "/admin/upload-config",
    icon: "cloud_upload",
  },
  {
    id: "user-data",
    label: "User Data",
    route: "/admin/user-data",
    icon: "manage_accounts",
  },
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
      case "/admin/dashboard":
        setSelectedIndex(0);
        break;
      case "/admin/groups":
        setSelectedIndex(1);
        break;
      case "/admin/groups/description":
        setSelectedIndex(1);
        break;
      case "/admin/groups/create":
        setSelectedIndex(1);
        break;
      case "/admin/users":
        setSelectedIndex(2);
        break;
      case "/admin/upload-config":
        setSelectedIndex(3);
        break;
      case "/admin/user-data":
        setSelectedIndex(4);
        break;
      default:
        setSelectedIndex(50);
        break;
    }
  };

  return (
    <aside className="w-64 flex flex-col">
      <div
        className="flex items-center justify-center py-3"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <img src={ImgConst.ReconciiLogo} alt="Logo" className="h-14" />
      </div>
      <nav style={{ color: "#ffffff" }}>
        <ul>
          {menuArray?.map((item, i) => {
            return (
              <MenuItem
                key={item?.id}
                menuArray={item}
                selectedIndex={selectedIndex}
                onSelect={() => setSelectedIndex(index)}
                index={i}
              />
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

const MenuItem = ({ menuArray, selectedIndex, setSelectedIndex, index }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    if (!menuArray?.children) {
      navigate(menuArray?.route);
    }
    setOpen(!open);
    setSelectedIndex(index);
  };

  return (
    <li>
      <NavLink
        disabled={menuArray?.children}
        onClick={onClick}
        to={"/"}
        exact
        className={`flex p-3 ${
          selectedIndex === index ? "navLinkSelected" : "navLink"
        }`}
      >
        {menuArray?.icon && (
          <span className="material-icons-outlined mr-2">
            {menuArray?.icon}
          </span>
        )}
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
          {menuArray?.children?.map((item) => {
            return <MenuItem key={item?.id} menuArray={item} />;
          })}
        </ul>
      ) : null}
    </li>
  );
};
