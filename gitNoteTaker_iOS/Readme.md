
#gitNoteTaker React Naitve example from eggheadIO

This project is from the react native [tutorial](https://egghead.io/courses/react-native-fundamentals) from egghearIO .

It's similar to the reactJS tutorial but the firebase access part is slightly different. Instead of using the firebase recommended way for web dev, this tutorial use the traditional REST fetch methods. React native seems to be a little easier than reactJS from my point of view. 

I tested the app on both iphone and simulator and they work fine. 

One small thing I notice from interface with firebase is that the fetch methods, since it's not the official recommended way, it will create random string for index number for the note items rather than just numbers in order.

I have to change the Allow Arbitrary Loads under the AppTransport Security Settings in info.plist file in order for iOS to do the fetch method. 
[link](http://stackoverflow.com/questions/31254725/transport-security-has-blocked-a-cleartext-http)

![](http://i.stack.imgur.com/LqXFE.png)




I used a developer account to upload the app to my iphone (click [here](https://github.com/qizhong19920114/React_Redux_Study/blob/master/gitNoteTaker_iOS/Instruction.md) for more instructions). Credit Haoyu Wang for the Apple Developer Account. 

When I uploaded the app to my phone, I realize the keyboard will cover the input box so I did some research and decided to use keyboard spacer to fix the issue (here is the [link](https://github.com/Andr3wHur5t/react-native-keyboard-spacer)).

If you want to know how to start a React Native iOS app, you can head to the react native get started [page](https://facebook.github.io/react-native/docs/getting-started.html).
