import { useState, useRef, useEffect } from "react";
import { FaCog } from 'react-icons/fa'; 
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SettingsMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlelogout =async () =>{
   try {
         const res = await fetch('/api/v1/users/logout', {
           method: 'POST',
           credentials: 'include',
         });
         console.log(res)
         navigate('/')
         
         

       } catch (err) {
         console.error('Auth check error:', err.message);
       }

  }

  return (
    <div className="relative" ref={menuRef}>
      {/* settings button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-800"
      >
        <FaCog className="text-2xl" />
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute  mt-16 w-[550px] rounded-3xl right-0 bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="text-gray-300 text-sm">
            <li className="px-4 py-4  border-b-[1px] border-gray-400  flex text-center justify-center cursor-pointer">Apps and Websites</li>
            <li className="px-4 py-4  border-b-[1px] border-gray-400 flex text-center justify-center cursor-pointer">QR Code</li>
            <li className="px-4 py-4  border-b-[1px] border-gray-400 flex text-center justify-center cursor-pointer">Notifications</li>
            <li className="px-4 py-4  border-b-[1px] border-gray-400 flex text-center justify-center cursor-pointer"> <NavLink to="/front/account" onClick={() => setOpen(false)}>Settings & Privacy</NavLink></li>
            <li className="px-4 py-4  border-b-[1px] border-gray-400 flex text-center justify-center cursor-pointer">Supervision</li>
            <li className="px-4 py-4  border-b-[1px] border-gray-400 flex text-center justify-center cursor-pointer">Login Activity</li>
            <li onClick={handlelogout} className="px-4 py-4  border-b-[1px] border-gray-400 flex text-center justify-center cursor-pointer text-red-400">Log Out</li>
            <li className="px-4 py-4   flex text-center justify-center cursor-pointer">Cancel</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
