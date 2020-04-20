*DEV PROCESS
1. API: 
git checkout -b dev/feature-name
Write code, including new table, seeding table, and changes to router and service
Make sure the new endpoint works on Postman
push changes to git
push changes to heroku 

2. Client:
git checkout -b dev/feature-name
Make sure the remotely hosted API endpoint can be correctly accessed by the client
Once working, push changes to git
Push changes to zeit


Next: 
Finish User endpoints and Client Side Functionality 
-POST
--> Redirect to students if successful

-PATCH

-DELETE

--> Form validation and error handling

If possible, abstract these HTTP methods into utility functions that can be more easily used for remaining client manipulation of data (Challenges, Communities, Subcommunities, Student Challenges, Student Dragon Bucks)

