import React from 'react';
import pet from '@frontendmasters/pet';
import { navigate } from '@reach/router';
import Modal from './Modal';
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

  state = { loading: true, showModal: false };
  // similar to useEffect, that it only runs once at the start
  componentDidMount() {
    // useful for AJAX request
    // in class components, props are passed in as this.props
    // this.props is immutable. you can't change it - it is read-only
    //.then has to be in an arrow function so that this keyword can be used
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
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

  toggleModal = () => this.setState({showModal: !this.state.showModal})
  adopt = () => navigate(this.state.url)

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const { animal, breed, location, description, name, media, showModal } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>

          <ThemeContext.Consumer>
            {([theme]) => (
              <button onClick={this.toggleModal} style={{ backgroundColor: theme }}>Adopt {name} </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className='buttons'>
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null
          }
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
