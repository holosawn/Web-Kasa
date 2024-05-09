import { http, HttpResponse } from 'msw'
import loginPageData from '../Data/LoginPageData.json'
import menuLayoutData from '../Data/MenuLayoutData.json'
import dashboardData from '../Data/DashboardData.json'
import { salesDataHandler } from '../utils/helpers'
import { productArrHandler } from '../utils/helpers'
import wallmartData from "../Data/WallmartCompatibleData.json";
import customerData from '../Data/Customers.json'
import categoryData from '../Data/WallmartCategoryData.json'
import { offers } from '../Data/Offers'

export const handlers = [
    http.get("/Login", ()=>{
        return HttpResponse.json(loginPageData)
    }),
    http.get("/MenuLayoutData", ()=>{
        return HttpResponse.json(menuLayoutData)
    }),
    http.get("/DashboardData/:timeline", (req)=>{
        const timeline = req.params.timeline
        return HttpResponse.json(salesDataHandler(dashboardData[timeline]))
    }),
    http.get("/Products", (req)=>{
        return HttpResponse.json(productArrHandler(wallmartData))
    }),
    http.get("/MarketStatus", ()=>{
        return HttpResponse.json({"marketStatus":true,})
    }),
    http.get("/Offers", ()=>{
        return HttpResponse.json(offers)
    }),
    http.get('/Customers',()=>{
        return HttpResponse.json([...customerData, ...(JSON.parse(localStorage.getItem('customers')) || [])])
    }),
    http.get('/Categories',()=>{
        return HttpResponse.json(categoryData)
    }),
]