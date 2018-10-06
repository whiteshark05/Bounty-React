import {Form, Field} from 'simple-react-forms';
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './pform.css'
//import queryString from 'query-string';

class PForm extends Component {
  onClickHandler () {
    // The format is iffy
    console.log(this.refs['simpleForm'].getFormValues());
    let obj = this.refs['simpleForm'].getFormValues();
    console.log(JSON.stringify(obj))
    let url = 'http://localhost:3500/api/problems'
    fetch(url, {
      method: 'post',
      headers: {
        //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    })
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

  }

  render () {
    return (
    <div className='pform'>
      <Form ref='simpleForm' >
          <Field
            name='index'
            label='Index'
            type='text'
          />
          <Field
            name='name'
            label='Tittle'
            type='text'
          />
          <Field
            name='description'
            label='Description'
            type='text'
          />
          <Field
            name='input'
            label='Input'
            type='text'
          />
          <Field
            name='output'
            label='Output'
            type='text'
          />  
          <Field
            name='pricetag'
            label='Price Tag'
            type='text'
          />
          <Field
            name='isActive'
            label='isActive'
            type='text'
          />
      </Form>
      <button onClick={this.onClickHandler.bind(this)}>Submit</button>
      <Link to='/problem'><button>Back</button></Link>
    </div>

    );
  }
}

export default PForm;
