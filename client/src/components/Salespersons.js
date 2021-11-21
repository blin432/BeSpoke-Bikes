import '../App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useInput } from '../customHooks/addSale';

function SalesPersons() {
    const [salespersons, setSalespersons] = useState(null);
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
            console.log('salesperson',data);
            setSalespersons(data)
          }
           );
    }, []);

    //function to map all values to the table added id for idenitifcation
    const renderBody = () => {
        return salespersons && salespersons.map(({ address, firstname, id, lastname, manager, phone, startdate, termdate }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
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

        //update salesperson endpoint, is salesperson does not exist alert message
        //both first name and last name have to exist
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
            }).then((res) =>res.json()).then((data) => {
                alert(data.message);
            })
            .then(() => {
               fetch("http://localhost:3001/salespersons")
                .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setSalespersons(data);
                        resetFirstname();
                        resetLastname();
                        resetAddress();
                        resetPhone();
                        resetStartDate();
                        resetTermDate();
                        resetManager();
                    }
                ); 
            })
            .catch((err) => console.log('error'))
    }    

  return (
      <div >
          <div className="table-headers">
              Update Salespersons
          </div>
          <div>
            {/* need to make another component for forms and map the form fields */}
            <Form onSubmit ={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Firstname
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindFirstname}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="firstname"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Lastname
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindLastname}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Lastname"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Address
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindAddress}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="address"
                    />
                    </Col>
                    <Col xs="1">
                    <Form.Label htmlFor="inlineFormInput" >
                        Phone
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindPhone}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="phone"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Start Date
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindStartDate}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Start Date"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Termination Date
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindTermDate}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Termination Date"
                    />
                    </Col>
                    <Col xs="1">
                    <Form.Label htmlFor="inlineFormInput" >
                        Manager
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
                    <th>id</th>      
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
