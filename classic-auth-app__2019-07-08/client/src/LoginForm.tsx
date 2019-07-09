import React from 'react';
import axios, { AxiosResponse } from 'axios'
import './App.css';

/** tongihts TODO list:
 [x] create a login form
 [] validate it with a simple server
 [] split logged in and non-logged in users
*/

const serverURL = 'http://null.local:4000'

type AxiosWrapperType = AxiosResponseType | AxiosResponseErrorType

interface AxiosResponseType {
  data: { error: string, authToken: string}
  error: null
}

interface AxiosResponseErrorType {
  data: null
  error: any
}


const loginPost = (username: string): Promise<AxiosWrapperType> => {
  return new Promise((res, reg) => {
    axios.post(`${serverURL}/login`, {
      username
    }).then(serverRes => {
       res({
        data: serverRes.data,
        error: null
      })
    }).catch(err => {
      res({
        data: null,
        error: err
      })
    })
  })
}

interface Props {
  username: string,
  setUsername: (val:string) => void
  setAuthToken: (val:string) => void
}

class LoginForm extends React.Component<Props> { 
  submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('hit here')
    const {data} = await loginPost(this.props.username)
    if (data == null) {
        throw new Error('data is null')
    }
    if (data.error != null) {
        throw new Error('there was an error')
    }
    this.props.setAuthToken(data.authToken)
  }

  render () {
  return (
   <div>
      <h2>Login Please:</h2>
      <form onSubmit={this.submitForm}>
        <input type='text' value={this.props.username} onChange={(e) => {
            this.props.setUsername(e.currentTarget.value)
        }} />
        <button>Login</button>
      </form>
        </div>
  );
}}

export default LoginForm;
