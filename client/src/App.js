import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContainer from './components/MainContainer';


function App() {
  return (
    <div className="page-wrapper container">
         
    <Header />
    <MainContainer />         
    <Footer />
   
</div>
  );
}

export default App;
