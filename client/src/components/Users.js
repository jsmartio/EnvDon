import React, { useState, useEffect }  from 'react'
import { getUsers, removeUser } from './UserFunctions'
import { sizeSideBar} from './_sharedFunctions'
import { ModalAddUser } from './ModalAddUser'
import localForage from 'localforage'
import { Spinner } from 'reactstrap';

const Userow = (props) => {

    return (

      <div className={"flex_container_row header_back pad5 " + props.bgc} key={"i-/" + props.email}>
          <div className="txt_div flex-2 font-gray leftpad15" >
            {props.first_name}
          </div>
          <div className="txt_div font-gray flex-2">
            {props.last_name}
          </div>
          <div className="txt_div font-gray flex-4">
              {props.email}
          </div>
          <div className="txt_div font-gray flex-1">
            
            <div className="btn deleteBtn visible" 
              id={props.uuid}
              onClick={()=> { props.removeUserStart(props.uuid)} }>
                  <i aria-hidden="true" 
                    className="fa fa-trash-o deleteBtn" 
                    id={props.uuid}
                    onClick={ ()=> {props.removeUserStart(props.uuid)} }></i>
            </div>

          </div>
      </div>                
    )
}

const Allusers = (props) => {

    var tog = false, bgc;

    if(props.users !== undefined && Array.isArray(props.users)){
      props.users.forEach( (e,i) => {
        tog === false ? bgc = 'whitebg' : bgc = 'graybg'
        tog =! tog; 
        props.users[i].bgc = bgc;
      })
    }

    return (
      <div>
      { 
        props.users.map(user => <Userow 
                                      key={user.uuid} 
                                      uuid={user.uuid} 
                                      id={user.id}
                                      bgc={user.bgc}
                                      email={user.email} 
                                      first_name={user.first_name} 
                                      last_name={user.last_name}
                                      removeUserStart={props.removeUserStart}
                                      /> )
      }
      </div>
    )
  
}

export const Users = () =>{

  const [ users, setUsers] = useState([])
  const [ msgVisible, setMsgVisible] = useState('visible')

  const removeUserStart = theUuid => {
    console.log('theUuid = ')
    console.log(theUuid)
    if(theUuid !== undefined){
      localForage.getItem('token', (err, theToken) => {

        removeUser(theUuid, theToken).then(res => {
          setUsers(users.filter( user => user.uuid !== theUuid ));
        }).catch(err => {
          console.log('Err #105 could not remove user ' + err)
        })

      }).catch( () => {
        window.location.href = '/' // no token
      })  

    }
  }

  const Loading = (props) => {

    return (
        <div className={props.msgVisible}>
          <br />
          <center>
          <Spinner type="grow" color="blue"/> Loading users ...
          </center>
            
        </div>
    )
  }

  const addUserStart = (data) => {
    setUsers( [...users, data] );
  }

  useEffect (() => {
    localForage.getItem('token', function(err, theToken) {

        document.body.style.background = "#ffffff";
        window.addEventListener('resize', sizeSideBar);
        sizeSideBar();
        getUsers(theToken).then(res => {
          setMsgVisible('hid')  
          setUsers(res)
        })

    }).catch( () => {
      setTimeout(() => {
        window.location.href = '/' // no token 
      }, 20000);
      
    })  

  },[])

    return (
      <div id="main">
        <div className="part-screen__container flex_container_column">
            <ModalAddUser  addUserStart={addUserStart} />
                <div className="donors__edit__table-header flex_container_row no-shrink">
                    <div className="txt_div  font-white flex-2 leftpad15"  >
                        First name
                    </div>
                    <div className="txt_div font-white flex-2">
                        Last name
                    </div>
                    <div className="txt_div font-white  flex-4">
                        Email
                    </div>
                    <div className="txt_div font-white  flex-1">
                        Delete
                    </div>
                </div>
                
                <div className="donors__edit__table-body flex_container_column " id="user_rows">

                <Allusers users={users} 
                          removeUserStart={removeUserStart}/>

                <Loading msgVisible={msgVisible}/>
                </div>
            </div>
      </div>
    )

}

export default Users
