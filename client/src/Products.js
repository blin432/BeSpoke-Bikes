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


function Products() {
    const [products, setProducts] = React.useState(null);
    const { value: name, bind:bindName, reset:resetName} = useInput('');
    const { value: manufacturer, bind: bindManufacturer, reset: resetManufacturer } = useInput('');
    const { value: style, bind: bindStyle, reset: resetStyle } = useInput('');
    const { value: purchasePrice, bind: bindPurchacePrice, reset: resetPurchasePrice} = useInput('');
    const { value: salePrice, bind: bindSalePrice, reset: resetSalePrice} = useInput('');
    const { value: qty, bind: bindQty, reset: resetQty} = useInput('');
    const { value: commPerc, bind: bindCommPerc, reset: resetCommPerc } = useInput('');
    
    //fetching data
    useEffect(() => {
        fetch("http://localhost:3001/products")
      .then((res) => res.json())
            .then((data) => {
                setProducts(data)
          }
           );
    }, []);
    

//function to map all values to the table
    const renderBody = () => {
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

//once form is submitted create sale
    const handleSubmit = (evt) => {
        evt.preventDefault();

        //create sale endpoint
        fetch('http://localhost:3001/products/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                manufacturer: manufacturer,
                style: style,
                purchPrice: purchasePrice,
                saleprice: salePrice,
                qty: qty,
                commperc: commPerc


            }),
            })
            .then((res) => {
               fetch("http://localhost:3001/products")
                .then((res) => res.json())
                    .then((data) => {
                        setProducts(data)
                    }
                ); 
            })
            .catch((err) => console.log('error'))
    }    

  return (
    <div >
          <div>
            {/* need to make another component for forms */}
            <Form  onSubmit ={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindName}
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
                        type="text" {...bindManufacturer}
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
                        type="text" {...bindStyle}
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
                        type="text" {...bindPurchacePrice}
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
                        type="text" {...bindSalePrice}
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
                        type="text" {...bindQty}
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
                        type="text" {...bindCommPerc}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Jane Doe"
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
                {renderBody()}
            </tbody>
        </Table>  
       </div>
    </div>
  );
}

export default Products;
