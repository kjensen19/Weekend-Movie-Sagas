const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

  //Get all movies and genres by joining tables in query
router.get('/', (req, res) => {
  const query = ` 
  SELECT 
    movies.id,
    title,
    poster, 
    description,
    ARRAY_AGG (genres.name) 
  FROM movies
    join movies_genres on movies_genres.movie_id=movies.id
    join genres on genres.id=movies_genres.genre_id
    group by movies.id
      order by id asc;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});
  //Get all detailed information for specific movie by id
router.get('/:id', (req, res) => {
  const sqlText = `
    SELECT 
      movies.id,
      title,
      poster, 
      description,
      ARRAY_AGG (genres.name) 
    FROM movies
      join movies_genres on movies_genres.movie_id=movies.id
      join genres on genres.id=movies_genres.genre_id
    where movies.id=$1
      group by movies.id;
  `
  pool.query(sqlText,[req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
  })
})
  //POST first insert into movie table and return id
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id
    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      //We use this query inside the for loop for each insert
      console.log('genres', req.body.genre)
      //Loop through all the assigned genres to get the genre id
      //then use above query to insert based on the return
      for(let genre of req.body.genre){
        const genQuery= `
          select id from genres
          where genres.name=$1;`
          const genVal=[genre]
          console.log('genVal', genVal)
          pool.query(genQuery, genVal).then(result => {
            console.log('rez???', result.rows[0].id)
            pool.query(insertMovieGenreQuery, [createdMovieId, result.rows[0].id]).then(result => {

          })})}
      
        //Now that both are done, send back success!
        // res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;