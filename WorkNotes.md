***ACTUAL NEXT STEPS***
review Thinkful guidelines for project

HIDE_FORM and SHOW_FORM change to HIDE_MAIN SHOW_MAIN
better --> HIDE_ELEMENT('main') SHOW_ELEMENT('main')

ERROR HANDLING ON FAILED FETCH, POST\PATCH, DELETE
*I think you need to change the HttpMethods utility funtions
for each method, just return the result, do NOT use a try\catch block within the httpMethod utility func

THEN, in the actual container, use the try\catch block
catch will set the modal to display the failed attempt text to user
When user clicks on modal close button (IF language indicates a fail) THEN redirect
--Will have to use Promise.all when fetching multiple items

*might have to break up modal messages, perhaps one set for success actions, another for fail actions which will then redirect accordingly (success actions keep user on page, fail actions redirect to previous page)

NO RESULTS
*Make NoResults component with prop 'data' 
Component is <h2>`No ${props.data} found`</h2>









