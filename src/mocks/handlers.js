import { http, HttpResponse } from 'msw'
import LoginPageData from '../Data/LoginPageData.json'

export const handlers = [
    http.get("/", ()=>{
        return HttpResponse.json(LoginPageData)
    }),
]