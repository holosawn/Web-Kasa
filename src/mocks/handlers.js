import { http, HttpResponse } from 'msw'
import MenuLayoutData from '../Data/MenuLayoutData.json'

export const handlers = [
    http.get("/MenuLayoutData", ()=>{
        return HttpResponse.json(MenuLayoutData)
    }),
]