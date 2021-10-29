# Team Meeting
### Date: Oct 22, 2021. 2:00pm - 3:20pm
### Meeting method: zoom

#### Attendence:
David <br>
Dzhangir <br>
Jeremy <br>
Niya <br>
Richard <br>
Ryan Wang <br>
Ryan Helo (leaves early) <br>
Will <br>

#### Agenda:
1. General Status (Brainstorm and Pitch due this week)
2. Ask about progress on design / UML / backend database (5min)
3. Update from meeting with TA (8min)
4. Start pitch

#### Leftover from last meeting:
N/A

#### New dishes in this meeting:
1. Specify features
    1. Create Start with preload recipes from spoonacular API, Then user can grab recipes from google, we will get website content and import the recipe into our website. Once the recipe is imported, it can not be deleted by user.
    2. Read Show recipe page
    3. Update User are not able to change recipe content in db, they can add comment after a recipe
    4. Delete Delete from user's list
    5. User's List: every recipe the user imported and the recipes from favorite API. They can delete recipe representation on the list, but they can't delete from db
    6. Fridge: as discussed before.
    7. Other features will not be in MVP.
2. Pitch
    1. Problem (Richard, David) — The raw idea, a use case, or something we’ve seen that motivates us to work on this
There are a lot of recipes, but too many make it hard to find the recipe for college students. Relatively cheap and quick, with some diet and nutrition requirements for some. (alt. College students all over the country suffer from a lack of convenient meal recipes.)
Statement of Purpose: Providing fast and convenient recipes for college students. 
User Personas: Develop a story about a college student who need a recipe app
    2. Appetite(Ryan Heo)— How much time we want to spend and how that constrains the solution
How much time do we want to spend: 4-5 weeks
How that constrain the solution: Simple things and do them well. Finding recipes based on a concise and efficient filter. Good user experience, no major bugs, little friction. Emphasis on fast, curated recipes will be simple and quick to prepare.
    3. Solution (Dzhangir, Jeremy,Niya) — The core elements we came up with, presented in a form that’s easy for people to immediately understand
(including wireframe and system diagram)ve
What features in the app represent our solution:
Add recipes from the internet to user’s list
Use recipes that we uploaded
Add user’s own note to a recipe (visible to the user themselves)
Remove recipes from user’s list
Fridge: A questionnaire with user input whatever item they have, once they submit we will find recipes best match to the input ingredients. (money-saving)
User’s list input: found on google && choose from preload. Once get a recipe from google, it will be stored in the database. User only delete their own choices, not recipes in the db.
    4. Rabbit holes (Antonia, Niya)  — Details about the solution worth calling out to avoid problems
technical unknowns, unsolved design problems, or misunderstood interdependencies: 
We assume there won’t be a user database. No social recipe platform. Our recipe app is a source of recipes, providing recipes to user, but not including too many features for user to create their own recipes.
    5. No-gos (Will, Run) — Anything specifically excluded from the concept: functionality or use cases we intentionally aren’t covering to fit the appetite or make the problem tractable
No touch on sharing recipes and social media interactions.
User’s can’t add to the general recipe list.
Decide no print function, cz our target user value convenience and it is more convenient to have a phone. The printer is not accessible to everyone.
No complex nutrition fact except for calorie.

#### Task assigned:
* Front-end & Design: UML
* Pitch (ddl friday)
    * Problem (Richard, David)
    * Appetite (Ryan Heo)
    * Solution (Dzhangifr, Jeremy, Niya)
    * Rabbit Holes (Antonia, Niya)
    * No-goes (Will, Run)

#### Comments & Questions:
  
##### Project Timeline

##### Any Decisions?

#### Resources
* Figma https://www.figma.com/file/5A496mX1T0s4hcLYzgsaSm/Website-recipe?node-id=0%3A1
* Miro https://miro.com/welcomeonboard/OUp5R3FoOXNqVGlWdVFxVDl3U3RwS2VvV1E5UjF3RkNZZmYzMDFTVW0zbDZJeGM2cGhlcjVuT1B3NVhEWTQ5dHwzMDc0NDU3MzY1NTE1ODUxMDQx?invite_link_id=738830808650
* Meeting Minutes (This github)
* Scrum https://trello.com/invite/b/d5jxgkDs/9b2c83c9f8a02439d128f1b74d0c53ab/productive-raccoons-scrum-board
* Example Pitch Chapter Write A Pitch https://basecamp.com/shapeup)
