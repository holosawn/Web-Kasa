import { http, HttpResponse } from 'msw'
import LoginPageData from '../Data/LoginPageData.json'
import MenuLayoutData from '../Data/MenuLayoutData.json'
import DashboardData from '../Data/DashboardData.json'
import salesDataHandler from '../utils/API/salesDataHandler'

export const handlers = [
    http.get("/", ()=>{
        return HttpResponse.json(LoginPageData)
    }),
    http.get("/MenuLayoutData", ()=>{
        return HttpResponse.json(MenuLayoutData)
    }),
    http.get("/DashboardData/:timeline", (req)=>{
        const timeline = req.params.timeline
        return HttpResponse.json(salesDataHandler(DashboardData[timeline]))
    }),
]