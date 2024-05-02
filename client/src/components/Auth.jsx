import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Auth(props) {
  const nav = useNavigate();
  const inputEl = useRef(null);
  const passEl = useRef(null);
  const [isName, setIsName] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      inputEl.current.value === "" ||
      userId.toUpperCase().charAt(0) === "A" ||
      userId.toUpperCase().charAt(0) === "O" ||
      userId.toUpperCase().charAt(0) === "E" ||
      userId.toUpperCase().charAt(0) === "T"
    ) {
      setIsName(true);
      return;
    } else {
      setIsName(false);
    }
  }, [userId]);

  useEffect(() => {
    if (password.length === 0) {
      setIsPassword(true);
      return;
    } else if (password.length < 6) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, [password]);

  const authorize = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/auth`, {
        username: userId,
        password: password,
      });
      if (res.data.access === "granted") {
        window.localStorage.setItem(
          "whom",
          JSON.stringify({
            userType: res.data.user,
            username: userId,
          })
        );
        toast.success("Welcome : " + res.data.user);
        nav(`/${res.data.user.toLowerCase()}`, { replace: true });
      } else {
        setIsName(false);
        setIsPassword(false);
        toast.error("Error : " + res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error : " + error.message);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    setUserId(inputEl.current.value);
    setPassword(passEl.current.value);
    authorize();
  };

  return (
    <div className="backgroundAuth flex items-center justify-center min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg shadow-xl"> {/* Increased width and changed color */}
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8"> {/* Larger text and bolder font */}
          Suvidha Homes
          </h1>
          <form onSubmit={submitHandler}>
            <div className="mb-5">
              <label htmlFor="user-id" className="block text-lg text-gray-700"> {/* Larger label text */}
                User Id
              </label>
              <input
                ref={inputEl}
                type="text"
                autoFocus
                name="user-id"
                required
                value={userId}
                onChange={() => setUserId(inputEl.current.value)}
                id="user-id" 
                placeholder="Enter your user id"
                className="w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400" 
              />
              {!isName && (
                <span className="text-red-600 text-sm mt-2 block"> {/* Adjusted text size and color */}
                  Invalid username
                </span>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block text-lg text-gray-700"> {/* Larger label text */}
                Password
              </label>
              <input
                ref={passEl}
                type="password"
                required
                name="password"
                id="password"
                value={password}
                autoComplete="on"
                onChange={() => setPassword(passEl.current.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
              />
              {!isPassword && (
                <span className="text-red-600 text-sm mt-2 block"> 
                  Invalid password
                </span>
              )}
            </div>
            <div className="mb-8">
              <button
                type="submit"
                className="w-full px-3 py-3 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none hover:bg-white hover:text-blue-500 transition-all duration-300 hover:border-blue-500 border-transparent border-2">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default Auth;
