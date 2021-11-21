# Bespoke-bikes
Bespoke Bike is a sales tracking application built with a React front end and Node express.js backend that is hooked up to a Postgres database. 

The three files include:

- client ( this is the client layer of the application initialized with npx create-react-app that contains visualized data in table form)
- bespoke-api (this our middle layer with api endpoints to access the data layer)
- database ( this is where we store our export csv files and sql queries)

How to run

- navigate to the client folder and install with "npm install",  navigate to the bespoke-api folder and run "npm install".
- create a postgres database with the sql queries provided and import the csv files.  Connect the database to the bespoke-api by using a .env files in bespoke-api.  The env parameters that are needed too connect can be found in db.js. 
- navigate to the bespoke-api folder and run command "npm start". The api should start on port 3001.
- In a separate terminal navigate to the client folder and run command "npm start".  The client should start on port 3000.

About the application

- There are 5 tables displayed (salespersons, products, customers, sales, and quarterly sales.
- On top of salespersons and products there are input fields to edit their respective tables.  First and last name of salesperson must exist to edit, and product name must exist to edit.
- On top of sales there are input fields to add a sale, and also an input field to filter by date.

Preview of sales table
(there is a john smith customer and salesperson)

![image](https://user-images.githubusercontent.com/43364244/142774078-b3f9fb0b-50c8-4715-aab9-1a62a947ddf2.png)

Hope you enjoy!


