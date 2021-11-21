import '../App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';


function Quarterlysales() {

    //state management
    const [qsales, setQSales] = useState(null);

    
    //fetching data
    useEffect(() => {
        fetch("http://localhost:3001/qsales")
      .then((res) => res.json())
          .then((data) => {
            setQSales(data)
          }
           );
    }, []);

    //function to map all values to the table
    const renderBody = () => {

        return qsales && qsales.map(({ total, salesdate, salespersonfirst, salespersonlast }) => {
            let i = Math.floor(Math.random() * 1000+1)
            return (
                <tr key={i} >
                    <td>{salesdate}</td>
                    <td>{salespersonfirst}</td>
                    <td>{salespersonlast}</td>
                    <td>{total}</td>
                </tr>
            )
        })
    }

  return (
    <div >
        <div>
              {/* need to make component for form */}
            {/* creating sale by using id of each table */}
        <Table striped bordered hover>
             <thead>
                <tr>
                    <th colSpan="5">Quarterly Sales</th>
                </tr>
            </thead>   
            <thead>
                <tr>
                    <th>Salesdate</th>
                    <th>salespersonfirst</th>
                    <th>salespersonlast</th>
                    <th>purchaseprice</th>
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

export default Quarterlysales;
