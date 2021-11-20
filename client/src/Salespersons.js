import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function SalesPersons() {
  const [salespersons, setSalespersons] = React.useState(null);
    useEffect(() => {
        fetch("http://localhost:3001/salespersons")
      .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setSalespersons(data)
          }
           );
    }, []);

    const renderBody = () => {
        return salespersons && salespersons.map(({ address, firstname, id, lastname, manager, phone, startdate, termdate }) => {
            return (
                <tr key={id}>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{address}</td>
                    <td>{phone}</td>
                    <td>{startdate}</td>
                    <td>{termdate}</td>
                    <td>{manager}</td>
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
                    <th colSpan="7">SALESPERSONS</th>
                </tr>
            </thead>           
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Startdate</th>
                    <th>TermDate</th>
                    <th>Manager</th>
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

export default SalesPersons;
