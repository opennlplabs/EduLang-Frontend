# EduLang App

## DESCRIPTION
------------

EduLang is a bilingual childrens book app that translates books for children who speak low resource languages. Currently the language support is Pashto, Ukrainian, Somali, and Xhosa.

## HOW TO PUSH CHANGES
------------
- Check "git status" to see any changes
- "git add ."
- git commit -m "description of changes"
- git push origin master

## STEPS TO RUNNING
------------
- make sure to add your path to tesseract ("brew list tesseract" on mac), in Paragraph.py line 57. 
- if you dont have a gpu, change all instances of `cuda=True` to `cuda=False`
- download frontend dependencies by "npm install"
- make sure to change the server in app.py to 0.0.0.0
- make sure to change the server in LiveTranslation.js line 21 to your IPv4 Adress, add that part before `:5000`
- start the backend by `npm run backend`
- start the frontend on a separate terminal, try doing split terminal for easy use by `npm run frontend`

Note: when done with using, make sure to do **CONTROL C** instead of closing the terminals.


