##### Snippets and Requirements for using generated data from 

```Photo-shoot Application```

###### Requirements
```(Must installed plugins)```
1. `cordova file`
2. `com.lampa.startapp`

###### How to use data from ```Photo-shoot``` ?
1. On your application wirte down this snippet on your button function for taking picture.
Note: must be on readystate
```javascript
    var sApp = startApp.set({
        "package": "com.ionicframework.photoshoot620171"
    });
    sApp.start(function() {
        console.log("Successfully started");
    }, function(error) {
        console.log(error)
    });

```

2. Once ```Photo-shoot``` has launched , take a picture, go ahead and save it. After taking photo ```Photo-shoot``` will automatically closed and reopened mainactivity of your application on its current state.

3. Now, how can I used the data from ```Photo-shoot``` ?
    * Simply write down this code on your controller for specific section:
```javascript
   $cordovaFile.readAsText(cordova.file.externalRootDirectory, "photoshoot.json")
  .then(function (success) {
    // Process here your data, parse first before the data
  }, function (error) {
    // Hadle error here
  });
```