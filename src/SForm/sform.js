import {Form, Field} from 'simple-react-forms';
import { Link } from "react-router-dom";
import React, {Component} from 'react';
import './sform.css'

class sForm extends Component {
  constructor(props){
    super(props)
    
  }
  onClickHandler () {
    // The format is iffy
    //console.log(this.refs['simpleForm'].getFormValues());
    let obj = this.refs['simpleForm'].getFormValues();
    Object.assign(obj,{problemID:this.props.problemID});
    //console.log(JSON.stringify(obj))
    let url = 'http://localhost:3500/api/solutions'
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
    <div className='sform'>
      <Form ref='simpleForm'>
          <Field
            name='content'
            label='Solution'
            type='text'
          />
      </Form>
      <button onClick={this.onClickHandler.bind(this)}>Submit</button>
      <Link to='/problem'><button>Back</button></Link>
    </div>

    );
  }
}

export default sForm;