
#gitNoteTaker React Naitve example from eggheadIO

##Intro
This project is from the react native [tutorial](https://egghead.io/courses/react-native-fundamentals) from egghearIO .

It's similar to the reactJS tutorial but the firebase access part is slightly different. Instead of using the firebase recommended way for web dev, this tutorial use the traditional REST fetch methods. React native seems to be a little easier than reactJS from my point of view. 

I tested the app on both iphone and simulator and they work fine. 

##Run
Here is how you can run and test the app. open the .xcodeproj file in the ios folder with XCode and Run the app. The app will be launched on the simulator. 

You can also launch the debugger on your chrome browser. Cmd+D on the simulator to show the menu and you can choose to use the remote debugger which is the Chrome browser debugger. Cmd+R on the simulator will Reload the app for you. It's a good feature to use when you make some change on your code. 

![](http://imgur.com/0R3aUxq.gif)


[Here](https://youtu.be/zVtSmmIdCC8) is the link for the full feature test. 


##Notice
* One small thing I notice from interface with firebase is that the fetch methods, since it's not the official recommended way, it will create random string for index number for the note items rather than just numbers in order.

* I have to change the **Allow Arbitrary** Loads under the **AppTransport Security Settings** in **info.plist** file in order for iOS to do the fetch method 
[link](http://stackoverflow.com/questions/31254725/transport-security-has-blocked-a-cleartext-http).


![](http://i.stack.imgur.com/LqXFE.png)

* When I uploaded the app to my phone, I realize the keyboard will cover the input box so I did some research and decided to use **keyboardspacer** to fix the issue (here is the [link](https://github.com/Andr3wHur5t/react-native-keyboard-spacer)).


##Info
* I used a developer account to upload the app to my iphone (click [here](https://github.com/qizhong19920114/React_Redux_Study/blob/master/gitNoteTaker_iOS/Instruction.md) for more instructions). Credit **Haoyu Wang** for the Apple Developer Account. 

* If you want to know how to start a React Native iOS app, you can head to the react native get started [page](https://facebook.github.io/react-native/docs/getting-started.html).

* There's some ES6 syntax involved. A lot of arrow functions are used. One benefit of arrow function is the synctax so we don't need to use bind(this) in the call back function (unless it's in the component attribute assignment then we have to). For more information about arrow, refer to [this](http://exploringjs.com/es6/ch_arrow-functions.html) article. 












