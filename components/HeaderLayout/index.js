import React from 'react';
import Navbar from '../Navbar';
import s from './HeaderLayout.module.scss';

const HeaderLayout = ({ navItems, children }) => {
  return (
    <div className={s.outerWrapper}>
      <Navbar items={navItems} />
      {children}
    </div>
  )
}

export default HeaderLayout;
