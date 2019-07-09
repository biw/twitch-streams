import React from 'react';
import './App.css';
import LoginForm from './LoginForm';
import Homepage from './Homepage';

interface State {
  username: string
  authToken: string | null
}

class App extends React.Component<{}, State> { 
  constructor (props: {}) {
    super(props)
    const authToken = localStorage.getItem('authToken')

    this.state = {
      username: '',
      authToken,
    }
  }

  render () {
  return (
    <div className="App">
      <header className="App-header">
        {this.state.authToken === null ?
     <LoginForm
      username={this.state.username}
      setUsername={(val:string) => {
       this.setState({ username: val })
      }}
      setAuthToken={(val:string) => {
        this.setState({ authToken: val})
        localStorage.setItem('authToken', val)
      }}
    /> :
     <Homepage authToken={this.state.authToken!} logout={() => {
       localStorage.removeItem('authToken')
       this.setState({ authToken: null})
     }} />
    }
      </header>
    </div>
  );
}}

export default App;
