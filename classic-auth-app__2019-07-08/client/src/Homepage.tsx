import React from 'react'
import axios from 'axios';

interface Props {
    authToken:string
    logout: () => void
}

interface State {
  isValidAuth: boolean
}

type AxiosWrapperType = AxiosResponseType | AxiosResponseErrorType

interface AxiosResponseType {
  data: { error: string, valid: boolean}
  error: null
}

interface AxiosResponseErrorType {
  data: null
  error: any
}

const serverURL = 'http://null.local:4000'


const validatePost = (authToken: string): Promise<AxiosWrapperType> => {
  return new Promise((res, reg) => {
    axios.post(`${serverURL}/validate`, {
      authTokenString: authToken
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


class Homepage extends React.Component<Props, State> {
  state = {
    isValidAuth: false,
  }

  async componentDidMount () {
    const res = await validatePost(this.props.authToken)

    if (res.data && res.data.valid) {
      this.setState({ isValidAuth: true })
    }
  }

  render () {
    return (
      <div>
        <h2>Welcome to the homepage!</h2>
        <p> Your auth token is {this.props.authToken}</p>
        {this.state.isValidAuth  ?
          <p>The server says your auth token is valid</p> :
          <p>The server says your auth token is not valid</p>
        }
        <button type="button" onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}

export default Homepage