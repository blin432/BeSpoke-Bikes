import '../App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useInput } from '../customHooks/addSale';

function Sales() {

    //state management
    const [sales, setSales] = useState(null);
    const { value:product, bind:bindProduct, reset:resetProduct } = useInput('');
    const { value: salesperson, bind: bindSalesperson, reset: resetSalesperson } = useInput('');
    const { value: customer, bind: bindCustomer, reset: resetCustomer } = useInput('');
    const { value: salesDate, bind: bindSalesDate, reset: resetSalesDate } = useInput('');
    const { value: filterdate, bind: bindFilter, reset: resetFilter } = useInput('');
    
    //fetching data
    useEffect(() => {
        fetch("http://localhost:3001/sales")
      .then((res) => res.json())
          .then((data) => {
            setSales(data)
          }
           );
    }, []);

    //function to map all values to the table
    const renderBody = () => {
        return sales && sales.map(({ id, name,customerfirst , customerlast,salesdate, saleprice, salespersonfirst,salespersonlast,commperc }) => {
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{customerfirst}</td>
                    <td>{customerlast}</td>
                    <td>{salesdate}</td>
                    <td>{saleprice}</td>
                    <td>{salespersonfirst}</td>
                    <td>{salespersonlast}</td>
                    <td>{commperc}</td>
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
            .then((res) => {
               fetch("http://localhost:3001/sales")
                .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setSales(data);
                        resetProduct();
                        resetSalesperson();
                        resetCustomer();
                        resetSalesDate();
                    }
                ); 
            })
            .catch((err) => console.log('error'))
    }

   //filter by date
    const handleFilter = (evt) => {
        evt.preventDefault();
        //create sale endpoint
        fetch(`http://localhost:3001/sales/filterByDate/${filterdate}`)
      .then((res) => res.json())
          .then((data) => {
              setSales(data);
              resetFilter();
          }
           );
    }

  return (
      <div >
          <div className="table-headers">
              Update Sales
          </div>
        <div>
            {/* need to make another component for forms and map the form fields */}
            {/* creating sale by using id of each table */}
            <Form onSubmit ={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="3">
                    <Form.Label htmlFor="inlineFormInput" >
                        Product
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindProduct}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Integer"
                    />
                    </Col>
                    <Col xs="3">
                    <Form.Label htmlFor="inlineFormInput" >
                        Salesperson
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindSalesperson}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Integer"
                    />
                    </Col>
                    <Col xs="3">
                    <Form.Label htmlFor="inlineFormInput" >
                        Customer
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindCustomer}      
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Integer"
                    />
                    </Col>
                    <Col xs="3">
                    <Form.Label htmlFor="inlineFormInput" >
                        Sales Date
                    </Form.Label>
                    <Form.Control
                        type="text" {...bindSalesDate}             
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="01-01-2021"
                    />
                    </Col>
                    <Col xs="auto">
                    <Button type="submit" value= 'Submit' className="mb-2">
                        Submit
                    </Button>
                    </Col>
                </Row>
              </Form>
              <div className="table-headers">
                  FilterDate
              </div>
            <Form onSubmit ={handleFilter} >
                <Row className="align-items-center">
                    <Col xs="3">
                    <Form.Control
                        type="text" {...bindFilter}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="01-22-2021"
                    />
                    </Col>
                    <Col xs="2">
                    <Button type="submit" value= 'Submit' className = "mb-2" >
                        FilterByDate
                    </Button>
                    </Col>
                </Row>
            </Form>
             
        <Table striped bordered hover>
             <thead>
                <tr>
                    <th colSpan="5">Sales</th>
                </tr>
            </thead>   
            <thead>
                <tr>
                    <th>ProductName</th>
                    <th>Customer first</th>
                    <th>Customer last</th>
                    <th>Salesdate</th>
                    <th>saleprice</th>
                    <th>salespersonfirst</th>
                    <th>salespersonlast</th>
                    <th>commperc</th>      
                    
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
