
(function(){
  window.Camera ={
    DestinationType:{ DATA_URL:'12345'},
    PictureSourceType:{ CAMERA:'' },
    EncodingType:{ JPEG:'' }
  };
  window.CameraPopoverOptions = {};

  window.navigator.camera = { getPicture: getPicture };

  //EXPORTED FUNCTIONS
  function getPicture(successCallback, errorCallback, options){
    var popup = showPopup();
    var input = document.getElementById('get-picture-mock');
    var popupWrapper = document.getElementById('pop-up-wrapper');
    convertOnAddingFile(
      popup,
      input,
      wrapSuccess(successCallback,popupWrapper),
      wrapError(successCallback, popupWrapper),
      options
    );
  }

  //HELPERS

  function convertOnAddingFile(popup, input, successCallback, errorCallback, options) {
    input.onchange = function(event){
      var file = event.target.files[0];
      var img = document.createElement('img');
      var canvas = document.createElement('canvas');
      var reader = new FileReader();
      manipulateImageOnLoad(img, canvas,successCallback, errorCallback, options);
      reader.onload = function() {
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    };
  }

   function manipulateImageOnLoad(img,canvas,successCallback, errorCallback, options){
     var maxWidth = options && options.targetWidth || 1000;
     var maxHeight = options && options.targetWidth || 1000;
     var quality = (options && options.quality || 100)/100;
     var ctx = canvas.getContext("2d");
     img.addEventListener("load", function() {
       //gets the height and width assigned
       ctx.drawImage(img, 0, 0);
       var dimensions = getScaledDimensions(img, maxWidth, maxHeight);
       canvas.width = dimensions.width;
       canvas.height = dimensions.height;
       ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
       var results = canvas.toDataURL("image/png",quality);
       var data = results.split(',')[1];
       successCallback(data);
     });
   }

   function getScaledDimensions(img,maxWidth,maxHeight){
     var width = img.width;
     var height = img.height;
     if (width >= height && width > maxWidth) {
       height *= maxWidth / width;
       width = maxWidth;
     }
     if (width <= height && height > maxHeight)  {
       width *= maxHeight / height;
       height = maxHeight;
     }
     return { height:height, width:width };
   }

   function showPopup(){
     var html = '<div id=\'popup\' style="z-index: 9999;position:' +
     'fixed;top: 50px;left: 50px;height: 75px;width: 250px;background:'+
     ' white;padding: 20px;border: solid black 1px;display:block">' +
     '<input id="get-picture-mock" type="file" accept="image/*"></div>';

     var body = document.getElementsByTagName('body')[0];
     var div = document.createElement('DIV');
     div.id = 'pop-up-wrapper';
     div.innerHTML = html;
     body.appendChild(div);
     var popup = document.getElementById('popup');
     popup.style.display ='block';
     return popup;
   }

   function wrapError(callback, popup){
     var wrapped = function(err){ callback(err); popup.remove(); };
     return wrapped;
   }

   function wrapSuccess(callback, popup){
     var wrapped = function(data){ callback(data); popup.remove(); };
     return wrapped;
   }
}).call(this);
