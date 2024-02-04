# FWK23S - Grupp 2 - Auth, Backend & Frontend Server.

![project_structure](https://github.com/hallstrom91/fwk23s-grupp2-project/assets/143492796/b11f6c97-f617-4132-9dc0-1ef0f883ba8c)

## Run Complete Project:

### `Auth and Backend Servers:`
- You can find the Auth Server here:
```Auth
https://github.com/hallstrom91/fwk23s-grupp2-auth.git
```

- You can find the Backend Server here:
```Backend
https://github.com/Feridali/fwk23-grupp2-backend.git
```

- You can find the Frontend Server here:
```Frontend
https://github.com/hallstrom91/fwk23s-grupp2-frontend.git
```

## TTFHW Complete Project - 10-15min
- More detailed instructions inside specific repositories / root folders of all servers.

```NOTES
HOW TO RUN COMPLETE PROJECT:
You will have to add the same JWT_SECRET in .env file of the Auth Server & Backend Server.
So the Auth Server can assign JWT to user at login and Backend Server can verify when fetching data.
You will have to run "npm install" in the root folder of all three servers to get the correct node_modules for all servers.
```
## Functions - Backend & Auth Server
`1. Jsonwebtoken - authentication and authoriziation:`
- JWT is used to verify users and to determine user roles.
- Users token is stored in httpOnly cookie.
  
`2. Helmet - To protect from multiple attacks such as:`
- Cross-Site Scripting (XSS) 
- Clickjacking 
- Man-in-the-middle 
- Cross-site Request Forgery
- DNS Prefetch Control
- Content-Type Sniffin

`3. CORS - Resource Sharing:`
- Cors is used to control and restrict cross-origin requests.
- Cors allows applications on one domain to make request for resources from a different origin / domain.
- Cors also prevents CSRF and XSS attacks.

`4. DOTENV - Environment Variables:`
- dotenv is used to store and access sensitive information.
- dotenv is used to avoid storing configuration details inside of source code.
- JWT Secret is stored inside of .ENV file.

`5. Rate-Limit - Controls rate of incoming requests:`
- Helps to protect from brute-force attacks.
- Helps protect server resources.
- Helps to ensure fair usage of resources between users.

