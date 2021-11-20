import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import SalesPersons from './Salespersons';
import Products from './Products';
import Customers from './Customers';
import Sales from './Sales';
import Quarterlysales from './Quarterlysales';
import Container from 'react-bootstrap/Container'


function App() {
  // const [data, setData] = React.useState(null);
  //   useEffect(() => {
  //       fetch("http://localhost:3001/index")
  //     .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           setData(data.message)
  //         }
  //          );
  // }, []);
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
