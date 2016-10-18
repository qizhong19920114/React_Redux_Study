#ExpressJS Fundamental Tutorial
This is a [tutorial](https://egghead.io/courses/getting-started-with-express-js) from EggheadIO. The tutorial convers a lot of good concepts and materials. 

##Run:
* From tutorial 1 - 9 , we can just do: 
```
npm run dev
```
* To run the last two tutorials, we need mongodb. so open two seperate terminal: 
```
sudo mongod
```

then once the database is started: 
```
mongoimport --db test --collection users --drop --file user_list.json

npm run dev
```

* go to localhost:3000 to view the web app

##App Demo:

![Imgur](http://imgur.com/GC3oHA5.gif)

[Here](https://youtu.be/Z0ZVwlJuYIA) is the link for the video test. 

##Topics covered: 
 1. Basic setup
 2. Basic routing
 3. Templating
 4. Read static file
 5. Http Methods
 6. Advance routing
 7. Routing organizing
 8. JSON streams
 9. Middleware
 10. MongoDB and Mongoose
 11. Mongoose virtual property
