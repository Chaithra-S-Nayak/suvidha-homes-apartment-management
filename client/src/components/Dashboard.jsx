import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { HamContext } from "../HamContextProvider";

function Dashboard(props) {
  const { hamActive, hamHandler } = useContext(HamContext);
  const [forBox, setForBox] = useState();

  const getBoxInfo = async () => {
    const whom = JSON.parse(window.localStorage.getItem("whom")).userType;
    try {
      const res = await axios.post(`http://localhost:5000/dashboard/${whom}`, {
        userId: JSON.parse(window.localStorage.getItem("whom")).username,
      });
      if (whom === "admin") {
        const forAdminBox = [
          { "Total Owner": 59 },
          { "Total Tenant": 39 },
        ];
        forAdminBox[0]["Total Owner"] = res.data.totalowner;

        forAdminBox[1]["Total Tenant"] = res.data.totaltenant;
        setForBox(forAdminBox);
      }
      if (whom === "owner") {
        const forOwnerBox = [
          {"Total Tenant": 39 },
          { "Total Complaints": 2 },
        ];
        forOwnerBox[0]["Total Tenant"] = res.data.totaltenant;
        forOwnerBox[1]["Total Complaints"] = res.data.totalcomplaint;
        setForBox(forOwnerBox);
      }
      if (whom === "tenant") {
        const forTenantBox = [
          { "Tenant ID": 12132 },
          { "Tenant Name": "Tharun" },
          // { "Tenant Age": 20 },
          { "DOB": "12-1-2002" },
          { "Room No": 123456 },
        ];
        forTenantBox[0]["Tenant ID"] = res.data[0].tenant_id;
        forTenantBox[1]["Tenant Name"] = res.data[0].name;
        // forTenantBox[2]["Tenant Age"] = res.data[0].age;
        forTenantBox[2]["DOB"] = res.data[0].dob;
        forTenantBox[3]["Room No"] = res.data[0].room_no;
        setForBox(forTenantBox);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoxInfo();
  }, []);

  return (
    <div className="flex h-screen background m-auto">
      {/* Left-hand side: Rules and Regulations box */}
      <div className="w-2/3 p-10">
        <div className="card bg-white drop-shadow-2xl rounded-xl overflow-hidden">
          <h1 className="text-center font-bold text-4xl text-blue-800 p-8">
            Apartment Rules and Regulations
          </h1>
          <ul className="list-disc pl-12 pr-6 py-4 text-gray-700 text-lg">
            <li className="pb-2">
              Maintain the premises with care and report any issues promptly.
            </li>
            {/* <li className="pb-2">Quiet hours are from 10 PM to 7 AM on weekdays and 11 PM to 8 AM on weekends.</li> */}
            <li className="pb-2">
              All tenants must respect common areas and keep them clean.
            </li>
            <li className="pb-2">
              Pets are allowed with prior approval from the management.
            </li>
            <li className="pb-2">
              Maintain the premises with care and report any issues promptly.
            </li>
            <li className="pb-2">
              Smoking is prohibited in all common and enclosed areas of the
              building.
            </li>
            <li className="pb-2">
              Garbage must be disposed of properly in designated areas and on
              scheduled collection days.
            </li>
            <li className="pb-2">
              Parking is only allowed in assigned spaces to avoid
              inconveniences.
            </li>
            {/* <li className="pb-2">Alterations or improvements to the apartment require written consent from the landlord.</li> */}
            <li className="pb-2">
              Emergency exits and pathways must be kept clear at all times.
            </li>
            <li className="pb-2">
              Noise levels should be kept to a minimum to respect the peace and
              comfort of all residents.
            </li>
            <li className="pb-2">
              Visitors are welcome but must comply with all building rules and
              regulations.
            </li>
            {/* <li className="pb-2">Residents are responsible for the conduct of their guests and ensuring they follow all rules.</li> */}
          </ul>
        </div>
      </div>
      {/* Right-hand side: Display totals */}
      <div className="w-1/3 p-10 flex flex-col items-center justify-start">
        {forBox &&
          forBox.map((ele, index) => (
            <div
              key={index}
              className="card bg-blue-100 rounded-lg p-6 my-4 w-full max-w-md text-center shadow-lg"
            >
              <h2 className="font-semibold text-xl text-gray-700">
                {Object.keys(forBox[index])}
              </h2>
              <p className="text-gray-600">
                <strong>{Object.values(forBox[index])}</strong>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
