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

function SalesPersons() {
    const [salespersons, setSalespersons] = React.useState(null);
    
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
    

  return (
    <div >
          <div>
              {/* need to create own component for forms */}
            <Form>
                <Row className="align-items-center">
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Jane Doe"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Jane Doe"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Jane Doe"
                    />
                    </Col>
                    <Col xs="1">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Phone Number
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="123-123-1234"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Jane Doe"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Jane Doe"
                    />
                    </Col>
                    <Col xs="1">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Jane Doe"
                    />
                    </Col>
                    <Col xs="auto">
                    <Button type="submit" className="mb-2">
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
