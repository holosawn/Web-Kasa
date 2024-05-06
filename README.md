## Web Pos Application

An application used to make and manage sales for retails, built with React, JavaScript, CSS and Material UI.

## Project Status
Although completed, new features will be added soon. At present, users can log in, make sales by selecting products from categorized data, apply offers and discounts, process payments, add and tag customers, and print receipts.

## ScreenShots

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/2b3a1349-e3c4-4d3a-aa8f-ed9bc900a4b8)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/4f73a210-3507-44bd-ae10-bd2ed56f68cf)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/f4ab1ede-b5b3-4aeb-a65a-b7211852753a)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/7a897da2-5193-4d93-b7a2-430373692892)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/7e0dad11-03ed-4247-8805-f53067a99820)

![image](https://github.com/holosawn/Web-Kasa/assets/116157920/a573f05b-7452-47cd-98cb-4bca6d47b3c3)


## Installation and Setup Instructions  

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

## Reflection

This was a few month long project built for 32 Bit recruitment event. Project goal was completing project with requested functionalities with given tech stack in given time . 
  
One of the main issues I encountered was adding reference lines to specified values on the Y-axis. Customizing axis ticks didn't work as expected, so I delved into how these values are calculated. Since MUI Charts use D3.js for their underlying logic, I researched the relevant D3.js methods and adapted their value-computation mechanisms to component. It can be said it improved my googling skills.
  
Another challenge was customizing the appearance of MUI Charts to meet my design goals. I spent some time with them but I managed to customize with by passing right props and modifying right classes. I also had problems with responsiveness when different amounts of data displayed. I tried to fix this by customizing charts but I ended up adding a customized wrapper component. It pushed me to do more than regular appearence customizations and made me think how can I solve a problem.

I also had some problems with positioning of and general customization sidebar. Instead of using Drawer component from MUI I wanted to built it from scratch. So that I improved my skills with component customization and layout.

During development, I intended to use product data from Walmart, but the image files in the dataset were too large for efficient listing. I tried various optimization techniques and libraries without success. Ultimately, I used a random image generator API that provided smaller, optimized images in WebP format.
   
At the end of the day, technologies implemented in this project are React, MUI as component library, axios for requests, i18next for localization , reacp-virtuoso for data visualization, react-simple-keyboard as virtual keyboard and React-Router.
