import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function Products() {
  const [products, setProducts] = React.useState(null);
    useEffect(() => {
        fetch("http://localhost:3001/products")
      .then((res) => res.json())
            .then((data) => {
                console.log(data);
            setProducts(data)
          }
           );
    }, []);
    
    const renderBody1 = () => {
        return products && products.map(({ commPerc, id, manufacturer, name, purchPrice, qtyHand,salePrice, style }) => {
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{manufacturer}</td>
                    <td>{style}</td>
                    <td>{purchPrice}</td>
                    <td>{salePrice}</td>
                    <td>{qtyHand}</td>
                    <td>{commPerc}</td>
                </tr>
            )
        })
    }

  return (
    <div >
       <div>
        <Table striped bordered hover>
             <thead>
                <tr>
                    <th colSpan="7">PRODUCTS</th>
                </tr>
            </thead>           
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufactureer</th>
                    <th>Style</th>
                    <th>Purchase</th>
                    <th>Sales</th>
                    <th>Qty</th>
                    <th>CommPerc</th>
                </tr>
            </thead>
            <tbody>
                {renderBody1()}
            </tbody>
        </Table>  
       </div>
    </div>
  );
}

export default Products;
