Andrew Hewitson
A01029917
ahewitson@my.bcit.ca  OR
switch_900@hotmail.com

Chosen SPA - React
API - https://santaapi20191123012550.azurewebsites.net/
CLIENT - https://santaclientawh.azurewebsites.net

Not completed 

Validation of data when user updates their personal data.  Data is validated on registeration in the same format just ran out of time to make it work properly.
Profile update works fine with IIS Express with the API and database running on Azure.   But for some reason when you run the React App from Azure the update page does not work.  Santa has the ability to update the IsNaughty field from the ChildDetailPage but the user cannot update their profile.  As it works fine in IIS I've got to believe it's a setting in Azure that I'm just not finding.  As Santa is an Admin and the User is a Child maybe something sort of administrative setting in Azure?  
There is also one small glitch I would have liked to fix but didn't which is that for some reason the LocalStorage can have artifacts from previous sessions so that when the project is restarted sometimes it will take a token from a previous session if it's still valid and go with it.  I should have a way to purge localstorage before the program runs.

Major Challenges

Aside from the previous comment about Azure that really wasn't my biggest challenge. 

My biggest challenge was my unfamiliarity with React.  I've never taken a course in it before.  I took some Pluralsight tutorials and we covered it in class briefly but the amount of work needed to complete this project was greatly beyond this.  I'm sure it shows in my work.  As quite a bit of my projectwas pieced together by using the Toon class project as a basis and then adding on things learned in various tutorials my final work doesn't have a clear path of one style of React. It's a bit of a mix between new and old and jumps between things like using class components and using function components.  If I did it all over again I would probably start with one path and go with it.  
I also know that I have a lot of Magic Numbers and duplicate code that I would love to refactor out to make the client code cleaner and easier to read.   Unfortunately time was a giant factor.  I sustained a concussion last week riding home from work and my doctor has limited my screen time (technically it's supposed to be zero but I'm so close to finishing that I've been workin in spurts).  I'm fairly satisfied with my final results but I know that with more work it could be better.
 