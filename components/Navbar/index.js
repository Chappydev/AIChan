import React from 'react';
import s from './Navbar.module.scss';
import Link from 'next/link';

const Navbar = ({ items = [] }) => {
  return (
    <nav className={s.nav}>
      <div className={s.leftItems}>
        <Link href="/">Demo</Link>
        <Link href="/video">Video</Link>
      </div>
      <div className={s.rightItems}>
        {items}
      </div>
    </nav>
  )
}

export default Navbar;
