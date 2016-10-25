#Judo heros isomorphic ReactJS tutorial 

This is a very simple yet very good [tutorial](https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app) that demonstrates the concept of isomorphic. 

##Run: 
There's two version of this, first one is just the client side rendering, the second one is the isomorphic app that involves both the client side rendering and server side rendering. 
```
npm install
```
To run the **first version**, go the the "Version1_Client_side_rendering" folder and then: 
```
NODE_ENV=production node_modules/.bin/webpack -p
node_modules/.bin/http-server src/static
```
The first command generates the bundle.js file, the second command run the fake http server. Then app will be magically available on http://localhost:8080.


To run the **second version**: 
```
NODE_ENV=production node_modules/.bin/babel-node --presets 'react,es2015' src/server.js
```
The app will be available at http://localhost:3000



##Demo: 


##Notes: 
