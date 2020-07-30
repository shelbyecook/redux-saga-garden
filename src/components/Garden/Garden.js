import React, { Component } from 'react';
import NewPlantForm from '../NewPlantForm/NewPlantForm';
import PlantList from '../PlantList/PlantList';
// import axios from 'axios';
import { connect } from 'react-redux';

const Garden = (props) => (
  <div>
    <h2>This is the garden!</h2>
    {/* Redux State isn't needed in the garden, it is just a parent component */}
    {/* Thanks to redux, there is no need to pass along props! */}
    <NewPlantForm />
    <PlantList />
  </div>
);

export default Garden;
