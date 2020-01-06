import React, { useState, useEffect }  from 'react'
import { login } from './UserFunctions'
import { Alert, Spinner } from 'reactstrap';
import { centerLogin } from './_sharedFunctions'
import localForage from 'localforage'
//import { brotliDecompressSync } from 'zlib'
//import logo from '../logo_env.png';

const Msgbar = (props) => {
  const aStyle = {
    paddingRight:'50px',
    paddingBottom:'20px',
    backgroundColor:'#4287f5',
    border:'0px solid #4287f5'
  }
  return (
      <Alert color="primary" className="marginRight" style={aStyle}>
          <Spinner type="grow" color="light" className={props.spin}/> {props.msg}
      </Alert>
  )
}


export const Landing = () => {

  const [email, setEmail] = useState('admin@envision.design')
  const [password, setPassword] = useState('sifdje9uij343er')
  const [msg, setMsg] = useState('Enter valid credentials to proceed')
  const [spin, setSpin] = useState('visible')

  function onSubmit(e) {
      e.preventDefault()
      setSpin('visible')
      setMsg('Checking credentials...')
      const user = {
        email: email,
        password: password
      }

      if(email === null || email === undefined || email === '' || password === null || password === undefined || password === ''){
        setSpin('hid')
        setMsg('Please ender valid login credentials')
      } else {
        localForage.setItem('token', false); // clear old token if exists
        login(user).then(res => {
          if (parseInt(res) !== null ) {
            localForage.setItem('token', res)
            
            setTimeout(() => {
              window.location.href = '/users'
            }, 1000);
            
          } else {
            console.log('+++ unhandled error here: ' + __filename)
            setSpin('hid')
            setMsg('Login Failed')
          }
        }).catch( err => {
          console.log('+++ error in file: ' + __filename + "err=" + err)
        })
      }

  }

    useEffect(() => {
        centerLogin()
        setSpin('hid')
        setMsg('Enter valid credentials to proceed')
        document.body.style.background = "#f3f3f3 url('img/blue_background.png') left top";
        window.addEventListener('resize', centerLogin);
        window.addEventListener('DOMContentLoaded', centerLogin);
    }, [])

    return (
      <div className="container align-middle" id="loginform">
        
        <div className="login__container flex_container_column">
          <div className="login__logo-container flex_container_row">
            <div className="login__logo flex_container_column">
                <img src="./img/logo_env.png" alt="Logo"/>
                <h3>CMS System</h3>
            </div>
          </div>
        </div>

        <div className="login__credentials-container flex_container_column">
          
            <Msgbar msg={msg} spin={spin}/>

            <form noValidate onSubmit={onSubmit}>
                  
                  <div className="login__form flex_container_column" >

                    <div className="padding20">
                      <input  type="email"
                              className="form-control borderless"
                              name="email"
                              placeholder="Enter email"
                              value={email}
                              onChange={event => setEmail(event.target.value)}  />
                    </div>
                    <div className="padding20">
                      <input  type="password"
                              className="form-control borderless"
                              name="password"
                              placeholder="Password"
                              value={password}
                              onChange={event => setPassword(event.target.value)}  />
                    </div>

                  </div>
                  <button className="login__login-button" type="submit">Login</button><br></br>

              </form>
          
          </div>

      </div>
    )
  }