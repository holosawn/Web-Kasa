## Web Pos App

An application used to make and manage sales for retails, built with React, JavaScript, CSS and Material UI.

## Project Status
Completed but there will be features added very soon. User currently can login, make sales by choosing products among categorized data and tag offers and discounts and make payments, add and tag customers, print receipts.

## Project Screen Shot(s)



## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/` or `localhost:3000/Login`   
`localhost:3000/Menu`  
`localhost:3000/Sale`  
`localhost:3000/Products`  
`localhost:3000/Payment`  
`localhost:3000/Settings`  

## ScreenShots

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/2b3a1349-e3c4-4d3a-aa8f-ed9bc900a4b8)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/4f73a210-3507-44bd-ae10-bd2ed56f68cf)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/f4ab1ede-b5b3-4aeb-a65a-b7211852753a)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/7a897da2-5193-4d93-b7a2-430373692892)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/7e0dad11-03ed-4247-8805-f53067a99820)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/a573f05b-7452-47cd-98cb-4bca6d47b3c3)


## Reflection

This was a few month long project built for 32 Bit recruitment event. Project goal was completing project with requested functionalities with given tech stack in given time . 
  
During this project I had problems with adding reference lines to specified values in y axis. Customizing ticks in axis doesn't rowk as I expected so I dive into how these values are computed. MUI charts are using D3.js for that so researched related methods in D3.js and copied the mechanisms for computing same values with MUI charts. It can be said it improved my googling skills.
  
I also had challenges with customizing appearence of MUI charts as the way I desire. I spent some time with them but I managed to customize with by passing right props and modifying right classes. I also had problems with responsiveness when different amounts of data displayed. I tried to fix this by customizing charts but I ended up adding a customized wrapper component. It pushed me to do more than regular appearence customizations and made me think how can I solve this problem.

I also had some problems with positioning of and general customization sidebar. Instead of using Drawer component from MUI I wanted to built it from scratch. I spent some time with it so that I can improve my skills with customizing components.

During develpoment I wanted to use product data of wallmart for my project but images of dataset were too heavy for listing. I tried different techniques and libraries for optimizing them but they were not enough so I used a random image generator api with small images in an optimized format like webp.
   
At the end of the day, technologies implemented in this project are React, MUI as component library, axios for requests, i18next for localization , reacp-virtuoso for data visualization, react-simple-keyboard as virtual keyboard and React-Router.
