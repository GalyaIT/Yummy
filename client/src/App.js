import { Component } from 'react'
import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';
import UserContext from './Context'
import './main.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContainer from './components/Home/MainContainer';
import Recipes from './components/Recipes/RecipesContainer'
// import Useful from './components/Useful/Useful'
// import Cooks from './components/Cooks/Cooks'
// import Curious from './components/Curious/Curious'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './components/Auth/Profile'
import NotFound from './components/Errors/NotFound'
import Loader from './components/Loader/Loader';




class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // loggedIn: null,
      user: null,
      loading: true,
    }
  }


  logIn = (user) => {
    this.setState({
      // loggedIn: null,
      user
    })
  }

  logOut = () => {
    // document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    // document.cookie='x-auth-token='
    window.localStorage.removeItem('x-auth-token');
    this.setState({
      // loggedIn: false,
      user: null
    })

  }
  getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : null;
  }

  componentDidMount() {
    // const token = this.getCookie('x-auth-token');
    const token = window.localStorage.getItem('x-auth-token');
    console.log(token);

    if (!token) {
      this.loading=true
      return this.logOut()
    }

    fetch('http://localhost:5000/api/auth/verify', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      }
    })
      .then(promise => {
        console.log(promise);
        return promise.json()
      })
      .then(response => {
        if (response.status) {        
          this.setState({ loading: false })
          this.logIn({
            username: response.user.username,
            id: response.user.id
           
          })
        } else {
          this.setState({ loading: false })
          this.logOut()
        }
       
        console.log(this.loading);
      })
  }


  render() {
    const {
      user,
      loading
    } = this.state;

    console.log('user', user);
    // if (loading === true) {
    //   return (
    //     <Loader />
    //   )
    // }
    return (
      <UserContext.Provider value={{
        // loggedIn,
        user,
        logIn: this.logIn,
        logOut: this.logOut
      }}>

        <div className="page-wrapper container">

          <Header />
          <Switch>
            <Route path="/" exact>
              <MainContainer />
            </Route>
            <Route path="/recipes" component={Recipes} exact />
            <Route path="/recipes/:category" component={Recipes} />
            {/* <Route path="/cooks" component={Cooks} />
                      <Route path="/useful" component={Useful} />
                      <Route path="/curious" component={Curious} /> */}

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="*" component={NotFound} />
            {/* <Route render={() => <h1 >Something went wrong</h1>} /> */}

          </Switch>
          {/* <Routing/> */}
          <Footer />
        </div>
      </UserContext.Provider>
    )
  }
}

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//         loggedIn: false,
//         user: null
//     }
// }

// logIn = (user) => {
//     this.setState({
//         loggedIn: true,
//         user
//     })
// }
// logOut = (user) => {
//   document.cookie='x-auth-token='
//     this.setState({
//         loggedIn: false,
//         user: null
//     })
// }
//   render() {
//     const {
//       loggedIn,
//       user
//     } = this.state;
//     return (
//       <UserContext.Provider value={{
//         loggedIn,
//         user,
//         logIn: this.logIn,
//         logOut: this.logOut
//       }}>
//         <div className="page-wrapper container">

//           <Header />
//           <Switch>
//             <Route path="/" exact>
//               <MainContainer />
//             </Route>
//             <Route path="/recipes" component={Recipes} exact />
//             <Route path="/recipes/:category" component={Recipes} />
//             {/* <Route path="/cooks" component={Cooks} /> */}
//             {/* <Route path="/useful" component={Useful} />
//           <Route path="/curious" component={Curious} /> */}
//             <Route path="/login" component={Login} />
//             <Route path="/register" component={Register} />
//             <Route path="/profile" component={Profile} />
//             <Route path="*" component={NotFound} />
//           </Switch>
//           <Footer />
//         </div>
//       </UserContext.Provider>
//     )
//   }

// }

// export default App;
