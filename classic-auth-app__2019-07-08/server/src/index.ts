import * as express from 'express'
import * as cors from 'cors'
import { create } from 'domain';

const app = express()

app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const authSecret = 'pizzapizza'

/** a key/value pair of the active users on the site */
const activeUsers = {}

const createAuth = (username: string) => {
  activeUsers[username] = true
  return `${username}${authSecret}`
}

/** the check auth should return the username or null
 * if invalid (please never use this in prod)
 */
const checkAuth = (authString: string): boolean => {
  const includesAuth = authString.includes(authSecret)

  if (includesAuth === false) {
    return false
  }

  // jwt validation would go here
  const username = authString.split(authSecret)[0]

  if (activeUsers[username] == null) {
    return false
  }

  return true
}


app.get('/', (req, res) => {
    res.send('hello there')
})

app.post('/login', (req, res) => {
  const { username } = req.body
  if (username == null) {
    res.send({
      error: 'undefined username',
      authToken: null,
    })
    return
  }
  // this is where you would add JWT
  const authToken = createAuth(username)

  res.send({
    error: null,
    authToken
  })
})

app.post('/validate', (req, res) => {
  const { authTokenString } = req.body
  if (authTokenString == null) {
    res.send({
      error: 'undefined authToken',
      valid: false,
    })
    return
  }
  // this is where you would add JWT
  const valid = checkAuth(authTokenString)

  res.send({
    error: null,
    valid,
  })
})

app.listen('4000', () => {
    console.log('the server has started')
})