## If your app is inside a mono repo then you have to set a base directory with netlify
  1. Settings > Build & deploy > Edit Settings > Base Directory 
    ie. packages/web
  2. Add an empty yarn.lock file to the root of your web application (not lerna root dir)
    ie. touch packages/web/yarn.lock
    
    
