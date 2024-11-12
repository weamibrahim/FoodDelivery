import React  from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {


  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet />
       

      </div>
    </div>
  );
};

export default Layout;
