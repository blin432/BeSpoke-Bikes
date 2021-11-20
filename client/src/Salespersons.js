import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { useInput } from '../src/customHooks/addSale';

function SalesPersons() {
    const [salespersons, setSalespersons] = React.useState(null);
    const { value: firstname, bind:bindFirstname, reset:resetFirstname} = useInput('');
    const { value: lastname, bind: bindLastname, reset: resetLastname } = useInput('');
    const { value: address, bind: bindAddress, reset: resetAddress } = useInput('');
    const { value: phone, bind: bindPhone, reset: resetPhone } = useInput('');
    const { value: startDate, bind: bindStartDate, reset: resetStartDate } = useInput('');
    const { value: termDate, bind: bindTermDate, reset: resetTermDate} = useInput('');
    const { value: manager, bind: bindManager, reset: resetManager } = useInput('');


   
    
    //fetch data
    useEffect(() => {
        fetch("http://localhost:3001/salespersons")
      .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setSalespersons(data)
          }
           );
    }, []);

    //function to map all values to the table
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

   //once form is submitted create sale
    const handleSubmit = (evt) => {
        evt.preventDefault();

        //create sale endpoint
        fetch('http://localhost:3001/salespersons/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                address: address,
                phone: phone,
                startDate: startDate,
                termDate: termDate,
                manager: manager


            }),
            })
            .then((res) => {
               fetch("http://localhost:3001/salespersons")
                .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setSalespersons(data)
                    }
                ); 
            })
            .catch((err) => console.log('error'))
    }    

  return (
    <div >
          <div>
              {/* need to create own component for forms */}
            <Form onSubmit ={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindFirstname}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="firstname"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindLastname}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Lastname"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindAddress}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="address"
                    />
                    </Col>
                    <Col xs="1">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Phone Number
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindPhone}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="phone"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindStartDate}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Start Date"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindTermDate}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Termination Date"
                    />
                    </Col>
                    <Col xs="1">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindManager}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="manager"
                    />
                    </Col>
                    <Col xs="auto">
                    <Button type="submit" value= 'Submit' className="mb-2">
                        Submit
                    </Button>
                    </Col>
                </Row>
            </Form>              
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
