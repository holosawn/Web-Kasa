import { http, HttpResponse } from 'msw'
import LoginPageData from '../Data/LoginPageData.json'
import MenuLayoutData from '../Data/MenuLayoutData.json'
import DashboardData from '../Data/DashboardData.json'
import salesDataHandler from '../utils/API/salesDataHandler'
import { productArrHandler } from '../utils/helpers'
import wallmartData from "../Data/WallmartCompatibleData.json";


export const handlers = [
    http.get("/Login", ()=>{
        return HttpResponse.json(LoginPageData)
    }),
    http.get("/MenuLayoutData", ()=>{
        return HttpResponse.json(MenuLayoutData)
    }),
    http.get("/DashboardData/:timeline", (req)=>{
        const timeline = req.params.timeline
        return HttpResponse.json(salesDataHandler(DashboardData[timeline]))
    }),
    http.get("/Products", (req)=>{
        return HttpResponse.json(productArrHandler(wallmartData))
    })
]