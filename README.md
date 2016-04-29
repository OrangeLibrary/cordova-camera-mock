### Installation
`bower install cordova-camera-mock`

This provides a popup that allows you to attach files from your
file system and have them treated in a similar way to how the cordova
camera plugin treats the a photo

Tested briefly in the ionic framework.
Include something like  
 `<script src="lib/cordova-camera-mock/camera.js"></script>`
 
in your index.html file and your a cordova camera should be working in the
browser. Instead of accessing the camera, it will show a popup with an input that accepts image files.

Make sure not to include this when building the app.
