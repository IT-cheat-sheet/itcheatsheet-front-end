// import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home/home_page';
import Navbar from "./core/components/navbar";
import Footer from "./core/components/footer";
function App() {
  return (
    <div className="App ">
        <Navbar/>
        <HomePage/>
        <Footer/>
    </div>
  );
}

export default App;
