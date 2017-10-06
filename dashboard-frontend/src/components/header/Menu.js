import React from 'react';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';


const Menu = ({handleThisWeekOnClick, handlePreWeekOnClick, handleNextWeekOnClick}) => {


  return (
      <div className="menu">
          <span
              onClick={handlePreWeekOnClick}
              className="menu-icon">
            <FaAngleLeft/>
          </span>
          <span
              onClick={handleThisWeekOnClick}>
            THIS WEEK
          </span>
          <span
              onClick={handleNextWeekOnClick}
              className="menu-icon">
            <FaAngleRight/>
          </span>
      </div>
  );
};

export default Menu;