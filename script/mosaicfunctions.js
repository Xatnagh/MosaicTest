
//I cannot thank this post enough
//https://medium.com/@selom/how-to-fix-a-no-access-control-allow-origin-error-message-on-google-cloud-storage-90dd9b7e3ddb
var lastlocationx,lastlocationy
function canvastoblob(location,layer){
    
    var canvas = document.getElementById('c');
 
    canvas.toBlob(function(blob) {
     var newImg = document.createElement('img'),
      url = URL.createObjectURL(blob);

  newImg.onload = function() {
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
  document.body.appendChild(newImg);

      var data= new FormData();
    data.append('image',blob );
    data.append('location',location );
    data.append('layer',layer );
    $.ajax({
        url: "/update_layers",
        data: data,
        processData: false,
    contentType: false,
        type: "POST",
       success: function(result) {   
        console.log('success for',location,'  layer',layer)
    }
    });
    }); 
 }
 

function blobfromlocation(location,level){
    console.log('location',location)
    var scale
    if(level==2){
       scale=80
    }else{scale=16}
    var tolocation=locationforcanvas(location,scale)
    var locationx=tolocation.x;
    var locationy=tolocation.y;
    var pointx=(1450/scale)*(locationx-1);
    var pointy=(900/scale)*locationy;
    var point=new fabric.Point(pointx,pointy)
    canvas.absolutePan(point)
    canvas.setZoom(scale)
    
    setTimeout(`canvastoblob(${location},${level})`, 100);
   
    setTimeout(`resetCanvas()`, 200);
 }
function resetCanvas(){
    canvas.setZoom(1);
    canvas.viewportTransform[4]=0;
   canvas.viewportTransform[5]=0;
canvas.requestRenderAll() 
}

 function loadimage(scale,scaleamountX,scaleamountY,locationx,locationy,level,img_imgurl,custom=false){
 
    fabric.Image.fromURL(img_imgurl, function(img){
       var elWidth = img.naturalWidth || img.width;
       var elHeight = img.naturalHeight || img.height;
       var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth);
       var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight);
       img.width = elWidth;
       img.height = elHeight;
       img.scaleX = (scaleX/(scale/scaleamountX));
       img.scaleY = (scaleY/(scale/scaleamountY));
       img.left=(canvas.width/scale)*(locationx-1);
       img.top=(canvas.height/scale)*locationy;
       img.hasBorders= false,
       img.hasControls= false,
       img.hasRotatingPoint= false; 
       img.selectable=false;
       addtoarray(img,level);
       canvas.add(img);
       canvas.requestRenderAll()
    },{crossOrigin: 'anonymous'});
    if(readystate){
        if(lastlocationx==locationx&&lastlocationy==locationy){
        step2()
readystate_layer1=true
    }
    }
    if( readystate_layer1){
        if(lastlocationx==locationx&&lastlocationy==locationy){
        step3()
    }
    }
    
    
    
 }

function locationforcanvas(location,scaleamountX){
    var x= location%scaleamountX;
    var y = Math.floor((location-x)/scaleamountX);
    if(x==0){
    y-=1
    if(scaleamountX==16){
       x=16 
    }
    if(scaleamountX==80){
       x=80
    }
    if(scaleamountX==1200){
       x=1200
    }
    }
    return {
    x:x,
    y:y
    }
 }
 function getscale(level){
    if(level==2){
       return 80;
    }else{
        return 1200;
    }
 }
 function addtoalreadyloaded(location,level){
    if(level==2){
       alreadyloaded_level2.push(location)
    }
    if(level==3){
       alreadyloaded_level3.push(location)
    }
    }




function loadlocationimage(location,layer,alreadyloaded=[]){//give it a location and a layer and it will load everything in it
    if(layer==2){
    var scale=15;
    var scaleamount=1200
    var scaletemp=80
    }else{
    var scale=5
    var scaleamount=80
    var scaletemp=16
    }
       var y=Math.floor(location/scaletemp)
      
       var locationstart=(location-1)*scale+(y*(scale-1)*scaleamount)+1
       var locationlist=getlocationarray(locationstart,layer,alreadyloaded);
       arraytosend={
          'arraytosend':JSON.stringify(locationlist) ,
          'level':layer+1
      }
      var tolocation=locationforcanvas(location,scaletemp)
        var locationx=tolocation.x;
        var locationy=tolocation.y;
      if(readystate||readystate_layer1){
         lastlocationx=locationx
      lastlocationy=locationy 
      }
      
      $.ajax({
          url: "/update",
          data: arraytosend,
          type: "GET",
         success: function(result) {   
            result=JSON.parse(result)
          sendDataToLoad(result['img_location'],result['img_imgurl'],scaleamount,result['img_scaleX'],result['img_scaleY'],result['img_level'],true);  
             }
      });
    }
    function getlocationarray(locationstart,layer,alreadyloaded=[]){
        var arrayofcurrentlayer=[];
     if(layer==2){
     for(var i=0;i<15;i++){
        for(var j=locationstart;j<locationstart+15;j++){
           arrayofcurrentlayer.push(j+1200*i)
        }
     }
     return arrayofcurrentlayer
     }if(layer==1){
        for(var i=0;i<5;i++){
           for(var j=locationstart;j<locationstart+5;j++){
              arrayofcurrentlayer.push(j+80*i)
           }
        }
        arrayofcurrentlayer=arrayofcurrentlayer.filter(function(item){
           return alreadyloaded.indexOf( item ) < 0;
        });
        console.log('arrayfor layer1',arrayofcurrentlayer)
        return arrayofcurrentlayer
     }
     }

     function sendDataToLoad(img_location,img_imgurl,img_scale,img_scaleX,img_scaleY,img_level,custom=false){

        for(var i=0;i<img_location.length;i++){
           var tolocation=locationforcanvas(img_location[i],img_scale)
           var locationx=tolocation.x;
           var locationy=tolocation.y;
           var scale=img_scale;
           if(img_scaleX.length!=1){
              var scaleamountX=img_scaleX[i];
           }else{
              var scaleamountX=img_scaleX[0];
           }
           if(img_scaleY.length!=1){
              var scaleamountY=img_scaleY[i];
           }else{
              var scaleamountY=img_scaleY[0];
           }
             
           var level=img_level[i];
           if(img_imgurl.length!=1){
              var imageurl= img_imgurl[i];
           }else{
              imageurl= img_imgurl[0]
           }
        loadimage(scale,scaleamountX,scaleamountY,locationx,locationy,level,imageurl,custom);
        }
    

     }


     function addtoarray(image,level){
        if(level==1){
            layeronearray.push(image);
        }
        if(level==2){
           layertwoarray.push(image);
        }
       if(level==3){
          layerthreearray.push(image)
       }
       if(level==4){
          layerfourarray.push(image)
       }
     }
     function loadlayer(location,layer){
   
        lastloadx=CenterCoord().x;
              lastloady=CenterCoord().y;
        var data= {
           arraytosend:JSON.stringify(location),
           level:layer
           }
           $.ajax({
            url: "/update",
            data: data,
            type: "GET",
           success: function(integer) {
              var received=JSON.parse(integer)
              scale=getscale(received['img_level'][0])
              addtoalreadyloaded(received['img_location'],layer)//so that the same image don't load again
              sendDataToLoad(received['img_location'],received['img_imgurl'],scale,received['img_scaleX'],received['img_scaleY'],received['img_level']);
              // console.log('data: sent',location,data['level'])
               },
               
        });
           }