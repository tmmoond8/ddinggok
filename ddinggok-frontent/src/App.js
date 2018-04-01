import React, { Component } from 'react';
import styles from './test.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class App extends Component {

  render() {
    return (
      <div className={cx('test')}>
        메롱이야
      </div>
    );
  }
}

export default App;
