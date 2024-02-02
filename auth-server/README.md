# FWK23S - Grupp 2 - Authentication Server.

## Run Complete Project:

### `Backend and Frontend Servers:`
- You can find the Backend Server here:
```Backend
https://github.com/Feridali/fwk23-grupp2-backend.git
```

- You can find the Frontend Server here:
```
https://github.com/hallstrom91/fwk23s-grupp2-frontend.git
```

```NOTES
HOW TO RUN COMPLETE PROJECT:
You will have to add the same JWT_SECRET in .env file of the Backend Server.
So the Backend Server can verify the users token and fetch secret data depending on user role.
```

## TTFHW Auth Server - 5min

### `Auth Setup:`
- Git clone https://github.com/hallstrom91/fwk23s-grupp2-auth.git
- Go to the root folder of the project and run "npm install" in the terminal to get all correct node_modules.
- Create .env file in root folder of project, add a cryptokey to JWT_SECRET & PORT to .env config file.

```CREATEJWT
CREATE JWT SECRET IN TERMINAL:
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
  
```.ENV
ADD FOLLOWING BELOW TO AUTHSERVER'S .ENV FILE:
JWT_SECRET=ADDCRYPTOKEY
PORT=3001
```

### `How to start the Auth Server:`
- You can now run "npm start" in the root folder of auth server to start the Authentication Server.

#### `Run Complete Project:`
- You will need to add both Backend and Frontend Servers to run the complete project.
- Run Frontend Server on PORT=3000
- Run Auth Server on PORT=3001
- Run Backend Server on PORT=3002
- .ENV file in both Auth & Backend Server, both containing the same JWT_SECRET.
