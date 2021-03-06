import React from 'react';  
import activityService from '../services/activities-service';

import withAuth from './../components/withAuth';

import { withFormik, Form, Field } from 'formik';
// import * as Yup from 'yup'

class PopupUpdate extends React.Component {  

  state={
    name: '',
    date: '',
    country: '',
    activities: [],
    redirect: false,
    id: ''
  }

  componentDidMount() {
    const id = this.props.activityId
    activityService.oneActivity (id)
    .then( (response) => {           
      this.setState({
        name: response.name,
        country: response.country,
        date: response.date,
        activities: response.activities
      })   
    })
    .catch(error => console.log(error) )
  }

  render() {  
    return (  
      
    <div className='popup'>  
      <div className='popup-inner'>  
        <button onClick={this.props.closePopup}><img src='./../../close.png' alt='delete trip'></img></button>  
        <Form className='create-activity' autoComplete="off" redirect={this.state.redirect}>
          <h1>{this.props.text}</h1>
          <section>
            <label htmlFor="name">Name</label>
            <Field type='name' name='name' placeholder={this.state.name} />
          </section>
          <section>
           <label htmlFor="date">Description</label>
           <Field className='date' type='datetime-local' name='date'  placeholder={this.state.date}/>
          </section>
          <button type='submit'>Submit</button>
        </Form> 
      </div> 
    </div>  
    );  
  } 
}  

export default withAuth(withFormik({
  mapPropsToValues({ name, date }) {    
    return ({
      name: name || '',
      date: date || '',
    })
  },
  handleSubmit(props, state)  {
    const id = state.props.activityId
    const name = props.name;
    const date = props.date;       
    activityService.updateActivity( id, {name, date} )
    .then (response => {      
      window.location.reload();            
    })
    .catch( error => console.log(error) )
  },
})(PopupUpdate));