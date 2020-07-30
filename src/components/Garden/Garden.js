import React from 'react';
import NewPlantForm from '../NewPlantForm/NewPlantForm';
import PlantList from '../PlantList/PlantList';

const Garden = (props) => (
  <div>
    <h2>This is the garden!</h2>
    <NewPlantForm />
    <PlantList />
  </div>
);

export default Garden;
