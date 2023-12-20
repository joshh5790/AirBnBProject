# Air Bee-n-bee

Air Bee-n-bee is a lightweight Airbnb clone with a curated collection of short-term homestays and rental experiences. It also implements the Google Maps API to view the location of the property. It was built using **Node.js, Express, Sequelize, Sqlite3, React, Redux, HTML, CSS, Git, and JavaScript**.

## Features

+ Create User
+ Get User
+ Edit User
+ Delete User
+ Create Spot
+ Get Spot
+ Edit Spot
+ Delete Spot
+ Create Review
+ Get Review
+ Edit Review
+ Delete Review
+ Create SpotImage
+ Get SpotImage
+ Delete SpotImage

## How to Setup the Application

1. Download the `.zip` file and unzip it or run `git clone https://github.com/joshh5790/AirBnBProject` in your terminal.

2. **How to set up your .env file in the backend directory**:

+ Option 1: `cd` into the backend folder in your terminal and make a copy of the .env.example file using `cp .env.example .env`. In the newly created `.env` file, change the variable marked with `<<>>`. Generate a strong secret. You can run `openssl rand -base64 10` if you have `openssl` installed in your Ubuntu / MacOS shell to generate a random JWT secret. Alternatively, you can run `require('crypto').randomBytes(64).toString('hex')` in Node. Include your own Google Maps API key in the MAPS_API_KEY variable.

+ Option 2: In Visual Studio Code, make a new `.env` file in the backend folder. Copy everything in the `.env.example` file and paste it in your newly created `.env` file. Change the variable marked with `<<>>`. Generate a strong secret. You can run `openssl rand -base64 10` if you have `openssl` installed in your Ubuntu / MacOS shell to generate a random JWT secret. Alternatively, you can run `require('crypto').randomBytes(64).toString('hex')` in Node. Include your own Google Maps API key in the MAPS_API_KEY variable.

3. **How to run npm install in both the frontend and backend**:

    Open two separate terminals. In one terminal, `cd` into the backend folder. Run `npm i` or `npm install`.

    In another terminal, `cd` into the frontend folder. Run `npm i` or `npm install`.

4. **How to migrate and seed the database**:

    In your backend terminal, run the command `npx dotenv sequelize db:migrate` and then the command `npx dotenv sequelize db:seed:all`.

5. **How to start both the backend and frontend servers**:

    In your backend and frontend terminals, run `npm start`.
