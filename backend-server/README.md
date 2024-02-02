# FWK23S - Grupp 2 - Backend Server.

## Run Complete Project:

### `Auth and Frontend Servers:`
- You can find the Auth Server here:
```Auth
https://github.com/hallstrom91/fwk23s-grupp2-auth.git
```
- You can find the Frontend Server here:
```Frontend
https://github.com/hallstrom91/fwk23s-grupp2-frontend.git
```

```NOTES
HOW TO RUN COMPLETE PROJECT:
You will have to add the same JWT_SECRET in .env file of the Auth Server.
So the Auth Server can assign JWT to user at login.
```

## TTFHW Backend Server - 5min

### `Backend Setup:`
- Git clone https://github.com/Feridali/fwk23-grupp2-backend.git
- Go to the root folder of the project and run "npm install" in the terminal to get all correct node_modules.
- Create .env file in root folder of project, add a cryptokey to JWT_SECRET & PORT to .env config file.

```.ENV
ADD FOLLOWING BELOW TO BACKEND'S .ENV FILE:
JWT_SECRET=SAME KEY AS AUTH SERVER
PORT=3002
```

### `How to start the Backend Server:`
- You can now run "npm start" in the root folder to start the Backend Server.

#### `Run Complete Project:`
- You will need to add both Auth and Frontend Servers to run the complete project.
- Run Frontend Server on PORT=3000
- Run Auth Server on PORT=3001
- Run Backend Server on PORT=3002
- .ENV file in both Auth & Backend Server, both containing the same JWT_SECRET.

