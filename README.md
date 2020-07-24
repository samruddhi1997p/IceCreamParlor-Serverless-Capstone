# FrostBite Serverless Application

Frostbite is a serverless application built for an ice cream parlor where a user can login, check the menu and place an order. The application is using AWS Lambda, Serverless Framework and REACT.

# Functionality of the application

This application will allow user place an order and view it in the MyOrder section. The user can edit as well as delete the order.



# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.

# Postman collection

An alternative way to test your API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.



Sample Image:

![Alt text](Output/WorkingApp.png?raw=true "Image 1")


