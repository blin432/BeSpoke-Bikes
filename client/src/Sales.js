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

function Sales() {

    //state management
    const [sales, setSales] = React.useState(null);
    const { value:product, bind:bindProduct, reset:resetProduct } = useInput('');
    const { value: salesperson, bind: bindSalesperson, reset: resetSalesperson } = useInput('');
    const { value: customer, bind: bindCustomer, reset: resetCustomer } = useInput('');
    const { value: salesDate, bind: bindSalesDate, reset: resetSalesDate } = useInput('');
    
    //fetching data
    useEffect(() => {
        fetch("http://localhost:3001/sales")
      .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setSales(data)
          }
           );
    }, []);

    //function to map all values to the table
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

   //once form is submitted create sale
    const handleSubmit = (evt) => {
        evt.preventDefault();

        //create sale endpoint
        fetch('http://localhost:3001/sales/sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: product,
                salesperson: salesperson,
                customer: customer,
                salesDate,
            }),
            })
            .then((res) => res.json())
            .catch((err) => console.log('error'))
        }

  return (
    <div >
        <div>
              {/* need to make component for form */}
            <Form onSubmit ={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="3">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                          </Form.Label>
                    <Form.Control
                        type="text" {...bindProduct}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Product"
                    />
                    </Col>
                    <Col xs="3">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindSalesperson}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Salesperson"
                    />
                    </Col>
                    <Col xs="3">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindCustomer}      
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Customer"
                    />
                    </Col>
                    <Col xs="3">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Phone Number
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindSalesDate}             
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="SalesDate"
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
