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
![Imgur](http://i.imgur.com/PrQFRWi.png)

The video demo can be found in this [link](https://youtu.be/zzW5FRw1vUo).

##Isomorphic rendering:
Here comes the **biggest thing** I learned from this tutorial:  Isomorphic rendering!!!

The main point of Isomorphic is to leverage the benefit of both server server side rendering and client side rendering. The server side rendering can give a a faster perceived load time, because the server spit out the whole html page so the browser (client) doesn't have to any javascript work for rendering. Therefore, server side rendering is often used to load a whole page while the client side rendering is used to switch small part the of the web app, say for example in this app, we go from the index page to the detailed athelete page using routing of the front end, and it doesn't take much resource, it just need to download the pic sources. When we first load the whole page, we load the whole html from the server. One special case is if say we are at the athelete detail page, but we hit the refresh, then the browser (client) is gonna go through the server rendering, the reason being that if we hit refresh, it's basically the same as doing a GET method, then server response. Otherwise, if we just switch from pages, there's not GET method involve therefore no server involved, just all client side rendering. It's fast!!!

Here are a few quick demos of the server side rendering and the source loading from the server: 

- When loading the main page using server side rendering: 

![Imgur](http://i.imgur.com/wmmI6ak.png)

- When we go to the athelete detail page and refresh the page, it's triggering the server side rendering: 

![Imgur](http://i.imgur.com/CzbPIhw.png)

- When we use the version one, the pure client rendering, the browser load the basic html template (un-rendered html):

![Imgur](http://i.imgur.com/agRFfCk.png)

##Notes: 
- In the IndexPage.js, we need to pass all the information about the current athlete as props using the JSX spread operator ({...object}). it' like a lazy way of doing name = {atheleteData.name} country = {atheleteData.country} ...

- If we just use the version one without the node server, then if we refresh the page, we will get 404 error since we are using browser history. 

- Server side render also uses ejs template: The only difference with the original HTML file is that we are using the template variable <%- markup -%> inside the #main div in order to include the React markup into the server-generated HTML code.

- This means catch all route in Express: app.get('*', (req, res) => {}

- Some keypoints from a question on Quora why we use server side rendering:
	- Faster perceived load time
	- SEO 
	- Less code maintenance
  
- The match method from react-router is used on the server side. It matches the requested URL (the url from the client side GET method) to the routes module routes. if we got props then we matched a route and can render. the {...renderProps} means spread the input props and pass them to the Router context 

- This site explain more in detail about the server side rendering: https://github.com/reactjs/react-router-tutorial/tree/master/lessons/13-server-rendering

- Remember, the console log run from server is gonna be print out at the terminal; the console log from the client(browser) is going to be print out at the browser console log

- The reason we Isolate the route module is because the route will be used in both server and client; Otherwise, if it's just for the client, I can just put it at the main app js file. 

