
//I cannot thank this post enough
//https://medium.com/@selom/how-to-fix-a-no-access-control-allow-origin-error-message-on-google-cloud-storage-90dd9b7e3ddb
var modeUpdatinglayers=false;
function sendDataToLoad(img_location,img_imgurl,img_scale,img_scaleX,img_scaleY,img_level){
   if(modeUpdatinglayers&&img_level){
      if(img_location.length==0&&img_level==2){
      loadedlayer1_count++
      console.log('loadedlayer1count:',loadedlayer1_count)
      }
      if(img_location.length==0&&img_level==3){
         loadedlayer2_count++
         console.log('loadedlayer2count:',loadedlayer2_count)
      }
      if(loadedlayer2_count==layer2length ||loadedlayer1_count==layer1length){
         checkifallimageisloaded()
      }
      
   }    
        for(var i=0;i<img_location.length;i++){
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
           if(img_imgurl.length!=1){
              var imageurl= img_imgurl[i];
           }else{
              imageurl= img_imgurl[0]
           }
            if(i==img_location.length-1&&modeUpdatinglayers){
               loadimage(scale,scaleamountX,scaleamountY,img_location[i],img_level,imageurl,true);
           }else{
            loadimage(scale,scaleamountX,scaleamountY,img_location[i],img_level,imageurl);
        }      
   }
}
 function loadimage(scale,scaleamountX,scaleamountY,location,level,img_imgurl,finalimg=false){
  var tolocation=locationforcanvas(location,scale)
           var locationx=tolocation.x;
           var locationy=tolocation.y;
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
       if(finalimg){
          if(level==3){
            loadedlayer2_count++
            console.log('loadedlayer2:',loadedlayer2_count)
            if(loadedlayer2_count==layer2length){
               checkifallimageisloaded()
            }
          }
          if(level==2){
            loadedlayer1_count++
            console.log('loadedlayer1:',loadedlayer1_count)
            if(loadedlayer1_count==layer1length){
               checkifallimageisloaded()
            }
          }
          if(level==4){
            userimageloaded=true;
            console.log('user Image loaded!')
            step2()
          }
       }
       
 },{crossOrigin: 'anonymous'}); 
 }
 


function checkifallimageisloaded(){
   console.log('checkifallimageisloaded')
      if(loadedlayer1_count==layer1length&&loadedlayer2_count==layer2length){
         var displayimage=localStorage.getItem('image');
         loadimage(1200,width,height,pointerlocation,4,displayimage,true);
      }
}
 var loadedlayer1_count=0;
 var loadedlayer2_count=0;
 var layer1length=1;
 var layer2length=1;   
 var userimageloaded=false;
function loadlocationimage(locationlist,layer,alreadyloaded=[],){//give it a location and a layer and it will load everything in it
   modeUpdatinglayers=true
   console.log(alreadyloaded)
    locationlist = locationlist.filter( ( el ) => !alreadyloaded.includes( el ) );
       loadlayer(locationlist,layer,true)
    } 

//This function is for when loading images, it will determine the x and y of said image    
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
//give it a location and layer and it will return the array for that location
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
        return arrayofcurrentlayer
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
     function loadlayer(location,layer,uploading=false){ //give a upper location array, loads everything in it
   
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
              sendDataToLoad(received['img_location'],received['img_imgurl'],scale,received['img_scaleX'],received['img_scaleY'],received['img_level'][0],uploading);
               },
        });
           }
           function resetCanvas(){
    canvas.setZoom(1);
    canvas.viewportTransform[4]=0;
   canvas.viewportTransform[5]=0;
canvas.requestRenderAll() 
}

function canvastoblob(location,layer){//this location is from layer 2 or 1
    var canvas = document.getElementById('c');

    canvas.toBlob(function(blob) {
       ///makes image appear below the page
   var newImg = document.createElement('img'),
   url = URL.createObjectURL(blob);
  newImg.onload = function() {
    URL.revokeObjectURL(url);
  };
  newImg.src = url;
  var p=document.createElement('p')
  p.innerHTML=location,layer; 
document.body.appendChild(p)
  document.body.appendChild(newImg);
  document.getElementById('loadingscreenimg').src=url;
///

      var data= new FormData();
    data.append('image',blob );
    data.append('location',location );
    data.append('layer',layer);
    data.append('upperlayerlocation',getlayer1fromlayer2(location))
    console.log(...data)
      
               $.ajax({
                  url: "/update_layers",
                  data: data,
                  processData: false,
               contentType: false,
                  type: "POST",
                  success: function() {   
                  console.log('success for',location,'  layer',layer)
                  if(location==target && layer==1){
                        hideloadingscreen();
                        alert('DONE!')
                        window.location.href="./"
                     }
                  }
               
               });
    }); 
 }
 
function blobfromlocation(location,level){ 

    var scale;
    if(level==2){
       scale=80
    }else{scale=16}
    var tolocation=locationforcanvas(location,scale)
    var locationx=tolocation.x;
    var locationy=tolocation.y;
    var pointx=(1450/scale)*(locationx-1);//1450 and 900 is the size of mosaic in add image
    var pointy=(900/scale)*locationy;
    var point=new fabric.Point(pointx,pointy)
    canvas.absolutePan(point)
    canvas.setZoom(scale)
    setTimeout(`canvastoblob(${location},${level})`, 100);
    setTimeout(`resetCanvas()`, 200);
 }

//give it the corners from layer 3 and it will spit back locationlist for layer 2 and 1
function getlayersoflocation(bottomleft,topright){
   
var layer2=[];
var layer1=[];
//for layer2
var x=Math.floor((bottomleft-1)/15)%80+1
var y=Math.floor((bottomleft-1)/15/1200)
var location=x+y*80
 var secondx=Math.floor((topright-1)/15)%80+1
 var secondy=Math.floor((topright-1)/15/1200)
var width=secondx-x+1;
var height=secondy-y+1;
for(var i=0;i<width;i++){
   for(var j=0;j<height;j++){
      layer2.push(location+i+j*80)
   }
}
//for layer1
 x=Math.floor((layer2[0]-1)/5)%16+1
 y=Math.floor((layer2[0]-1)/5/80)
 location=x+y*16
  secondx=Math.floor((layer2[layer2.length-1]-1)/5)%16+1
  secondy=Math.floor((layer2[layer2.length-1]-1)/5/80)
 width=secondx-x+1;
 height=secondy-y+1;
for(var i=0;i<width;i++){
   for(var j=0;j<height;j++){
      layer1.push(location+i+j*16)
   }
}
console.log('layer2',layer2)
console.log('layer1',layer1)


   return {
      'layer2':layer2,
      'layer1':layer1
   }
}
//give it an location layer 3 and it will spit back the upper layer locations
function getupperlayeroflocation(location){//works 100%
   //so far never called
   var x,y,location;
   var layer1;
   var layer2;
   x=Math.floor((location-1)/15)%80+1
   y=Math.floor((location-1)/15/1200)
   layer2=x+y*80
      x=Math.floor((layer2-1)/5)%16+1
      y=Math.floor(layer2/5.0/80)
   layer1=x+y*16
   return{
      'layer2':layer2,
      'layer1':layer1
   }
}


function getlayer1fromlayer2(layer2location){
   x=Math.floor(layer2location/5.000001)%16+1
   y=Math.floor(layer2location/5.0/80)
 var layer1=x+y*16
 return layer1
}
function CenterCoord(){
   return{
      x:fabric.util.invertTransform(canvas.viewportTransform)[4]+(canvas.width/zoom)/2,
      y:fabric.util.invertTransform(canvas.viewportTransform)[5]+(canvas.height/zoom)/2
   }
}
var zoom=1;
function cleardatabase(){
   $.ajax({
      url: "/clear",
      type: "POST",
      success: function(result) {   
      console.log(result)
      if(result==1){
         cleardatabase() //keep clearing as long as there is still stuff in the database
      }
      }
   });
}

function showloadingscreen(){$('#loadingscreen').show();}
function hideloadingscreen(){$('#loadingscreen').hide();}