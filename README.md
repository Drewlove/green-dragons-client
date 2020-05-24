
# Name: Green Dragons App 
* **Live Link:** https://green-dragons-client-master.now.sh/
* **Client Repo:** https://github.com/Drewlove/green-dragons-client
* **API Repo:** https://github.com/Drewlove/green-dragons-api

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary
This app is a prototype made for the administrative staff of Green Dragons Inc.

The app consolidates student information and other dynamic pieces of the Green Dragons Program.

Admin can create, edit, and delete communities, subcommunities, challenges, students, and the following student information:
* Profiles
* Communities
* Transactions
* Challenge Entries

## API Documentation
API Repo: https://github.com/Drewlove/green-dragons-api

### Tables and HTTP Requests
Request are made to the root url of: https://warm-ocean-22527.herokuapp.com/api/*ENDPOINT*

*ENDPOINT* is the pluralized form of each table

| Table                | Endpoint               |
| -----------          | -----------            |
| student              | students               |
| challenge            | challenges             |
| community            | communities            |
| subcommunity         | subcommunities         |
| exchange             | exchanges              |
| challenge_entry      | challenge-entries      |
| student_subcommunity | student-subcommunities |

### HTTP Request Examples
**HTTP Request:** GET <br />       
**URL:** https://warm-ocean-22527.herokuapp.com/api/students                     
**RESULT:** returns a list of all students from the student table             

**HTTP Request:** GET                    
**URL:** https://warm-ocean-22527.herokuapp.com/api/students/1                     
**RESULT:** returns an individual row from the student table with the student_id of 1             

**HTTP Request:** PATCH                    
**URL:** https://warm-ocean-22527.herokuapp.com/api/students/1                     
**RESULT:** updates an individual row from the student table with the student_id of 1             

**HTTP Request:** POST                    
**URL:** https://warm-ocean-22527.herokuapp.com/api/students/             
**RESULT:** creates a new row in the student table             

**HTTP Request:** DELETE       
**URL:** https://warm-ocean-22527.herokuapp.com/api/students/1                    
**RESULT:** deletes an individual row from the student table with the student_id of 1             


### HTTP Request Examples, Rows with Foreign Keys and Parent\Child Relationships

The tables below have one or more foreign keys. 

| Table                | Foreign Key 1              | Foreign Key 2 |
| -----------          | -----------                | -----------   |
| subcommunity         | community_id               |               |
| exchange             | student_id                 |               |
| challenge_entry      | challenge_id               | student_id    |
| student_subcommunity | subcommunity_id            | student_id    |

GET requests can be made to retrieve row(s) that match foreign key(s). 

**HTTP Request:** GET    
**URL:** https://warm-ocean-22527.herokuapp.com/api/subcommunities/communities/1     
**RESULT:** retrieves all subcommunities that have a foreign key community_id equal to 1

**HTTP Request:** GET    
**URL:** https://warm-ocean-22527.herokuapp.com/api/challenge-entries/students/2/challenges/1    
**RESULT:** Retrieves all challenge entries that have a student_id of 2 and a challenge_id of 1


## Technology 

### Front-End
* React
* Vanilla CSS
* Semantic HTML
* Chart.js 
* React-Date-Picker
* Deployment : Vercel 

### Back-End
* Node.js
* Express
* PSQL Database
* Chai 
* Deployment: Heroku 








## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
# green-dragons-app
# green-dragons-client


