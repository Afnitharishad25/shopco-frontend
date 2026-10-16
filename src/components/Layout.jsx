import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import AnnouncementBar from "./AnnouncementBar";

const Layout = ({ showAnnouncement = false }) => {
  return (
    <>
      {showAnnouncement && <AnnouncementBar />}
      
      <Header />

      <main>
        <Outlet />
      </main>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Layout;