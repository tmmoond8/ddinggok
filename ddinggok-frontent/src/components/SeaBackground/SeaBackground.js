import React, { Component } from 'react';
import './SeaBackground.scss';
import background from 'static/images/background.jpg';

class SeaBackground extends Component {

  componentWillMount() {
    const image = new Image();
    image.src = background;

    image.onload = () => {
      console.log('image load complete');
    }
  }

  render () {
    return (
      <section className="sea-background">
      </section>
    )
  }
}

export default SeaBackground;