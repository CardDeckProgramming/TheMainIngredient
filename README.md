# RecipeWebApp
Web App for Application Project class

--------------------------------------------------------------------------------------------------------------------------------------
To Start the Recipe WebApp locally:

1. Go to File Explorer -> Program Files/MongoDB/src/4.0/bin -> run command 'mongod' in command prompt (Don't close this)

2. In IDE (Visial Studio Code)
Open a terminal -> change directory to backend (cd backend)
Run: npm run dev (Don't close this terminal)

3. Open another terminal (found atop the menu tab) -> change terminal to frontend (cd frontend)
Run: ng serve --open (Don't close this terminal)

Afterwards the web app should run and open in your browser

--------------------------------------------------------------------------------------------------------------------------------------
Git Commands:

***Always make a new branch when making code changes***

git branch <- Lists the available branches you have. If the name is has a * and is highlighted, 
              that means it's cureently the branch you are in  

git checkout -b [your_Branch_Name_Here] <- This allows you to create a new brnach (Note: do not include the [] tags). 
                                        I recommend only using this command when in the master branch

git status <- After making changes and saving them, this command will list all the files you have changed. 
              The files listed will confirmed if you will be able to add them and commit them to the master branch

git add . <- This command will add all the files shown in the git status list to the commit once you have executed a commit. 
             Note: if you only want to add certain files, you would put: git add [file_path/name_here]. Using git status again 
             should display what files you added in a different colour to confirm they have been added   

git commit -m "Message here" <- This command will commit all the files you added in the git add command so that they can be 
               pushed to the master branch. You always need to add the -m and a quick message for this command to work. Usually 
               you'd just put what you did on the quotes such as "Added ____ functionality"

git push origin [your_Branch_Name_Here] <- This will then push your changes to be added to the master branch, because
                                                          mandatory pull requests are enabled, the terminal should provide a link for 
                                                          you to set up the review such as add reviewers, comments, etc.


--------------------------------------------------------------------------------------------------------------------------------------
Updating your master branch (and other branches):

If changes have been updated in Git (a pull request has been accepted) it's a good idea to pull these changes to your master branch.
Use 'git branch' to see/verify which branch you are in, if you are not in master use the command 'git checkout master' to switch to it
Use 'git pull' to bring in all the changes from the repository (origin aka the master copy) to your master branch copy.

*If you are making code chages in another branch, you'll need to do a rebase
After you have pulled in the new changes in the master branch, switch to your other branch with 'git checkout [branch_name_here]'
Then enter 'git rebase master' to briing in the new changes from master to your branch. 

   *Note: You may get merge conflicts during this command (this means code you've changed was also changed in the same spot with the new changes you just pulled in). To fix these, go to the files where merge conflicts exist. Fix the code so the appropriate changes remain, and add the files to your next commit when you're ready to push your changes to the repository
