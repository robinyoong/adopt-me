import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);

  // useEffect schedules the effect to run after the render happens.
  // When it runs for the first time, it will schedule useEffect, but will not run it until it is done rendering what is returned by the component. This is because you want to show your users something first before you fetch the data
  useEffect(() => {
    // Update/clear the breeds so that it starts afresh
    setBreeds([]);
    setBreed('');

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings)
    }, console.error)
  }, [animal, setBreed, setBreeds]) // this is where you add in your dependencies

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
