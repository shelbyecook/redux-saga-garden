import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (reduxState) => ({
  reduxState,
});

class NewPlantForm extends Component {
  state = {
    newPlant: {
      id: 0,
      name: '',
      kingdom: '',
      clade: '',
      order: '',
      family: '',
      subfamily: '',
      genus: '',
    },
  };

  handleNameChange = (fieldKey) => (event) => {
    this.setState({
      newPlant: {
        ...this.state.newPlant,
        [fieldKey]: event.target.value,
      },
    });
    console.log(this.state.newPlant);
  };

  addNewPlant = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_PLANT', payload: this.state.newPlant });
    this.setState({
      newPlant: {
        id: this.state.newPlant.id + 1,
        name: '',
        kingdom: '',
        clade: '',
        order: '',
        family: '',
        subfamily: '',
        genus: '',
      },
    });
  };

  render() {
    return (
      <div>
        <h3>This is the form</h3>
        {/* <pre>{JSON.stringify(this.state)}</pre> */}
        <form onSubmit={this.addNewPlant}>
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.newPlant.name}
            onChange={this.handleNameChange('name')}
          />
          <label for="kingdom">Kingdom</label>
          <input
            type="text"
            name="kingdom"
            value={this.state.newPlant.kingdom}
            onChange={this.handleNameChange('kingdom')}
          />
          <label for="clade">Clade</label>
          <input
            type="text"
            name="clade"
            value={this.state.newPlant.clade}
            onChange={this.handleNameChange('clade')}
          />
          <label for="order">Order</label>
          <input
            type="text"
            name="order"
            value={this.state.newPlant.order}
            onChange={this.handleNameChange('order')}
          />
          <label for="family">Family</label>
          <input
            type="text"
            name="family"
            value={this.state.newPlant.family}
            onChange={this.handleNameChange('family')}
          />
          <label for="subfamily">Subfamily</label>
          <input
            type="text"
            name="subfamily"
            value={this.state.newPlant.subfamily}
            onChange={this.handleNameChange('subfamily')}
          />
          <label for="genus">Genus</label>
          <input
            type="text"
            name="genus"
            value={this.state.newPlant.genus}
            onChange={this.handleNameChange('genus')}
          />
          <input type="submit" value="Add New Plant" />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NewPlantForm);
