# Task one Code Review task
As a User, I can search for movies and view a list of results

Could not get the app to list movies on the main page

This was caused by a bug in the api url.

These failed tests where caused by an / before the the params inside the api URL

This was found in the constant file in lines 3 and 4.


Three tests failed because of this bug
Watch Later movies page inside watchLater.test.js

movies starred and saved to watch later inside movie.test.js

search for movies inside App.test.js

This issue could of been picked up before the PR if a pipeline was set up in the application.
Which would of ran these tests and found the error.

Another issue would be it only shows the first page of the results and would be Nice to have a pagination feature.

Changed the structure of the test folder to mirror the structure of the src folder 

Movies.mock.js is in the tests but not used, it should be removed.