#React Yelp Clone Tutorial

This is a long ass tutorial I need to follow, I may encouner some difficults in the process but I will do my best to figure it out. I will take may notes along the way because the tutorial is just too long

- It's a little weird the tutorial is using webpack-hjs, which makes a lot of things different. 
- **Font Awesome** is a cool library to have to display rating stars
- I like the part in the code that talks about test (karma, chai, mocha); Well, the setup is the pain the butt
- I don't like how a big portion of this is just config ...
- Finally get to routing, some errors in the router section. the class getter should have "get" keyword 
- A lot of css part I'm not quote familiar with. CSS part could be my weakness
- The tutorial missed a big part of Item, Listing and Rating
- I like the trick here for displaying the rating using width proterty, and overlap two rows of stars and one has the content width determined by the rating calculation. 
- If you use **nested router**, you can keep the parent content and the children content will show besides the parent content when the route is point at the children content
- We can pass the reference down as a prop to the child elements by cloning children and creating a new instance to handle passing down data.React makes this process easy to handle by using the **React.cloneElement()**. ```This is how we pass reference from parent to children in a nested route situation.``` 
- React router has **push function** from this.context.router. It's similar to the push routing for react native, it will push us to a new route. 
- Got stuck at show Detail for half hour realize that we can set the visibility in the Map component and there's routing issue that the tutorial didn't mention. Anyways, got it work to a point we can display details
- The tutorial talks about how to make the web **responsive**!! It's done by using media query. **Media query** is a CSS technique introduced in CSS3. It uses the @media rule to include a block of CSS properties only if a certain condition is true.
- Use **flex-direction** and flex so when there is no enough space, the components will auto adjust based on the flex direction. 
- We can use the **order attribute** to change the order of the component displayed. Example is in the styles.module.css file, which the small screen, content has order 1 and large screen, content has order 2, which means comes next.  
- When it comes to responsive design, we should consider mobile first and then laptop, because most of peope use mobile device
- I'm running out of the time. If I had more time I will add get current location to the this app, so it's not default center at San Francisco (This is a whole new [tutorial](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#) talks about it)
