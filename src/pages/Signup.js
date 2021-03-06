import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFormik, Form, Field } from 'formik';

import * as Yup from 'yup'

import withAuth from '../components/withAuth';


class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  };

  // handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const email = this.state.email;
  //   const password = this.state.password;
  //   const passwordRepeat = this.state.passwordRepeat;
  //   if(password === passwordRepeat) {
  //     console.log(email, password)
  //     this.props.signup({ email, password})
  //     .then( (user) => {
  //         console.log('Estic al then')
  //         this.setState({
  //             email: '',
  //             password: '',
  //             passwordRepeat: '',
  //         })
  //       })
  //     .catch( error => console.log(error) )
  //   } else {
  //     console.log('Maaaaaaal')
  //   }
  // } 

  render() {
    return (
      <section className="main-splash">
        <Form autoComplete="off">
          <section className='form-sections'>
            <Field type='string' name='name' placeholder='name' />
            {this.props.touched.name && this.props.errors.name && <p className='form-error'>{this.props.errors.name}</p>}
          </section>
          <section className='form-sections'>
            <Field type='email' name='email' placeholder='email' />
            {this.props.touched.email && this.props.errors.email && <p className='form-error'>{this.props.errors.email}</p>}
          </section>
          <section className='form-sections'>
            <Field type='password'name='password' placeholder='password' />
            {this.props.touched.password && this.props.errors.password && <p className='form-error'>{this.props.errors.password}</p>}
          </section>
          <section className='form-sections'>
            <Field type='password' name='passwordRepeat' placeholder='repeat password' />
            {/* {this.props.touched.passwordRepeat && this.props.errors.passwordRepeat && <p>{this.props.errors.passwordRepeat}</p>} */}
            {this.props.touched.passwordRepeat && this.props.errors.passwordRepeat && <p className='form-error'>{this.props.errors.passwordRepeat}</p>}
            {this.props.errors.passwordMatch && <p>{this.props.errors.passwordMatch}</p>}
          </section>
          <section className='form-sections'>
            <button className='submit-button' type='submit'>Signup</button>
            <p>Already have account? 
              <Link to={'/'}> Login</Link>
            </p>
          </section>
        </Form>
      </section>
    )
  }
}

export default withAuth(withFormik({
  mapPropsToValues({ name, email, password, passwordRepeat }) {
    return ({
      name: name || '',
      email: email || '',
      password: password || '',
      passwordRepeat: passwordRepeat || '',
    })		
  },
  handleSubmit(values, bag) {
    const name = values.name;
    const email = values.email;
    const password = values.password;
    const passwordRepeat = values.passwordRepeat;
    if(password !== passwordRepeat) {
      bag.setErrors({
        passwordMatch: "passwords doesn't match"
      })
    } else {
      bag.props.signup({ name, email, password})
      .then( (user) => {
        this.setState({
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
        })
      })
    .catch( error => console.log(error) )
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
    .required('name is required'),
    email: Yup.string()
      .email('wrong email')
      .required('email is required'),
    password: Yup.string()
      .required('password is required')
      .min(8),
    // passwordRepeat: Yup.string()
    //   .required('password is required'),
    passwordRepeat: Yup.string()
    .required()
    .label('Confirm password')
    .test('passwords-match', "password doesn't match", function(value) {
      console.log(this.parent.password)
      console.log(value)
      return this.parent.password === value;
    }),
    })
  })(Signup));