import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'

function Customers() {
  const [customers, setCustomers] = React.useState(null);
    useEffect(() => {
        fetch("http://localhost:3001/customers")
      .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setCustomers(data)
          }
           );
    }, []);
    
    const renderBody = () => {
        return customers && customers.map(({ address,firstname,id,lastname,phone,startdate }) => {
            return (
                <tr key={id}>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{address}</td>
                    <td>{phone}</td>
                    <td>{startdate}</td>
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
                    <th colSpan="5">CUSTOMERS</th>
                </tr>
            </thead>   
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Startdate</th>
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

export default Customers;
