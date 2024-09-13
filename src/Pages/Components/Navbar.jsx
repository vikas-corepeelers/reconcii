import React, { useState } from 'react';
import UserDropdown from './UserDropdown'; // Import the UserDropdown component
import { getFirstCharacter } from '../../Utils/UtilityFunctions';
const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the dropdown

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

    return (
        <>
            <header className="bg-white border-b border-Background flex justify-between items-center px-8 py-4">
                <div className="flex items-center">
                </div>
                <div className="relative">
                    <button onClick={toggleDropdown} className="text-gray-800 rounded-full w-10 h-10 flex items-center justify-center bg-gray-300 font-bold text-lg">
                        {getFirstCharacter(localStorage.getItem('managerName'))}
                    </button>
                    {isDropdownOpen && <UserDropdown />}
                </div>
            </header>
        </>
    );
}

export default Navbar;
