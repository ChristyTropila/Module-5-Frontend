# Spot-A-Potty

My final project at Flatiron. Spot-A-Potty is a bathroom hosting platform to help users find a bathroom quickly Users can also choose to host their bathroom for other users to use.
This project was built with a Ruby on Rails backend and React.js frontend. 
This project integrates everything I have learned in the last 5 months at Flatiron including:

 * Design and architect features across frontend and backend
 * Communicate and collaborate in a technical environment
 * Build and iterate on a project MVP
 * Debug issues in small- to medium-sized projects
 * Integrate React.js and Rails
 
 Spot-A-Potty uses a Google Map Geolocation API to get the current location of the user. A user can perform full CRUD functionality and has the ability to send messages with the implementation of Action Cable in my backend. I set up user oAuth to verify who is logged in for a better user experience. 

# How to play
# You must clone the backend to this project as well!!
https://github.com/ChristyTropila/Module-5-Backend/tree/dev

1) Clone both repos to your local computer
2) CD into backend repo and and open up a text editor of your choice
3) In terminal run the following commands
4) bundle install  -install gems
5) rails db:migrate -add migrations to data tables
6) rails db:seed -seed the program with seeded data
7) rails s -p 5000 start up the server
8) Open up the frontend repo and run npm install
9) After installation, start up the server and run npm start
10) Open up a tab in your browser and navigate to "http://localhost:3000/login"


# Stack and Gems used
* Visual Studio Code
* PostgresSQL
* Rails as an API
* React.js
* HTML/CSS
* ActiveRecord
* google-maps-react
* Google maps geolocation
* Google maps places autocomplete
* Google Fonts
* rack-cors
* active_model_serializers
* react-router-dom
* bcrypt
