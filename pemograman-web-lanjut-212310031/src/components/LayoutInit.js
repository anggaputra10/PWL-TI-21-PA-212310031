import React from 'react';
import Header from './Headers';
import Footer from './Footers';
import backgroundImage from '../media/img.jpg';

const LayoutInit = ({ children }) => {
    return (
      <div className="layout-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="content-container">
          <Header/>
  
          <section className="main-section">
            <div className="main-content">
              {children}
            </div>
          </section>
  
          <Footer/>
        </div>
      </div>
    );
  };
  

export default LayoutInit;