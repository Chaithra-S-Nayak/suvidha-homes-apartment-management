import axios from "axios";
import React, { useEffect, useState } from "react";

function OwnerDetails(props) {
  const oHeader = [
    "Owner Id",
    "Name",
    "Age",
    "Room no",
    "DOB",
    "Agreement Status"
  ];
  const [ownerRows, setOwnerRows] = useState([]);

  const getOwnerData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/ownerdetails`);
      setOwnerRows(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnerData();
  }, []);

  return (
    <section className="w-screen min-h-screen py-20 pl-5 pr-5 flex justify-center items-center bg-gray-100">
      <div className="container card overflow-hidden">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200 text-center">
                    {oHeader.map((ele, index) => (
                      <th
                        key={index + 1}
                        className="
                          w-1/6
                          min-w-[120px]
                          text-lg
                          font-semibold
                          text-gray-700
                          py-4
                          lg:py-7       
                          px-3
                          lg:px-4
                          border-l border-transparent
                          uppercase
                        "
                      >
                        {ele}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ownerRows.map((ele, index) => (
                    <tr key={index + 1} className="text-center">
                      <td className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200">
                        {ele.owner_id}
                      </td>
                      <td className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200">
                        {ele.name}
                      </td>
                      <td className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200">
                        {ele.age}
                      </td>
                      <td className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200">
                      {ele.room_no}
                      </td>
                      <td className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200">
                        {ele.dob}
                      </td>
                      <td className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200">
                        {ele.aggrement_status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OwnerDetails;
