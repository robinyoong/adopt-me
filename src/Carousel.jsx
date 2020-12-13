import React from 'react';

class Carousel extends React.Component {
  state = {
    photos: [], // array of images
    active: 0, // showing the first one by default
  };

  // takes in a set of props and gives you a new set of state
  static getDerivedStateFromProps({ media }) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  // Whenever you are doing event listeners or passing in function with children, use arrow functions
  handleIndexClick = (event) =>  {
    this.setState({
      //coerce the string from DOM into a number
      active: +event.target.dataset.index
    })
  }


  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
