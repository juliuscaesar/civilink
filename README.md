# Installation
1. Clone the repo
2. Run `npm install` in root, app, and client to install dependencies
3. Run `npm start` in the root directory and you should see the following:

```
[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node app/server.js`
➜ 🌎  Back end server is running on port 3001.
➜ 🍊  MongoDB connection successful
Starting the development server...
```
4. If you get any dependency errors, install them individually by running `npm install <dependency>`
5. Run `npm start` again and repeat until no dependency errors.

# MongoDB
If you're receiving an error about Mongo not starting up, you may just need to start it again. If you don't have this set up simply then:

1. cd into your mongodb folder
2. `cd bin`
3. Run `./mongo` and `./mongod`
