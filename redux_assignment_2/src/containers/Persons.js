import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import { connect } from 'react-redux';
import * as actionTypes from '../redux/store/actions';

class Persons extends Component {
    render() {
        return (
            <div>
                <AddPerson personAdded={this.props.onStoreResult} />
                {this.props.pers.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onDeleteResult(person.id)} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pers: state.persons
    };
};

const mapDispachToProps = dispatch => {
    return {
        onStoreResult: (name, age) => dispatch({ type: actionTypes.STORE_RESULT, name: name, age: age }),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, personId: id })
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Persons);