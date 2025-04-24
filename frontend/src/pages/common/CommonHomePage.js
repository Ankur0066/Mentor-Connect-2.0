import React from 'react';
import Navbar from '../../components/common/Navbar';
import CommonHome from '../../components/common/CommonHome';
import Footer from '../../components/footer';
import '../../styles/CommonHomePage.css';

const CommonHomePage = () => {
  return (
    <div className="common-home-page ">
      <div className="content-wrapper ">
        
        <Navbar />
        <CommonHome />  
        <Footer />

      </div>
    </div>
  );
};

export default CommonHomePage;