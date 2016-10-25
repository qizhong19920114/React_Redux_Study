#React Yelp Clone Tutorial

This is a great [tutorial](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/) overall, despite that lots of steps were skipped. There's still a lot take away from the tutorial. 

#Run
```
npm install

npm run start
```
Then go to localhost:3000

#Demo
- Desktop version:
![Imgur](http://imgur.com/D55jSCo.gif)
- Mobile version: 
![Imgur](http://imgur.com/GzzOB7d.gif)


[Here](https://youtu.be/N8z6TuWfOqo) is the link for the video test. 


#Notes: 
- The tutorial did cover the **testing tools** karma, mocha and chai, but it didn't explain well how
- A lot of good examples for css use. 
- I like the trick in this tutorial for displaying the **rating** using the width proterty, and overlap two rows of stars and one has the content width determined by the rating calculation.
![Imgur](http://i.imgur.com/Tibrbno.png)
- If you use **nested router**, you can keep the ```parent content and the children content``` will show besides the parent content when the route is point at the children content.
- We can **pass the reference down as a prop to the child elements** by cloning children and creating a new instance to handle passing down data.React makes this process easy to handle by using the **React.cloneElement()**. ```This is how we pass reference from parent to children in a nested route situation.```
![Imgur](http://i.imgur.com/UJYGcx8.png)
- React router has **push route function** from this.context.router. It's similar to the push routing for react native, it will push us to a new route.
![Imgur](http://i.imgur.com/ANwucAk.png)
- The tutorial talks about how to make the **web responsive!!** It's done by using media query. Media query is a CSS technique introduced in CSS3. It uses the @media rule to include a block of CSS properties only if a certain condition is true.
- Use **flex-direction** and flex so when there is no enough space, the components will auto adjust based on the flex direction.
- We can use the **order attribute** to change the order of the component displayed. Example is in the styles.module.css file, which the small screen, content has order 1 and large screen, content has order 2, which means comes next.
![Imgur](http://i.imgur.com/7gc2z4t.png)
- When it comes to responsive design, we should **consider mobile first** and then laptop, because most of peope use mobile device








