# flutter_web_test

A new Flutter project to reproduce the steps for the style error in _web release builds_.

## Important Note

When you create a new flutter project and build for the really first time a flutter web release build, the Increment Demo works without any problems and no blank screens appear with the "property style == null" error.

### But!

When you put any files in web/ folder, build every next time a release build you'll get the error in main.dart.js: "Uncaught TypeError: Cannot read property 'style' of null".

I tried following steps:

1. ```flutter clean```
2. ```flutter create .```
3. ```flutter build web --release```

no changes.

I reverted every file that i imported into web/ folder. Reverted all changes in index.html, but all the same: stuck in that "style of null" error, besides I got the same state as before it worked.

Please note: I've never changed the main.dart file! Everything is like the standard demo flutter project (see files here).

Thx flutter team!