import './main.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContainer from './components/Home/MainContainer';


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
