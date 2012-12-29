Angular Express Seed Example App
Based on the Angular Express Seed, this simple app illustrates how to use AngularJS and Express on a Node.js server to make a simple blog.


This project is based off of Brian Ford's work.  All i've done here is add Mongoose to it for the database.

	https://github.com/btford/angular-express-blog

Steps to get this working:

The usual....

	npm install 
	
I also think it's nice using nodeman, so....:

	npm install nodemon -g
	
Set up mongodb if you don't got it so that Mongoose can use it. I like using homebrew:

	brew install mongodb
	
to start the server, I recommend using this command:

	foreman start -f Procfile.dev

We are starting foreman with a development version of Procfile so when you deploy to heroku, it's already properly set up to use the plain Procfile. Procfile.dev is for development only. 

If you want to deploy to Heroku, you will need to set your heroku config  variables:

	https://devcenter.heroku.com/articles/config-vars




