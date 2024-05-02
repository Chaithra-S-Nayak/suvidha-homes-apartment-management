import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomDetails(props) {
  const roomDetailsHeader = [
    "Tenant id",
    "Name",
    "Age",
    "dob",
    "Status",
    "Room no",
  ];

  const [roomRows, setRoomRows] = useState([]);

  const getRoomDetails = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/ownertenantdetails`, {
        userId: JSON.parse(window.localStorage.getItem("whom")).username,
      });
      setRoomRows(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  return (
    <section className="w-screen min-h-screen py-20 pl-5 pr-5 flex justify-center items-center bg-gray-100">
      <div className="container card overflow-hidden">
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="max-w-full overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200 text-center">
                    {roomDetailsHeader.map((ele, index) => {
                      return (
                        <th
                          key={index + 1}
                          className="w-1/5 min-w-[120px] text-lg font-semibold text-gray-700 py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent uppercase"
                        >
                          {ele}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* <tr> */}
                  {roomRows.map((ele, index) => {
                    return (
                      <tr key={index + 1} className="text-center">
                        <td
                          className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200"
                        >
                          {ele.tenant_id}
                        </td>
                        <td
                          className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200"
                        >
                          {ele.name}
                        </td>
                        <td
                          className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200"
                        >
                          {ele.age}
                        </td>
                        <td
                          className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200"
                        >
                          {ele.dob}
                        </td>
                        <td
                          className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200"
                        >
                          {ele.stat}
                        </td>
                        <td
                          className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200"
                        >
                          {ele.room_no}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoomDetails;
