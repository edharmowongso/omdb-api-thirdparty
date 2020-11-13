# OMDB API ThirdParty

This is a Node JS application with Express JS as the main framework with a purpose to search a movie based on the given title/id, and also getting the detail of the movie. It integrates with [OMDB API](http://www.omdbapi.com). 
You can access this application through this [link](http://omdb-api-bibit.herokuapp.com)

## Application Structure

- tests: All unit test files goes here
- config: Related to any configuration (express.js, etc.)
- lib: Supporting library
- app/usecase: Contains all related usecase
- app/infrastructure: Routing, middlewares and also container goes here
- app/domain: Third parties and repositories goes here

## Routing

For the current routing, there are two main routes you can access:

#### Search | URL: http://omdb-api-bibit.herokuapp.com/movies

There are several attributes you can pass through the query params. There are:
>
>**q (required)**: It used for filtering movies based on a searched query
>
>**type (optional)**: It used for filtering movies based on movie, series or episode
>
>**year (optional)**: It used for filtering movies based on a specified year
>
>**page (optional)**: It used for returning list of data. By default, it sets to 1

Example:
http://omdb-api-bibit.herokuapp.com/movies?q=Guardians

#### Detail | URL: http://omdb-api-bibit.herokuapp.com/movies/{:movie_id}

There are also several attributes you can pass through the query params for this **Detail** routing. There are:
>
>**movie_id (required)**
>
>**search_by (required)**: It used for filtering movies based on id or title
>
>**type (optional)**: It used for filtering movies based on movie, series or episode
>
>**year (optional)**: It used for filtering movies based on a specified year
>
>**plot (optional)**: It used for filtering movies based on short or full

Example:
http://omdb-api-bibit.herokuapp.com/movies/tt1211837?search_by=id