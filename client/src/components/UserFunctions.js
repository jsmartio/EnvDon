import axios from 'axios'
import localForage from 'localforage'

export const register = (newUser,theToken) => {
    return axios
      .post('/user/register', {
        uuid: newUser.uuid,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
        admin: newUser.admin,
        token: theToken
      })
      .then(res => {
        console.log('Registered')
        return res
      })
      .catch(err => {
        console.log("ClientSide Error @ UserFunctions > getUsers " + err)
        return '++Error Loc 10'
      })

     
}

export const removeUser = (theUuid, token) => {
  return axios
    .post('/user/remove_user', {
      theUuid,
      token
    })
    .then(res => {
      console.log('User Removed')
      return 1
    })
    .catch(err => {
      console.log("ClientSide Error @ UserFunctions > removeUser " + err)
      return '++Error Loc 02'
    })
}

export const getUsers = theToken => {
    return axios
    .post('/user/getusers', {
      token:theToken
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
        console.log("ClientSide Error @ UserFunctions > getUsers " + err)
        return '++Error Loc 07'
    })


}

export const userIsLoggedIn = (token) => {
  return axios
    .post('/user/islogged', {
      token: token
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log("Err (catch) UserFunctions > userIsLoggedIn ... " + err)
      document.location.href = '/'
      return false
    })
}

export const login = user => {
  return axios
    .post('/user/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      return res.data.token
    })
    .catch(err => {
      console.log('Error (catch) UserFunctions > login' + err)
      return 0
    })
}

export const logout = () => {
  localForage.setItem('token', 'x', ()=> {
    window.location.href = '/'
  })
  
}


