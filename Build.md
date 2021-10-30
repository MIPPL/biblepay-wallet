## Prerequisites

0. own a mac running at least Mojave
1. follow instructions on https://reactnative.dev/docs/environment-setup (react-native cli NOT expo)
2. Install yarn (https://yarnpkg.com/getting-started/install)
3. clone this repo
4. edit the bitcore-lib package in package.json in root folder (you will need a github access token for the repo), it should look like this afterwards git+https://d98984a12341d39ca1d8f05dfead412893218412:x-oauth-basic@github.com/crptec/bitcore-lib-sin.git
5. Open terminal, Navigate into the folder and enter "yarn" 
6. navigate to the ios folder and run "pod install"

## Build (Debug)

### iOS: 
run "npx react-native run-ios" in root folder

### Android:
run "npx react-native run-android" in root folder

## Build (Production)

### iOS: 
1. open biblepayWallet.xcworkspace in ios folder with xCode
2. select Generic iOS Device at the top (besides the app icon)
3. select Product->clean build folder
4. select Product->archive

### Android: 
1. Open terminal, Navigate into the android folder and enter "./gradlew clean"
2. enter "cd .." and then "npx jetify"
3. enter "cd android/" and then "./gradlew app:assembleRelease"
4. apk can be found under /android/app/build/outputs/apk/
