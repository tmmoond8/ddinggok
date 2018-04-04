import React from 'react';
import './Header.scss';

const Header = () => (
  <header className="Main-Header">
    <div id="brand">
      <a href="/">띵곡</a>
    </div>
    <nav>
      <a className="active" href="/">최신곡</a>
      <a href="/">가수별 검색</a>
      <a href="/">더 많은 띵곡 보기</a>
    </nav>
  </header>
);

export default Header;