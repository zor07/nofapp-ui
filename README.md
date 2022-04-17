# nofapp-ui

## [Live demo](https://nofapp-ui.herokuapp.com/)
login: `demo`\
password: `demo`

## Description

This react application is a self development tool.\
It's still work in progress.\
Backend part is located here: [nofapp-backend](https://github.com/zor07/nofapp).\
This application has three pages.

* Timer page, where multiple timers can be set and ran.
* Diary page, where user can write to his diary using rich text editor.
* And WIP Practices page

## Technologies
* [Typescript](https://www.typescriptlang.org/)
* [React Redux](https://react-redux.js.org/)
* [Ant Design](https://ant.design/)
* [Remirror](https://remirror.io/)
* [axios](https://github.com/axios/axios)

## Requirements
For building and running the application you need:
* [Node 14 or higher](https://nodejs.org/en/)
* [npm 5.2 or higher](https://nodejs.org/en/)

## Running the application locally

1. Make sure backend application server is running 
2. Make sure `REACT_APP_API_URL_DEV` env variable is set correctly
3. Install dependencies with:\
   `npm instal`
4. Run the app in the development mode:\
   `npm start`   
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Deploying the application to Heroku
The easiest way to deploy the sample application to Heroku is to push commit to `release` branch.

Application on heroku: https://nofapp-ui.herokuapp.com/