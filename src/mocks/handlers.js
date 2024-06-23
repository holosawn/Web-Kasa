import { http, HttpResponse } from 'msw'
import loginPageData from '../Data/LoginPageData.json'
import menuLayoutData from '../Data/MenuLayoutData.json'
import dashboardData from '../Data/DashboardData.json'
import { salesDataHandler } from '../utils/helpers'
import { productArrHandler } from '../utils/helpers'
import wallmartData from "../Data/WallmartCompatibleData.json";
import customerData from '../Data/Customers.json'
import categoryData from '../Data/WallmartCategoryData.json'
import reportData from '../Data/Reports.json'
import shopBranches from '../Data/ShopBranches.json'
import users from '../Data/Users.json'
import { offers } from '../Data/Offers'
import { verifyToken, generateAccessToken, generateRefreshToken, extractPayloadFromToken } from './AuthHelpers';

const accessSecret = 'access-secret-key';
const refreshSecret = 'refresh-secret-key';


export const handlers = [
  http.get("/login", (req, ) => {
    return HttpResponse.json(loginPageData);
  }),
  
  http.get("/menuLayoutData", (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    return HttpResponse.json(menuLayoutData);
  }),
  
  http.get("/dashboard/:timeline", (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    const timeline = req.params.timeline;
    return HttpResponse.json(salesDataHandler(dashboardData[timeline]));
  }),
  
  http.get("/products", (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    return HttpResponse.json(productArrHandler(wallmartData));
  }),
  
  http.get("/marketStatus", (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    return HttpResponse.json({"marketStatus": true});
  }),
  
  http.get("/offers", (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    return HttpResponse.json(offers);
  }),
  
  http.get('/customers', (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    return HttpResponse.json([...customerData,...(JSON.parse(localStorage.getItem('customers')) || [])]);
  }),
  
  http.get('/categories', (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    return HttpResponse.json(categoryData);
  }),
  
  http.get('/reports', (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    return HttpResponse.json(reportData);
  }),
  
  http.get('/shopBranches', (req, res) => {
    const token = req.request.headers.get('authorization');
    if (!token) {
      return new HttpResponse('Token Expired', {status: 403});
    }
    return HttpResponse.json(shopBranches);
  }),

  http.post('/auth/login', async (req) => {

      const reader = req.request.body.getReader();
      const decoder = new TextDecoder();
      
      let data = '';
      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        data += decoder.decode(value)
      }
  
      data = JSON.parse(data);
      const { userCode, password } = data;
  
      const user = users.find(user => user.userCode === userCode && user.password === password)
  
      if (!user) {
        return new HttpResponse('Unauthorized', { status: 401, error: 'Invalid credentials' });
      }
  
      const accessToken = await generateAccessToken(user, accessSecret);
      const refreshToken = await generateRefreshToken(user, refreshSecret);
  
      localStorage.setItem(`${userCode}ServerAccessToken`, JSON.stringify(accessToken))
      localStorage.setItem(`${userCode}ServerRefreshToken`, JSON.stringify(refreshToken))
  
      return new HttpResponse(
        JSON.stringify({
          user: {
            userCode: user.username,
            role: user.role,
            email: user.email,
          },
          accessToken: accessToken,
        }),
        {
          status: 200,
          headers: { 'Set-Cookie': `refreshToken=${refreshToken};` },
        }
      );
  }),

  http.get('/auth/refresh', async (req) => {
      const accessToken = req.request.headers.get('authorization')
      const refreshToken = req.cookies.refreshToken

      if (accessToken) {
        try {
          const user = await extractPayloadFromToken(refreshToken, refreshSecret);
    
          const newAccessToken = await generateAccessToken(user);
    
          return new HttpResponse({}, {status:200, headers:{'authorization' : newAccessToken}})
        } catch (error) {
          if (error.message === 'Null Token') {
            // console.log('null Token');
            return new HttpResponse('Null Token', { status: 401, });
          } else if (error.message === 'Invalid Signature') {
            // console.log('expired');
            return new HttpResponse('Invalid Signature', { status: 401, });
          } else{
            // console.log(error);
            return new HttpResponse('Internal Server Error', { status: 500, });
          }
        }
      }
      else{
        return new HttpResponse('Null Token', { status: 401, });
      }

  }),

  http.get('/auth/me', async (req) => {

      const token = req.request.headers.get('authorization')
  
      try {
        const verifiedUser = await verifyToken(token, accessSecret);    
        return new HttpResponse(JSON.stringify({userCode: verifiedUser.username, role: verifiedUser.role, email: verifiedUser.email}) , {status:200, headers:{'authorization' : token} })  
      } catch (err) {
        // console.log('hadnler', err);
        if (err.message === 'Null Token') {
          return new HttpResponse('Null Token', { status: 403, });
        } else if (err.message === 'Token Expired') {
          return new HttpResponse('Token Expired', { status: 403, });
        } else if (err.message === 'Invalid Signature') {
          return new HttpResponse('Invalid Signature', { status: 401, });
        } else {
          // console.log(err);
          return new HttpResponse('Internal Server Error', { status: 500 });
        }
      }
  })

]