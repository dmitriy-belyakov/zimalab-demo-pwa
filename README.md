# PWA Demo application

This is PWA application based on Vue.js. It has following features:
QR Code scanner
Image upload and cropping
Forms (purchase a duck) with history of what you submitted
Signature
Working with remote database
Geolocation with showing it on google maps
Offline mode support
Sound on button click
Dark mode

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Notice
When building apache cordova application you must change relative links from '/foo' to 'foo'. You have to do it both in .vue files and in /dist/index.html.

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
