
# PROJECT NAME: Saga Movie Gallery

## Description

_Duration: 2 Day sprint_

    This project was centered around the use of redux and sagas to centralize communication with the server. It also focused on multi-table SQL joins to gather information and manipulate the data being stored. The base functionality includes displaying a responsive gallery, the ability to zoom into a detail page, the ability to add a movie with multiple genres, as well as a dark/light mode toggle, and basic navigation in a top bar.  

## Screen Shot

coming soon


## Installation



1. Create a database named `CREATE DATABASE "saga_movies_weekend"`
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. I recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. Landing page contains a basic menu bar and a gallery of movies
2. Hovering a movie brings it the foreground and clicking on it will bring you to a detailed view of that movie
3. The top button bar can be used to toggle light/dark mode, as well as navigating to home and the add movie page
4. Clicking add movie will bring up a set of inputs to enter movie information including a picture url, a preview is displayed at the bottom
5. The dropdown allows the selection of multiple genres
6. Clicking to add movie will add the movie to the database


## Built With
JavaScript
CSS
HTML
NodeJS
Express
React
Redux
Redux-Sagas
React-Router
Material UI


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality and to my family and the members of the L'Engle cohort (especially Matt for his guidance)

## Support
If you have suggestions or issues, please email me at [kjensen19@gmail.com](www.google.com)
