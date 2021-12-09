# storage used for navigation between MainPage and GeneralRecipePage

* Status: accepted
* Deciders: Jeremy, Ryan Heo, Niya
* Date: Nov 19, 2021

## Context and Problem Statement

When try to populate GeneralRecipePage with recipes selected at the MainPage, there must be a way to transfer data from MainPage to a new populated GeneralRecipePage.

## Considered Options

* Use a SPA and create compoenent of GeneralRecipePage directly on the main page
* Use session storage to store all searched recipe results, then create a key value pair of ('curr', recipeId)
* Use cookie to record data

## Decision Outcome

Chosen option: "{option 2}", because using SPA need to setup routers which is complicated. No one has used cookie before and it also have security concern. Implement a session storage is similar to local storage, and we don't need long-term storage.

### Positive Consequences <!-- optional -->

* We finished implement the MainPage to GeneralRecipePage and it works great on normal wifi. Yey

### Negative Consequences <!-- optional -->

* When Jeremy works on the project on train, the local server version does not work. Needs further test on validity of session storage on poor wifi condition

## Pros and Cons of the Options <!-- optional -->

### {option 1}

An example of SPA would be our Lab7

* Good, because reusing component will allow specific url for each recipe chosen
* Good, because the main content of the general recipe page is already a component
* Bad, because routers are hard to implement, we don't have much knowledge about it.

### {option 2}

Use session storage to store the id of the clicked recipe

* Good, because session storage is easy to implement, with clearing and adding returned recipes each time a search api call is called.
* Bad, because it is temporary

### {option 3}

Using cookie

* Bad, because no one in the dev pair has the knowledge of how cookie works
* Bad, because cookie has generally a security concern