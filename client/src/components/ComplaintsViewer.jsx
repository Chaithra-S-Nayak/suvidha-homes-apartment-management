import React, { useEffect, useState } from "react";
import axios from "axios";

function ComplaintsViewer(props) {
  const [comps, setComps] = useState([]);

  const getComplaints = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/viewcomplaints`);
      setComps(res.data);
      console.log({ res });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComplaints();
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
                    <th className="w-1/2 min-w-[120px] text-lg font-semibold text-gray-700 py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent uppercase">
                      Room No
                    </th>
                    <th className="w-1/2 min-w-[120px] text-lg font-semibold text-gray-700 py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent uppercase">
                      Complaints
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comps.map((ele, index) => (
                    <tr key={index } className="text-center">
                      <td className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200">
                        {ele.room_no}
                      </td>
                      <td className="text-dark font-medium text-base py-5 px-2 border-b border-l border-gray-200">
                        {ele.complaints}
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

export default ComplaintsViewer;
