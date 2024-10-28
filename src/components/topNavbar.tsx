import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logout from "../assets/icons/Logout.svg";

const TopNavbar = React.memo((): JSX.Element => {
  // @ts-ignore
  const [token, setToken] = useState<string>(
    localStorage.getItem("authToken") || ""
  );
  const [name, setName] = useState<string>(
    localStorage.getItem("username") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("authToken") || "";
      const updatedName = localStorage.getItem("username") || "";
      setToken(updatedToken);
      setName(updatedName);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logoutFunction = (): void => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setToken("");
        setName("");
        navigate("/");
        Swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    });
  };

  const formattedDate = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const today = new Date();
    return new Intl.DateTimeFormat("en-GB", options).format(today);
  }, []);

  return (
    <div className="flex justify-between ">
      <div className="flex-grow sm:mr-[10vw] mb-4 sm:mb-0">
        <span className="text-2xl text-white block sm:inline">
          Hi, {name} Welcome Back!
        </span>
        <p className="text-white opacity-40 text-lg">{formattedDate}</p>
      </div>
      <div className="flex items-center sm:items-start">
        <button
          onClick={logoutFunction}
          className="input-bg-gradient-custom p-2 bg-blue-500 rounded-full text-white"
        >
          <img
            src={logout}
            className="w-fit h-[3vh]"
            alt="Logout Icon"
          />
        </button>
      </div>
    </div>
  );
});

export default TopNavbar;
