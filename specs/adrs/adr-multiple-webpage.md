# Web page datastructure - multiple responsive webpage

* Status: discussing
* Deciders: {David, Dzhangir, Jeremy, Niya, Richard, Ryan, Will}
* Date: Nov 11, 2021

## Context and Problem Statement

We need a decision over basic structure of the recipe web. Do we want it to have multiple html pages? Do we want it to be static? Or do we want it to be a single-page web app? Or do we want it to be a progressive web app?

## Decision Drivers

* The general structure need to be decided so task can be assigned to each people and we can developing
* The structure also determine what skills developers need to obtain

## Considered Options

* multiple static webpages
* multiple dynamic webpages
* single-page web application
* progessive web application

## Decision Outcome

Chosen option: combination of multiple dynamic webpages and SPW. Currently all html pages are developed separately. Remain to be discussed: Can we easily built a SPW?

## Pros and Cons of the Options

### Multiple Static Webpage

Content directly grabbed from server, no change after it is send. eg. personal bio webpage

* Good, because usually only needs html and css. Really easy to develop
* Bad, cannot interact with users, not fulfilling the need of our app

### Multiple Dynamic Webpages

A dynamic webpage allow user interaction to change the content of the web, usually implemented by javascript and some back-end data storage.

* Good, because dynamic webpage allow user interactions
* Good, because multiple webpage can be divided into different task and be integrated rather easily
* Bad, because single page make more sense sometimes

### Single Page Web Application

A web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server Eg. email

* Good, because the stay-in-one-page allow smooth user experience

### Progressive Web Application

"Progressive Web Apps (PWAs) are web apps that use service workers, manifests, and other web-platform features in combination with progressive enhancement to give users an experience on par with native apps."

* Good, because service workers allow offline operation!
* Good, responsive fast most of the time
* Bad, because service worker is hard to implement and debug, it add additional tech learning on our project


## Links
