
//I cannot thank this post enough
//https://medium.com/@selom/how-to-fix-a-no-access-control-allow-origin-error-message-on-google-cloud-storage-90dd9b7e3ddb

var modeUpdatinglayers=false;
function sendDataToLoad(img_location,img_imgurl,img_scale,img_scaleX,img_scaleY,img_level){
   if(modeUpdatinglayers){
      if(img_location.length==0){
      loadedlayer2_count++
      if(loadedlayer2_count==layer2length){
         checkifallimageisloaded()
      }
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
             
           var level=img_level[i];
           if(img_imgurl.length!=1){
              var imageurl= img_imgurl[i];
           }else{
              imageurl= img_imgurl[0]
           }
            if(i==img_location.length-1&&modeUpdatinglayers){
               loadimage(scale,scaleamountX,scaleamountY,img_location[i],level,imageurl,true);
           }else{
            loadimage(scale,scaleamountX,scaleamountY,img_location[i],level,imageurl);
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
            step2()
          }
       }
       
 },{crossOrigin: 'anonymous'}); 
 }
 


function checkifallimageisloaded(){
      if(loadedlayer1_count==layer1length&&loadedlayer2_count==layer2length){
         var displayimage=localStorage.getItem('image');
         loadimage(1200,width,height,pointerlocation,4,displayimage,true);
      }
}
 var loadedlayer1_count=0;
 var loadedlayer2_count=0;
 var layer1length=0;
 var layer2length=0;   
 var userimageloaded=false;
function loadlocationimage(location,layer,alreadyloaded=[],layerlength){//give it a location and a layer and it will load everything in it
 modeUpdatinglayers=true
   if(layer==2){
    var scale=15;
    var scaleamount=1200
    var scaletemp=80
    layer2length=layerlength;
    }else{
    var scale=5
    var scaleamount=80
    var scaletemp=16
    layer1length=layerlength;
    }
       var y=Math.floor(location/scaletemp)
       var locationstart=(location-1)*scale+(y*(scale-1)*scaleamount)+1
       var locationlist=getlocationarray(locationstart,layer,alreadyloaded);
       
       arraytosend={
          'arraytosend':JSON.stringify(locationlist) ,
          'level':layer+1
      }
      $.ajax({
          url: "/update",
          data: arraytosend,
          type: "GET",
         success: function(result) {   
            result=JSON.parse(result)
          sendDataToLoad(result['img_location'],result['img_imgurl'],scaleamount,result['img_scaleX'],result['img_scaleY'],result['img_level']);  
                if(layer==1){
                    console.log(result['img_location'])
                    console.log(result['img_imgurl'])
                }
             }
      });
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
        console.log('arrayfor layer1',arrayofcurrentlayer)
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
     function loadlayer(location,layer){ //this is only called once, after nearby locations are calculated
   
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
                 console.log('data: sent',location,data['level'])
               },
        });
           }
           function resetCanvas(){
    canvas.setZoom(1);
    canvas.viewportTransform[4]=0;
   canvas.viewportTransform[5]=0;
canvas.requestRenderAll() 
}

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
  var p=document.createElement('p')
  p.innerHTML=location,layer; 
document.body.appendChild(p)
  document.body.appendChild(newImg);


      var data= new FormData();
    data.append('image',blob );
    data.append('location',location );
    data.append('layer',layer);
    data.append('upperlayerlocation',getupperlayeroflocation(location).layer1)
    console.log('layer1location sent:',getupperlayeroflocation(location).layer1)  
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

//give it a locationlist from layer 3 and it will spit out the upper layers
function getlayersoflocation(locationlist){
   var x,y,location;
   var layer1=[];
   var layer2=[];
for( var i=0;i<locationlist.length;i++){//100%works
 x=Math.floor(locationlist[i]/15.000001)%80+1
 y=Math.floor(locationlist[i]/15.000001/1200)
location=x+y*80
layer2.push(location)
}
layer2=[...new Set(layer2)]
for( var i=0;i<locationlist.length;i++){//100%works
   x=Math.floor(layer2[i]/5.000001)%16+1
   y=Math.floor(layer2[i]/5.000001/80)
 location=x+y*16
 layer1.push(location)
 }
 layer1=[...new Set(layer1)]
 layer1.pop()
return{
   'layer2':layer2,
   'layer1':layer1
}
}
//give it an image form layer 3 and it will spit back the upper layer
function getupperlayeroflocation(location){//works 100%
   var x,y,location;
   var layer1;
   var layer2;
 x=Math.floor(location/15.000001)%80+1
 y=Math.floor(location/15.000001/1200)
layer2=x+y*80
   x=Math.floor(layer2/5.000001)%16+1
   y=Math.floor(layer2/5.000001/80)
 layer1=x+y*16
return{
   'layer2':layer2,
   'layer1':layer1
}
}