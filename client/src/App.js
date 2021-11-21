
import './App.css';
import React from "react";
import SalesPersons from './components/Salespersons';
import Products from './components/Products';
import Customers from './components/Customers';
import Sales from './components/Sales';
import Quarterlysales from './components/Quarterlysales';
import Container from 'react-bootstrap/Container'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          BESPOKE BIKES
      </div>
      </header>
      <Container >
        <SalesPersons />
        <Products />
        <Customers />
        <Sales />
        <Quarterlysales/>        
      </Container>

    </div>
  );
}

export default App;
