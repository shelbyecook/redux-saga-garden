import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewPlantForm extends Component {
  state = {
    newPlant: {
      id: 4,
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
    console.log('event happended', this.state.newPlant);
    this.setState({
      newPlant: {
        ...this.state.newPlant,
        [fieldKey]: event.target.value,
      },
    });
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
        <pre>{JSON.stringify(this.state)}</pre>
        <form onSubmit={this.addNewPlant}>
          <input
            type="text"
            name="name"
            value={this.state.newPlant.name}
            onChange={this.handleNameChange('name')}
          />
          <input
            type="text"
            name="kingdom"
            value={this.state.newPlant.kingdom}
            onChange={this.handleNameChange('kingdom')}
          />
          <input
            type="text"
            name="clade"
            value={this.state.newPlant.clade}
            onChange={this.handleNameChange('clade')}
          />
          <input
            type="text"
            name="order"
            value={this.state.newPlant.order}
            onChange={this.handleNameChange('order')}
          />
          <input
            type="text"
            name="family"
            value={this.state.newPlant.family}
            onChange={this.handleNameChange('family')}
          />
          <input
            type="text"
            name="subfamily"
            value={this.state.newPlant.subfamily}
            onChange={this.handleNameChange('subfamily')}
          />
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

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapStateToProps)(NewPlantForm);
