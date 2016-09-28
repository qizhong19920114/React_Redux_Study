#gitNoteTaker React JS example from Tyler Mcginnis

This example is an ReactJS example using firebase as the database. The app fetches the github repo data based on the search name 
and we can take notes on each repo holder. 



[Tutorial video](https://egghead.io/courses/build-your-first-react-js-application)

### Instructions

```bash
npm install
npm start
```
then open the index.html file

The app should look like this: 

![](http://i.imgur.com/FWPYF3O.png)

and if you search the name: 

![](http://i.imgur.com/uSrwgBB.png)


I did some modification on this example because the new firebase needs a different syntax. I was a little lazy towards the end
when Tyler was taking about refactoring the code to the new ES6 syntax. I didn't do those changes so if you want to know, you 
can refer to the Tyler's original repo (I provided the link below) 

[Tyler Mcginnis's original repo](https://github.com/qizhong19920114/github-notetaker-egghead)

There is a little bug in this app: the note can only be taken for the users that are in the firebase database. One way to fix this but I haven't had a chance to try is to add a new node if the user we search is not in teh firebase database. 

###something about ES6 that was mentioned in this tutorial: 

if you use the ES6 class extend React component but you use "require" instead "import" when you try to use the module, 
you will get this error: 

![](http://i.imgur.com/fRu3jxj.png)

You can use constructor instead of initState if you use the ES6 class extend React Component syntax, here is how it works: 

![](http://i.imgur.com/Ml9hJ7m.png)
