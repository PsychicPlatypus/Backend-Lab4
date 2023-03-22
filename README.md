# Backend-Lab4

## How To Run

To run the server:

```zsh
npm start
```

To populate the database:

```zsh
node populateDatabase.js
```

To install dependencies:

```zsh
npm install
```

To generate access's token:

```js
require('crypto').randomBytes(64).toString('hex')
```

Save the token in a .env file in the root directory of the project. The file should look like this:

```txt
TOKEN=your_generated_token_here
```

## About the Database

There are five different roles a user can have in the system:

- student
- student1
- student2
- teacher
- admin

Different users can access different routes on the web page. If a user doesn't have access to a route he gets rerouted to the login page.
A user with an admin role can access any route including a unique admin route.
There are a few prebuilt users within the database with the available roles.
