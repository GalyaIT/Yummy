import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';
import './main.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContainer from './components/Home/MainContainer';
import Recipes from './components/Recipes/RecipesContainer'
import Useful from './components/Useful/Useful'
import Cooks from './components/Cooks/Cooks'
import Curious from './components/Curious/Curious'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NotFound from './components/Errors/NotFound'

function App() {
  return (
    <div className="page-wrapper container">

      <Header />
      <Switch>
        <Route path="/" exact>
          <MainContainer />
        </Route>
        <Route path="/recipes" component={Recipes} />
        <Route path="/cooks" component={Cooks} />
        <Route path="/useful" component={Useful} />
        <Route path="/curious" component={Curious} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />

    </div>
  );
}

export default App;
