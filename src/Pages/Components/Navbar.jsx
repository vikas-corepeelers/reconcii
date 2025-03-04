import React, { useState, useEffect, useRef } from "react";
import UserDropdown from "./UserDropdown"; // Import the UserDropdown component
import { getFirstCharacter } from "../../Utils/UtilityFunctions";
import { useSelector } from "react-redux";
import imgConst from "../../Utils/ImgConstants";
const Navbar = ({ withSidebar = false }) => {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the dropdown
  let userDetailedProfile = useSelector(
    (state) => state.CommonService.userDetailedProfile
  );
  const [name, setName] = useState("Admin");

  useEffect(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      try {
        let userProfileObj = JSON.parse(userProfile);
        setName(userProfileObj?.name || "Admin");
      } catch (e) {
        console.log("E");
      }
    }
  }, []);

  console.log(localStorage.getItem("userProfile"));

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener to detect clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);
  return (
    <div className="flex">
      {withSidebar && (
        <div
          className="flex items-center justify-center p-3"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <img src={imgConst.ReconciiLogo} alt="Logo" className="h-14" />
        </div>
      )}
      <div className="flex-1">
        <header
          className="flex items-center px-8 py-4 justify-end"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div className="relative ml-10">
            <button
              onClick={toggleDropdown}
              className="text-gray-800 rounded-full w-10 h-10 flex items-center justify-center bg-gray-300 font-bold text-lg"
            >
              {getFirstCharacter(name)}
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef}>
                <UserDropdown name={name} />
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
