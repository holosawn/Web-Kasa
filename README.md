## Web Pos Application

An application used to make and manage sales for retails, built with React, JavaScript, CSS and Material UI.

## Project Status
Users can log in, make sales by selecting products from categorized data, apply offers and discounts, process payments, add and tag customers and print receipts. There are also dedicated pages for customer management and Z reports, accessible only to admins.

## ScreenShots

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/2b3a1349-e3c4-4d3a-aa8f-ed9bc900a4b8)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/4f73a210-3507-44bd-ae10-bd2ed56f68cf)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/f4ab1ede-b5b3-4aeb-a65a-b7211852753a)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/7a897da2-5193-4d93-b7a2-430373692892)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/7e0dad11-03ed-4247-8805-f53067a99820)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/a573f05b-7452-47cd-98cb-4bca6d47b3c3)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/6e256a75-2634-4176-8afd-516da2e902cd)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/d7dd7c78-eaef-4cb2-9485-ac4f2edb2792)

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

## Reflection

This was a few month long project built for 32 Bit recruitment event. Project goal was completing project with requested functionalities with given tech stack in given time.

During the development of this project, I highly prioritized responsive design to ensure that all pages are usable on any kind of device. Additionally, I was careful about maintaining a good branch-based workflow, creating a branch for every feature and issue with clear and understandable descriptions. I also gave great importance to reusable and modular components to enhance readability and maintainability of the code.

I learned about authorization, ensuring that users can only access authorized features, using Axios with Mock Service Worker (MSW) for API mocking, and implemented localization for Turkish, english and Russian users. I also optimized performance with hooks such as useMemo and useCallback to prevent unnecessary renders. Used lazy loading to reduce bundle size.

Developing this project in general enabled me to think ahead and prevent potential issues in project design. Additionally, I gained more experience with React, which increased my development speed and efficiency.
  
During development, I had issues with MUI charts when adding reference lines to specified values on the Y-axis. Customizing axis ticks didn't work as expected, so I delved into how these values are calculated. Since MUI Charts use D3.js for their underlying logic, I researched the relevant D3.js methods and adapted their value-computation mechanisms to component. It can be said it improved my googling skills.
   
At the end of the day, technologies implemented in this project are React, MUI as component library, axios for requests, i18next for localization , reacp-virtuoso for data visualization, react-simple-keyboard as virtual keyboard and React-Router.
