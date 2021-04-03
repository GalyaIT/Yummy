import { useState, useEffect } from 'react'
import './main.scss';
import UserContext from './Context'

import Routing from './components/Routing/Routing';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';

const App = (props) => {

  const [user, setUser] = useState(props.user ? {
    ...props.user,
    loggedIn: true
} : null)
const [loading, setLoading]=useState(true)
console.log(loading);
console.log(user);

const logIn = (userObject) => {
    setUser({
        ...userObject,
        loggedIn: true
    })
}

const logOut = () => {
    // document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
     window.localStorage.removeItem('x-auth-token');
    setUser({
        loggedIn: false
    })
}
// const getCookie = (name) => {
//     const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
//     return cookieValue ? cookieValue[2] : null;
//   }

useEffect(()=> {
            // const token = getCookie('x-auth-token');
    const token = window.localStorage.getItem('x-auth-token');
    console.log(token);

    if (!token) {
        setLoading(false)
        return logOut()
    }   
    // setLoading(true)
    fetch('http://localhost:4000/api/auth/verify', {
          method: 'GET',                       
          headers: {
              'Content-type': 'application/json',
              'Authorization':token
          }
        })
         .then(promise => {
              return promise.json()
          })
          .then(response => {
              if (response.status) {                      
                  logIn({
                        username: response.user.username,
                        id: response.user._id
                        })
              } else {                         
                    logOut()                           
                }
                setLoading(false)
            })                

        },[]);      

    //     if (loading) {
    //     return (
    //       <Loader />
    //     )      
    //  }

console.log('user', user)
  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut,
    }}>
      <div className="page-wrapper container">
        <Header />
        <Routing />
        <Footer />
      </div>
    </UserContext.Provider>
  )
}
export default App;

