# Team Meeting
## Date: Nov 28, 2021. 10:00am - 11:00am
## Meeting method: zoom

### Attendence
Sanat <br>
Dzhangir <br>
Niya <br>

### Agenda
N/A

### Leftover from last meeting
N/A

### New dishes in this meeting
1. Progress report
   1. bootstrap UI
      1. consistent style between fridge page and main page
   2. Fridge
      1. Fridge page button not functionning
      2. Different size images or uniform scale images? different sizes looks good for now, it could be cleaner. A design decision.
   3. Create "extract" recipes with link
      1. Simple extract from site call satisfy create function
      2. Not functioning if the user want to get family/traditional recipe
      3. Suggest first implement URL extract, then if have time, implements add from scratch
      4. Add from scratch: Blank template, UI intensive, upload image, many editable fields
   4. Note for recipe
      1. Could be treat as add-on, then add to My Recipes would be update
2. Testing
   1. Spend a good amount of time in testing
   2. dont worry about e2e testing too much
   3. Make sure to write test cases, whether it pass or not is secondary
3. UI: Try to make the APP good enough aesthetically
4. Repository
   1. README.md nice done
      1. Add run-through of the repository in README.md
   2. Wiki nice done, keep populating
      1. add branches rules on wiki
      2. add contribution rules on wiki
      3. add documentations
   3. Branches
      1. Clean branches
      2. Keep branches there in the end, not merge all them into main
      3. Take a screenshot for all branches to show the strategy you use
   4. Add cards to project board, keep it consistent with issues
   5. add ADRs for bootstrap (!), refactoring, fridge, functionality (!), netlify (!). anything demonstrate critical thinking.
5. CI/CD
   1. current progress: Super Linter, Code Factor, human review, Jest, JSDoc
   2. JSDoc not working
   3. Post documentation on wiki or GitHub page.
6. Video Assignments
   1. Public Final Video
      1. final is a watch party, might be in a zoom call, at the end of each video, submit feedback, that is the paritcipation points
      2. top 6 videos from student rating / top 6 video from TA rating, extra credit for public videos
      3. very funny / appeal to TA with very professional APP
      4. being creative
      5. 4.5min max
      6. Go over app, a piece of advice from incoming students
   2. Privite Final Video
      1. graded by TA
      2. 15min
      3. Go over all the things you do not have time in the public video
      4. No need to be creative
      5. Get all information
      6. Record a zoom meeting is fine
7. Treat this week as the final week
8. Team Member evaluation assignments
   1. Finished by each individual
   2. Talk about contribution
   3. Everyone needs to do this!
   4. Individual grade is adjusted according to the assignment (small adjustments for + / -)
   5. Which team member put too much effort. Which team member slack off
   6. Keep all personal issues out of this. Be sincere and honest and sensitive.
   7. If you know if someone has some reasons for not doing the work, you can mention it
   8. Treat it as the signals for contribution
   9. Out and due on Dec 8th
   10. Sooner get it done, quicker people can get clearified, get feedback and fix issues.
9. LightHouse performance testing
   1. Two modes: Desktop / Mobile
   2. Try to get accessibility to green
   3. Fix easy problems
10. Cross Browser Testing
    1.  Lambdatest
    2.  Browser stack
        1.  Simulate site across browser
        2.  Different version of browser
        3.  Fairly easy to do
        4.  Very likely bad results
    3.  Treat it as diversities of testing besides unit testing to differientiate yourselves with your classmates
11. Next meeting will be the last offical meeting, Wednesday at 2:00pm. More meeting is optional if needs some concrete feedback at the last week

### Task assigned
* CI/CD pipeline due Nov 30
* sprint review / retrospective due Dec 2
* Finish features: CREATE, add note to recipe, Fridge functionality
* Finish UI
* Finish unit testing
* Individual Teammate Evaluations
* Final video (public and private)
* Organize Repository
  * Keep project board updated with issues
  * README.md and wiki
  * Add branch rules and contribution rules, take a screenshot of branches before cleaning

### Comments & Questions
Q: Contribution Rule?

A: If a user request a feature, if the feature is assigned to a user, how do they go from implements a feature to incorporate that in the project.
Create an issue, work on it, creach a branch with a PR, then PR will be linted and reviewed. PR passes manual approval. List flow

Q: Hide API key?

A: yes. Protect it from external process. But won't will be grade down if you don't have it. If you do hide it it shows clearity of thinking.
GitHub hiding fetch remote. Secrete Encryption. Encrpt your key and save it as it.


#### Project Timeline
* Week11 no feature implemented in week11
* Week9-10 finish styling UI, testing. Intensive!!

##### Any Decisions?