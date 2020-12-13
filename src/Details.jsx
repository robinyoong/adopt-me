import React from 'react';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundaries';
import ThemeContext from './ThemeContext';

class Details extends React.Component {
  // constructor(props) {
  //   super(props);

  //set initial state
  //this.state is self contained within the class - no other components can modify its class
  //   this.state = {
  //     loading: true,
  //   };
  // }

  state = { loading: true };
  // similar to useEffect, that it only runs once at the start
  componentDidMount() {
    // useful for AJAX request
    // in class components, props are passed in as this.props
    // this.props is immutable. you can't change it - it is read-only
    //.then has to be in an arrow function so that this keyword can be used
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>

          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name} </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
