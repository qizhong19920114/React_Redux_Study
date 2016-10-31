# RSD Portal App

This is a practice app I developed that so I can access three RSD I purchased easier. It took me almost 2 days but I got it done. 

## Run (in simulator):
- open Xcode, make sure you set the Allow Arbitrary Loads to Yes, and hit the trianble run button

## Demo:

![Imgur](http://i.imgur.com/kLoZjcQ.gif)

The full demo can be found in this [link](https://youtu.be/buVnTtBPC2M)

## Notes: 

- It seems like you must use style or it won't render the component.

- borderRadius is what makes the square with the round edge.

- I was initually having issue upload app to the phone but then once I update the Xcode, and my phone to 10.1 and make sure I clean my project in XCode and set target to 10.1, it works now.  

- When upload the file to the phone, the xcode keep saying team not assign, then I realize it's not team not assigned for the "RSD_Portal" but team not assign for the "RSD_PortalTests". The default test file is not assign. 

- The default test file is also part of the built process, that's why last night when I was trying to run the app without my phone connect to my computer and it won't work. So here is how you solve it. Go to Product --> Scheme --> Edit Scheme.
Uncheck the RSD_PortalTests. Then it should work. 

- Make sure "Allow Arbitrary Loads" is enabled other wise the web and the picture won't load. 

## Todos: 

- Add a notice when there is not internet, remind user to connect to internet. Even the button icon image is from the internet. 
- The style I did was really messy. I'm currently just throw in random numbers to make sure the icon fits but the right way to do would be to use flex and center. 
