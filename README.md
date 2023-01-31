# EduLang App

HOW TO INSTALL ENVIRONMENT

1. Installation
   Install Brew and xcode or android studio
   https://reactnative.dev/docs/0.69/getting-started

brew install rbenv
rbenv init  
rbenv install 2.7.6
rbenv global 2.7.6
npm install --global yarn

Ruby version should be ruby 2.7.6 or ruby 2.7.6p219
test it by running ruby -v

2. How to run the project
   Git clone the project and run yarn install in the root directory.
   Cd into ios folder and run pod install
   In project directory run metro server npx react-native start (sometimes it runs automatically when building the project)
   Open <projectname>.xcworkspace in ios folder file with xcode
   Wait till xcode finishes processing all files to build the project

For android follow react native instructions for android studio installation
In project directory open android folder with android Studio
Wait till the files are process to build (make sure metro server is running)
Normal issues would be missing metro server when running emulator
adb reverse tcp:8081 tcp:8081 - will solve the issue
If you have multiple emulators kill all of them and used only one
adb devices - list all devices
Adb -s <name of device> emu kill - will kill emulator

FOLDER STRUCTURE

Containers
Will only hold logic and dumb components, mostly screens are containers
Home
Containers
Components
Styles
DashBoard
Containers
Components
Styles
CommonFeatures
Redux
Actions
Reducers
Saga
Services
Api’s
asyncStorage
Navigation
Locals
Globals
Components

## DESCRIPTION

---

EduLang is a bilingual childrens book app that translates books for children who speak low resource languages. Currently the language support is Pashto, Ukrainian, Somali, and Xhosa.

## HOW TO PUSH CHANGES

---

**Make sure that you create seperate branches for your UI changes!**

- First, check periodically on the master branch to check any code updates using `git pull`
- Create a new branch on your local machine and switch: `git checkout -b [nameOfYourNewBranch]`
- Tip: You can see all the branches by using: `git branch -a`

- Check "git status" to see any changes
- To add all of your changes, do: "git add ."
- Then commit using `git commit -m "[descriptionOfChanges]"`
- Push your changes and branch to github (official cloud repository): `git push origin [nameOfYourNewBranch]`
- We then create a pull request after we people review your code, handles merge changes, approve it to the master branch :)

Don't feel hesistant to reach out to Eshaan, Jovani, Subha, or anyone else for help. :)

## STEPS TO RUNNING

---

- Download project and run `yarn install` in project directory to install dependecies
- run `yarn start` to run the project
- to run test `yarn run test`
