import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function Sales() {
  const [sales, setSales] = React.useState(null);
    useEffect(() => {
        fetch("http://localhost:3001/sales")
      .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setSales(data)
          }
           );
    }, []);
    
    const renderBody = () => {
        return sales && sales.map(({ customer, id, product, salesdate, salesperson }) => {
            return (
                <tr key={id}>
                    <td>{product}</td>
                    <td>{salesperson}</td>
                    <td>{customer}</td>
                    <td>{salesdate}</td>
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
                    <th colSpan="5">Sale</th>
                </tr>
            </thead>   
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Salesperson</th>
                    <th>Customers</th>
                    <th>SalesDate</th>
                </tr>
            </thead>
            <tbody>
                {renderBody()}
            </tbody>
        </Table>  
       </div>
    </div>
  );
}

export default Sales;
