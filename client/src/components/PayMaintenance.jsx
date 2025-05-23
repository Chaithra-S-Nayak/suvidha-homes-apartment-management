import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
// import { useEffect } from "react";

function PayMaintenance(props) {
  const maintenanceHeader = ["Name", "Tenant no", "Room no", "Status"];
  const [isPaid, setIsPaid] = useState(false);

  const [rows, setRows] = useState([]);

  const pay = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/dashboard/tenant`, {
        userId: JSON.parse(window.localStorage.getItem("whom")).username,
      });
      const [result] = res.data;
      setRows(result);
      setIsPaid(result.stat === "paid");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pay();
  }, []);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/paymaintanance`, {
        userId: JSON.parse(localStorage.getItem("whom")).username,
        status: "Paid",
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [isPaid]);

  return (
    <section className="w-screen min-h-screen py-20 pl-5 pr-5 flex justify-center items-center bg-gray-100">
      <div className="container card overflow-hidden">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200 text-center">
                    {maintenanceHeader.map((ele, index) => {
                      return (
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
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* <tr> */}

                  <tr>
                    <td
                      className="
                          text-center text-dark
                          font-medium
                          text-base
                          py-5
                          px-2
                          border-b border-l border-[#E8E8E8]
                          "
                    >
                      {rows.name}
                    </td>
                    <td
                      className="
                          text-center text-dark
                          font-medium
                          text-base
                          py-5
                          px-2
                          border-b border-l border-[#E8E8E8]
                          "
                    >
                      {rows.room_no}
                    </td>
                    <td
                      className="
                          text-center text-dark
                          font-medium
                          text-base
                          py-5
                          px-2
                          border-b border-l border-[#E8E8E8]
                          "
                    >
                      {rows.tenant_id}
                    </td>
                    <td
                      className="
                          text-center text-dark
                          font-medium
                          text-base
                          py-5
                          px-2
                          border-b border-l border-[#E8E8E8]
                          "
                    >
                      {!isPaid ? (
                        <button
                          className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none hover:bg-white hover:text-blue-500 transition-all duration-300 hover:border-blue-500 border-transparent border-2"
                          onClick={() => {
                            setIsPaid(!isPaid);
                          }}
                        >
                          Pay
                        </button>
                      ) : (
                        <span className="px-6 py-2 border-2 border-transparent">
                          Paid
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PayMaintenance;
