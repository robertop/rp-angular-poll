# rp-angular-poll
A small polling (survey) application that leverages Angular JS and Firebase Backend As A Service.
This is a fully functional polling application that uses [Firebase](https://www.firebase.com/)
for persisting of its data.

Prerequisites:
* NPM - You can install this via your OS package manager (homebrew, apt, yum, rpm), even chocolatey
on MSW.

##Installation Steps:
Execute this command in the project root to download all dependencies:

```
    npm install
```

## Developing
Start a dev web server to serve the app. After this command is run, the app
is available on http://localhost:3000/app

```
    npm start
```

Use live reload so that HTML changes reflect on the browser automatically:

```
    npm run livereload
```

Start the karma test runer; this program stays alive and re-runs tests when
files are saved.

```
    npm test
```

Run jshint (JavaScript static analysis) on the project. This should be
run before every commit, to make sure that no obvious bugs are committed.

```
    node_modules/.bin/gulp lint
```

This command runs a program that stays alie and runs jshint (JavaScript
static analysis) on files that have been saved. This command should
be run during development.
```
    node_modules/.bin/gulp watch-linter
```
