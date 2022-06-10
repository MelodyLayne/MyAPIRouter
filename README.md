# Welcome to MyAPIRouter!

## Where it came from
I built this as part of the final test that was required for a unit on Express, SQL, and middleware. It was the most enjoyable project I have done and made me realize that I really like API routes and would enjoy writing more middleware in the future.

## What I like about this project
The original challenge was done using Knex and SQLite3. I have had previous experience using PostgreSQL and Sequelize. To implement this I decided to unravel how to use Knex with Postgres. Thankfully the scale of this project is small enough that it was not a heavy undertaking to make that change. However it did put into focus the amount of work that would be needed to make a larger scale database change.

In addition, there is no GUI attached to this project. I ran the entire setup using the command line and HTTPie to test routes. For the initial test, we were told to use SQLite3Studio but it had been incompatible with my machine's setup from the start so I had to succeed at the test without using that. However, for the final part of setting up my Postgres database, I did utilize Postbird to query the database and delete individual records.

## What you will find in here

The current routing is straightforward and simple. The first route registers a new user with a username and password. On successful registration, the terminal returns a JSON object with the ID and username. That route can be tested using HTTPie and the following endpoint - <br>
> `http :3300/api/auth/register username=*name* password=*password*`

The second route logins the user and establishes a JWT Token. On successful login a JSON object with a welcome message and the user's username is displayed. That route can be tested using HTTPie and the following endpoint - <br>
> `http :3300/api/auth/login username=*name* password=*password*`

The last route returns all the users in the database. That route can be tested with HTTPie and the following endpoint -
> `http :3300/api/users`

## Further Development

This is by no means an exahustive application. I currently do have empty seed files for users and role which will be added into version 1.1 After that fleshing out routes that allow users to be deleted and modified would round out the obvious functions available. That may also be incorporated into version 1.1

Thank you for taking the time to review this repo. I welcome any feedback that is constructive and would help me be better as a programmer. My email for feedback is [Melody McClure](melody@melodymcclure.com)
