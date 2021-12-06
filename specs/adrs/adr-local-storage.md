# choose backend - local storage

* Status: accepted
* Deciders:
  * First proposed in meeting with TA {Sanat, Dzhangir, Niya}
  * Then discussed with the group {Antonia, David, Dzhangir, Jeremy, Niya, Richard, Ryan, Run, Will}
* Date: Oct 31, 2021
* _Note: the adr was initially recorded in the general meeting note, it was formatted later (Nov 13, 2021)_

## Context and Problem Statement

The recipe web application needs a 'backend' for a few features that may requires store data.

## Decision Drivers

* Some of the features eg. CRUD needs a back-end
* After the MVP application is developed, if we add new additional features, we probably need some sort of back-end
* Tech stack needs to be decided quick so developers can start learning

## Considered Options

* Express.js
* local storage & indexedDB

## Decision Outcome

Chosen option: localStorage & IndexedDB, because it is easy to learn, smooth to develop, suitable to the current knowledge of our developers and our project appetite. It can implemented most of features we would like to have. Additional back-end can always be added on the top of localStorage if we really have time in the future

## Pros and Cons of the Options

### Express.js

"Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications"

* Good, because it is a widely using standard for node.js application. It has documentation and tutorials supports
* Bad, because it involves many network knowledges that need long-time learning to fully understand. It also requires people to know how web application function
* Good, becuase it is comparatively lightweighted and easy-to-install
* Bad, it is still costs a lot of time to learn. Also, if without previous experience, debugging would be a pain because it is an additional technology layer added on web and node.js

### Local Storage & indexedDB

Local Storage is client-side stored data in brower across sessions. It has a key-value pair structure and allow addition, modification, or deletion of the stored pairs. The value must be a string object.
"IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs."

* Good, because super easy to learn. A few webpages in MDN is enough to explain how to use localStorage
* Good, because if we use API calls most of time, localStorage is enough to implement basic features we want (favorite list)
* Bad, because the data is only stored in client-side, which means we don't have a shared database for all users. If we want to add additional feature in next sprint, the type of feature added is limited.
* Good, because the data is across sessions and won't be deleted unless the use clear cache -but we don't build the web app for super user
* Bad, becuase now data cannot be synchronized between mobile and desktop

## Links
* Resources for local storage
  * [MDN localStorage doc](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  * [w3schools localStorage tutorial](https://www.w3schools.com/html/html5_webstorage.asp)
* Recources for Express.js
  * [express.js offical website with tutorial](https://expressjs.com/)
  * [express.js tutorial with local library as an example](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)