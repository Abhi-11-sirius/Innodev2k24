// cjnjev nxbhvbjs  dxjvnjd nbdjjv  jbdvhvj nhdffhfj mbdvjgjd nbdhvjdb nbdjbvj nbdvbvj
// bcshbhcsb ncsbjcsjv ncbjbvsj vmd jcj nbejbej vnhjdvm jejfeb
// Layout.jsx
import React from 'react';
import Navbar from "../components/NavbarLandingPage";
// import Footer from "../components/footer";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet /> {/* This renders the child route component */}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
