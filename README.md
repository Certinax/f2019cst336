# First project Internet Programming

To setup a project, do following commands in terminal windows

Install and update express
* ```sudo npm install -g express-generator```
* ```sudo npm update -g express-generator```

Set handlebars and connect to git
* ```express --hbs --view hbs --git```

Initialize git and connect to a repository
* ```git init```
* ```git remote add origin https://username@github.com/username/repository.git```

Then add all files, commit them and push to github
* ```git add .```
* ```git commit -m "Commit message"```
* ```git push```


If the .idea folder accidentally gets added to the repository, do following commands
* add .idea to .gitignore
* Do the following commands in terminal
```
git rm -r --cached .idea
git commit -m "Delete message"
git push
``` 