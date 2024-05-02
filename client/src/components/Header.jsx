// import React, { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { HamContext } from "../HamContextProvider";

function Header(props) {
  const nav = useNavigate();
  const location = useLocation();

  const logoutHandler = function () {
    localStorage.clear();
    nav("/", { replace: true });
  };

  // const { hamActive, hamHandler } = useContext(HamContext);
  const user = JSON.parse(localStorage.getItem("whom")).userType;

  const isHome = location.pathname === `/${user}`;

  return (
    <nav className="w-full h-14 bg-[#061025] flex items-center justify-between px-4">
      <div className="flex items-center">
        <img
          className="h-10 w-10"
          src={"/Apartment rent-bro.svg"}
          alt="Suvidha Homes Icon"
        />
        <h1 className="text-base md:text-lg px-2 font-semibold text-white">
        Suvidha Homes
        </h1>
      </div>
      <ul className="hidden md:flex items-center space-x-4">
        {props.forHam &&
          props.forHam.map((ele, index) => {
            if (ele === "Home") {
              return (
                <li key={index + 1}>
                  <NavLink
                    to={`/${user}`}
                    className="text-white hover:text-gray-300 transition-colors duration-300"
                  >
                    {ele}
                  </NavLink>
                </li>
              );
            }
            return (
              <li key={index + 1}>
                <NavLink
                  to={`/${user}/${ele.replace(/\s/g, "").toLowerCase()}`}
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                >
                  {ele}
                </NavLink>
              </li>
            );
          })}
        {!isHome && (
          <li>
            <button
              className="text-white font-medium text-base transition duration-300 border-2 hover:border-b-white border-transparent mr-5"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
      {/* Rest of your code */}
    </nav>
  );
}

export default Header;