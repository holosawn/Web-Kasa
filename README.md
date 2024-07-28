**Web Pos Application**
===============================

An application used to make and manage sales for retails, built with React, JavaScript, CSS and Material UI.


## Table of Contents
* [Functionalities](#functionalities)
* [Features](#features)
* [Project Status](#project-status)
* [Pages](#pages)
* [Technologies Used](#technologies-used)
* [Reflection](#reflection)
* [Installation and Setup Instructions](#installation-and-setup-instructions)


## Functionalities
  
 - **Login**:
    - Login via user code and password for secure access

 - **Market Insights**:
    - Dashboard for visualizing market data and key detecting trends

 - **Shift Management**:
    - Managing shift status of market (open/closed/clocked out/clocked in) to control operations

 - **Customer Management**:
    - Adding customers to the system and managing their information
    - Listing and filtering customers

 - **Product Management**:
    - Listing and filtering of products for easy search
    - Adding products to cart for checkout
    - Editing items in cart

 - **Campaigns and Coupons**:
    - Activating campaigns and discounts for sale
    - Activating coupons which some are exclusive customers in system

 - **Payment Processing**:
    - Making payments with cash or card, with simulated payment steps

 - **Sales and Receipts**:
    - Creating and printing receipt of sale for customers
    - Creating and listing Z reports of shift to track operations
  

## Features
  
 - **Authorization**:
    - Token based Aauthorization with roles cashier and admin
    - tokens are created at mocked request handlers

 - **Responsiveness**:
    - Responsive pages for all kinds of screens, including desktop, tablet, and mobile devices

 - **Customization**:
    - Toggling between dark and light themes for a personalized user experience
    - Choosing application language among Turkish, English, and Russian



## Project Status
 - Currently completed but there can be updates in future


## Pages

### Login Page
- **Login**, **Virtual Keyboard**, **Language Select**, **Version Info**
- ![image](https://github.com/holosawn/Web-Kasa/assets/116157920/2b3a1349-e3c4-4d3a-aa8f-ed9bc900a4b8)  

### Menu Page
- **Dashboard with different timelines**, **Navigation sidebar**, **market info from service**
- ![image](https://github.com/holosawn/Web-Kasa/assets/116157920/4f73a210-3507-44bd-ae10-bd2ed56f68cf)

### Sale Page
- **Filterable virtualized product list**, **Recursive categories**, **Campaigns and discount**, **Cart management**, **Customer adding modal**, **Shift managing modal**
- ![image](https://github.com/holosawn/Web-Kasa/assets/116157920/f4ab1ede-b5b3-4aeb-a65a-b7211852753a)

### Products Page
- **Recursive categories**, **Filterable virtualized product list**, **Adding with barcode**
- ![image](https://github.com/holosawn/Web-Kasa/assets/116157920/7a897da2-5193-4d93-b7a2-430373692892)

### Payment Page
- **Cart Items**, **cash or card payments**, **Simulated card payment steps**, **Tagging customer to sale**, **Activating coupons**, **Email modal**, **Receipt on finish**, **Cancel sale**
- ![image](https://github.com/holosawn/Web-Kasa/assets/116157920/7e0dad11-03ed-4247-8805-f53067a99820)

### Settings Page
- **Theme Toggle**, **Language Select**, **Printer test**
- ![image](https://github.com/holosawn/Web-Kasa/assets/116157920/a573f05b-7452-47cd-98cb-4bca6d47b3c3)

### Reports Page
- **Z Reports**, **Filterable list**, **Print report**
- ![image](https://github.com/holosawn/Web-Kasa/assets/116157920/6e256a75-2634-4176-8afd-516da2e902cd)

### Customers Page
- **Filterable Customer List**, **Customer Management**, **Export data as CVS-JSON-SQL**, **Import data as CVS**, **Add customer to system**
- ![image](https://github.com/holosawn/Web-Kasa/assets/116157920/d7dd7c78-eaef-4cb2-9485-ac4f2edb2792)


## Technologies Used
<div style="display: flex; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Material%20Ui-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Virtuoso-00BFFF?&style=for-the-badge&logo=react-virtuoso&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Simple%20Keyboard-61DAFB?&style=for-the-badge&logo=react-simple-keyboard&logoColor=white" />
</div>

## Reflection

During the development of this project, I highly prioritized responsive design to ensure that all pages are usable on any kind of device. Additionally, I was careful about maintaining a good branch-based workflow, creating a branch for every feature and issue with clear and understandable descriptions. I also gave great importance to reusable and modular components to enhance readability and maintainability of the code.

I learned about authorization, ensuring that users can only access authorized features, using Axios with Mock Service Worker (MSW) for API mocking, and implemented localization for Turkish, english and Russian users. I also optimized performance with hooks such as useMemo and useCallback to prevent unnecessary renders. Used lazy loading to reduce bundle size.

Developing this project in general enabled me to think ahead and prevent potential issues in project design. Additionally, I gained more experience with React, which increased my development speed and efficiency.
  
During development, I had issues with MUI charts when adding reference lines to specified values on the Y-axis. Customizing axis ticks didn't work as expected, so I delved into how these values are calculated. Since MUI Charts use D3.js for their underlying logic, I researched the relevant D3.js methods and adapted their value-computation mechanisms to component. It can be said it improved my googling skills.



## Installation and Setup Instructions  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/` or `localhost:3000/login`   
`localhost:3000/menu`  
`localhost:3000/sale`  
`localhost:3000/products`  
`localhost:3000/payment`  
`localhost:3000/settings`  
`localhost:3000/reports`  
`localhost:3000/customers`  



