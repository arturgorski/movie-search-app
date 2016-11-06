##Movies search application
####Requirements:
- node.js version 6.* or Docker installed
- The Movie DB API key (more information about API key - https://www.themoviedb.org/faq/api)

####To run application
1. Go to `src\app` directory and create `config.js` file from `config.js.dist` template.
Enter your The Movie DB API into created `config.js` file. Created file should look like this: 

 ```
 export const THE_MOVIE_DB_API_KEY = 'put your API key here';
 ```
2. Go to main application directory and install all npm packages with command:

 ```
 npm i
 ```
3. Run application

 ```
 npm start
 ```
4. Open your browser and enter address:
 
 ```
 http://localhost:8080/
 ```
 
If you have docker and docker-compose installed you can omit steps 2 and 3. Instead of this just run 
```
docker-compose up
```
####To run unit tests

Enter `npm test` from within main application directory

####To build application

Run 
```
npm run build
``` 
from within main application directory. Build application should appear on `dist` directory
