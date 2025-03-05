import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import ImgConst from "../../Utils/ImgConstants";
import MainLogo from "../../assets/Images/ReconcillLogo.png";
const MANAGER_SIDEBAR = [
  {
    id: "dashboard",
    label: "Dashboard",
    route: "/dashboard",
    icon: "dashboard",
  },
  {
    id: "tools",
    label: "Tools",
    route: "/tools",
    icon: "construction",
  },
  {
    id: "organization",
    label: "Organization",
    route: "/organization",
    icon: "corporate_fare",
  },
  {
    id: "modules",
    label: "Modules",
    route: "/modules",
    icon: "checklist",
  },
  {
    id: "groups",
    label: "Groups",
    route: "/groups",
    icon: "diversity_3",
  },

  {
    id: "users",
    label: "Users",
    route: "/users",
    icon: "badge",
  },
  // {
  //   id: "upload-config",
  //   label: "Upload Config",
  //   route: "/upload-config",
  //   icon: "cloud_upload",
  // },
  // {
  //   id: "user-data",
  //   label: "User Data",
  //   route: "/user-data",
  //   icon: "manage_accounts",
  // },
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
    if (key?.includes("modules/permissions")) {
      setSelectedIndex(3);
      return;
    }
    if (key?.includes("users/edit")) {
      setSelectedIndex(3);
      return;
    }

    switch (key) {
      case "/dashboard":
        setSelectedIndex(0);
        break;
      case "/tools":
        setSelectedIndex(1);
        break;
      case "/organization":
        setSelectedIndex(2);
        break;
      case "/modules":
        setSelectedIndex(3);
        break;
      case "/groups":
        setSelectedIndex(4);
        break;
      case "/groups/description":
        setSelectedIndex(4);
        break;
      case "/groups/create":
        setSelectedIndex(4);
        break;
      case "/groups/users/list":
        setSelectedIndex(4);
        break;
      case "/users":
        setSelectedIndex(5);
        break;
      case "/users/add":
        setSelectedIndex(5);
        break;
      case "/upload-config":
        setSelectedIndex(6);
        break;
      case "/user-data":
        setSelectedIndex(7);
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
        <img src={MainLogo} alt="Logo" className="h-14" />
      </div>
      <nav style={{ color: "#ffffff" }}>
        <ul>
          {menuArray?.map((item, i) => {
            return (
              <MenuItem
                key={item?.id}
                menuArray={item}
                selectedIndex={selectedIndex}
                onSelect={() => setSelectedIndex(i)}
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

const MenuItem = ({ menuArray, selectedIndex, onSelect, index }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const roleId = localStorage.getItem("Role");

  if (roleId === "0" && index > 3) {
    return null;
  }

  if (roleId !== "0" && index > 0 && index < 4) {
    return null;
  }

  const onClick = (e) => {
    e.preventDefault();
    if (!menuArray?.children) {
      navigate(menuArray?.route);
    }
    setOpen(!open);
    onSelect(index);
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
