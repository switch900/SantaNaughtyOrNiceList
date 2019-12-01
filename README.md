# SantaNaughtyOrNiceList

<p>Backend is a ASP.NET Core Web API and a SQLLite database hosted on Azure.  Authentication is handled with Identity Framework and JWT Tokens.</p>

<p>Front end is written with React.  Using Fetch to communicate with API</p>

<h3>User can log in as either Santa (admin) or Child (user):</h3>

<img src="https://github.com/switch900/SantaNaughtyOrNiceList/blob/master/Images/LoginPage.png?raw=true" />

<h3>When Santa logs in he can see a list of users</h3>
  
<img src="https://github.com/switch900/SantaNaughtyOrNiceList/blob/master/Images/SantaList.png?raw=true" />

<h3>User Detail Page.  Only Santa can see if a child is naughty or nice and can change status by clicking text box.<br>
       Santa can also see a list of other children which he can click on.<br>
       When child logs in they do not see checkbox.  Instead they see an edit user button which Santa does not see.<br>
     Both users see an embedded Google Map from google-map-react that shows user location</h3>

<img src="https://github.com/switch900/SantaNaughtyOrNiceList/blob/master/Images/SantaDetailPage.png?raw=true"/>

<h3>Edit Profile Page.  Only availble for user to update their information</h3>

<img src="https://github.com/switch900/SantaNaughtyOrNiceList/blob/master/Images/EditProfilePage.png?raw=true" />
