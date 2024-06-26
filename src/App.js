import Product from './Components/Product'
import PopUp from './Components/PopUp'
import Home from './Route/new'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
  
   
   <Router>
      <Routes>
        
        <Route path="/" element={<PopUp/>} />
        <Route path="/add-product" element={<Product />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
