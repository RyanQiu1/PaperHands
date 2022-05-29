# Orbital Apollo Project

## Setup to load React

Installation of react packages.

* Using yarn to install packages
  ```sh
  yarn add react-router-dom
  yarn add react-tradingview-widget or npm install --save react-tradingview-widget
  ```



Ensure that the server is running before starting the client. 

* Using npm to start up both the server and client
  ```sh
  npm start
  ```
  
  
 ## Deployment
 
 * Using Heroku
 * Settle Client
   ```cd client ```
 * Run npm build command
   ```npm run build ```
 * Settle Server
 Make a public folder in the server folder, copy all files from your client/build folder to it
 
 * Download heroku cli app
 * Run 
   ```heroku login```
 * Move to the server folder using CD
   ```git add .```
   ```git commit -m "message"```
   ```git push heroku master```
   
 ### Possible Errors
 - The package-lock and the package.json is not in the same folder in the server folder
 - You need to make a Procfile "file" in the server folder and place
 ```web: node index.js```
 - Add the .env files, or configure directly to heroku
 

  

## Trading Web App
