import '../App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useInput } from '../customHooks/addSale';


function Products() {
    const [products, setProducts] = useState(null);
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
                console.log('products',data);
                setProducts(data)
          }
           );
    }, []);
    

    //function to map all values to the table added id for idenitifcation
    const renderBody = () => {
        return products && products.map(({ commperc, id, manufacturer, name, purchaseprice, qtyhand,saleprice, style }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{manufacturer}</td>
                    <td>{style}</td>
                    <td>{purchaseprice}</td>
                    <td>{saleprice}</td>
                    <td>{qtyhand}</td>
                    <td>{commperc}</td>
                </tr>
            )
        })
    }

//once form is submitted create sale
    const handleSubmit = (evt) => {
        evt.preventDefault();

        //create product endpoint, if product does not exist alert message
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
            }).then((res) =>res.json()).then((data) => {
                alert(data.message);
            })
            .then(() => {
               fetch("http://localhost:3001/products")
                .then((res) => res.json())
                   .then((data) => {
                        setProducts(data);
                        resetName();
                        resetManufacturer();
                        resetStyle();
                        resetPurchasePrice();
                        resetSalePrice();
                        resetQty();
                        resetCommPerc();
                    }
                ); 
            })
            .catch((err) => {
               console.log('error',err) 
            } )
        
    }    

  return (
      <div >
          <div className="table-headers">
              Update Products
          </div>
          <div>
            {/* need to make another component for forms and map the form fields */}
            <Form  onSubmit ={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Name
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindName}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Name"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Manufacturer
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindManufacturer}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="manufacturer"
                    />
                    </Col>
                    <Col xs="1">
                    <Form.Label htmlFor="inlineFormInput" >
                        Style
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindStyle}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="style"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Purchase Price
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindPurchacePrice}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="purchaseprice"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        Sales Price
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindSalePrice}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="salePrice"
                    />
                    </Col>
                    <Col xs="1">
                    <Form.Label htmlFor="inlineFormInput" >
                        Qty
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindQty}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="QTY"
                    />
                    </Col>
                    <Col xs="2">
                    <Form.Label htmlFor="inlineFormInput" >
                        CommPerc
                    </Form.Label>
                        <Form.Control
                        type="text" {...bindCommPerc}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="commPerc"
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
                    <th>id</th>
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
