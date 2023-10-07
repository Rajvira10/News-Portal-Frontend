"use client";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "@/redux/features/auth-slice";

interface NavbarProps {}

type User = {
  username: string;
  email: string;
  id: string;
};

const Navbar: FC<NavbarProps> = ({}) => {
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      dispatch(logIn(parsedUser));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    dispatch(logOut());
  };

  return (
    <div className="bg-red-400 text-[#112D4E] h-screen w-64 flex flex-col justify-between fixed">
      {/* Sidebar Content */}
      <div>
        <div className="p-4">
          <p className="text-3xl  font-semibold">News Portal</p>
        </div>
        <nav>
          <ul>
            {/* Nav Items */}
            <li className="border-b-white border-b-2 p-4 hover:bg-[#F9F7F7] transition-all">
              <a href="#" className="flex items-center space-x-2 font-bold">
                Dashboard
              </a>
            </li>
            <li className="border-b-white border-b-2 p-4 hover:bg-[#F9F7F7] transition-all">
              <a href="#" className="flex items-center space-x-2 font-bold">
                Profile
              </a>
            </li>
            <li className="border-b-white border-b-2 p-4 hover:bg-[#F9F7F7] transition-all">
              <a href="#" className="flex items-center space-x-2 font-bold">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* User Info */}
      <div className="p-4">
        {user ? (
          <div>
            <p className="text-lg font-semibold">Welcome, {user?.username}!</p>
            <button
              onClick={() => handleLogOut()}
              className="bg-red-500 hover:bg-red-600 text-white mt-2 px-3 py-2 rounded-md transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
