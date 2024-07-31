import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useAuth } from "../context/AuthContext";
import Admin from "../admin/Admin";

import Gallery from "../screens/Gallery";

import { Link } from "react-router-dom";
import UserProfile from "../components/userprofile/UserProfile";
import Password from "../components/userprofile/Password";

import CompanyProfile from "../components/userprofile/CompanyProfile";
function Profile() {
  const { role, logoutUser } = useAuth();

  return (
    <>
      <Tabs className="min-h-dvh w-full  ">
        <TabList className="fixed top-0 z-10 left-0 h-dvh bg-white sm-to-xs:bottom-0 sm-to-xs:top-auto sm-to-xs:h-[5rem] sm-to-xs:w-full p-3  ">
          <section className="h-full space-y-4 flex flex-col sm-to-xs:flex-row sm-to-xs:items-cen sm-to-xs:justify-start items-start px-5 sm-to-xs:items-center shadow-custom rounded-xl text-2xl gap-3 pt-5 sm-to-xs:pt-0 sm-to-xs:px-5">
            <Link
              to="/"
              className="custom-tooltip- flex gap-2 items-end"
              data-tooltip="back to home"
            >
              <i className="fa-duotone fa-solid fa-arrow-left"></i>
              <p className="sm-to-xs:hidden gray text-sm font-bold">Back</p>
            </Link>
            <Tab className="cursor-pointer list-none flex gap-2 items-end uppercase">
              <i className="fa-duotone fa-solid fa-user"></i>
              <p className="sm-to-xs:hidden gray text-sm font-bold">
                My Profile
              </p>
            </Tab>
            <Tab className="cursor-pointer list-none flex gap-2 items-end uppercase">
              <i className="fa-duotone fa-solid fa-rectangle-history"></i>
              <p className="sm-to-xs:hidden gray text-sm font-bold">Gallery</p>
            </Tab>
            <Tab className="cursor-pointer list-none flex gap-2 items-end uppercase">
              <i className="fa-duotone fa-solid fa-lock"></i>
              <p className="sm-to-xs:hidden gray text-sm font-bold">Password</p>
            </Tab>

            {(role === "jobSeeker" || role === "admin") && (
              <Tab className="cursor-pointer list-none flex gap-2 items-end uppercase">
                <i className="fa-duotone fa-solid fa-user-tie-hair"></i>
                <p className="sm-to-xs:hidden gray text-sm font-bold">
                  Company
                </p>
              </Tab>
            )}

            {role === "admin" && (
              <Tab className="cursor-pointer list-none flex gap-2 items-end uppercase">
                <i className="fa-duotone fa-solid fa-user-tie-hair"></i>
                <p className="sm-to-xs:hidden gray text-sm font-bold">ADMIN</p>
              </Tab>
            )}

            <button
              onClick={logoutUser}
              className="absolute bottom-5 sm-to-xs:bottom-auto sm-to-xs:right-5 flex gap-2 uppercase"
            >
              <i className="fa-duotone fa-solid fa-right-from-bracket"></i>
              <p className="sm-to-xs:hidden gray text-sm font-bold">Logout</p>
            </button>
          </section>
        </TabList>
        <section className=" ml-[10rem] px-5 sm-to-xs:p-0 sm-to-xs:m-0   ">
          <TabPanel className="">
            <UserProfile />
          </TabPanel>
          <TabPanel>
            <Gallery />
          </TabPanel>
          <TabPanel>
            <Password />
          </TabPanel>

          {(role === "jobSeeker" || role === "admin") && (
            <TabPanel>
              <CompanyProfile />
            </TabPanel>
          )}
          {role === "admin" && (
            <TabPanel>
              <Admin />
            </TabPanel>
          )}
        </section>
      </Tabs>
    </>
  );
}

export default Profile;
