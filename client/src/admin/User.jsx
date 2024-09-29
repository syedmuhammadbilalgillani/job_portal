import React from "react";
import { useAuth } from "../context/AuthContext";

function User() {
  const { allUserData, deleteUserById, userContactInfo } = useAuth();
  // console.log(allUserData);
  return (
    <>
      <div className="overflow-x-auto sm-to-xs:px-5 min-h-dvh">
        <table className="min-w-full bg-white  shadow-custom  my-6 mx-2 ">
          <thead className="">
            <tr className="bg-gray-400 text-white text-left">
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                userId
              </th>
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                Email
              </th>
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                Role
              </th>
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                Profile Picture
              </th>
              {/* <th className="py-3 px-3 uppercase font-semibold text-sm">
                Contact Info ID
              </th> */}
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                Phone
              </th>
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                address
              </th>
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                city
              </th>
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                state
              </th>
              {/* <th className="py-3 px-3 uppercase font-semibold text-sm">
                Created At
              </th>
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                Updated At
              </th> */}
              <th className="py-3 px-3 uppercase font-semibold text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allUserData?.map((data, index) => (
              <tr className="hover:bg-gray-200" key={index}>
                <td className="py-3 px-3">{data?._id}</td>
                <td className="py-3 px-3">{data?.name}</td>
                <td className="py-3 px-3">{data?.email}</td>
                <td className="py-3 px-3">{data?.role}</td>
                <td className="py-3 px-3">
                  <img
                    src={
                      data.profilePicture ||
                      "https://tse3.mm.bing.net/th?id=OIP.r2TG-o3x6mNwAaBCyaUlsAAAAA&pid=Api&P=0&h=220"
                    }
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                {/* <td className="py-3 px-3">{data.contactInfoId}</td> */}
                <td className="py-3 px-3">
                  {data?.contactInfo?.phoneNumber || null}
                </td>
                <td className="py-3 px-3">
                  {data?.contactInfo?.address || null}
                </td>
                <td className="py-3 px-3">{data?.contactInfo?.city || null}</td>
                <td className="py-3 px-3">
                  {data?.contactInfo?.state || null}
                </td>
                {/* <td className="py-3 px-3">
                  {new Date(data?.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-3">
                  {new Date(data?.updatedAt).toLocaleString()}
                </td> */}
                <td className="py-3 px-3">
                  <button
                    className="btn-red px-3 py-1 rounded-lg"
                    onClick={() => deleteUserById(data?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default User;
