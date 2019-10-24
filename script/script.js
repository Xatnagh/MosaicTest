setCanvasSize(); 

function loadlayer(location,layer){
   lastloadx=posX;
         lastloady=posY;
   var data= {
      location:location,
      layer:layer
      }
      $.ajax({
       url: "/update",
       data: data,
       type: "GET",
      success: function(integer) {   
         var received=JSON.parse(integer)
        console.log(received['img_location'])
         console.log("location sent: "+ data.location+ " | "+ data.layer)
         sendDataToLoad(received['img_location'],received['img_imgurl'],received['img_scale'],received['img_level']);
         
          },
   });
      }

sendDataToLoad(jdata_location,jdata_imageurl,jdata_scale,jdata_level);

var canvas = new fabric.Canvas('c');
var zoom;
var zoomlevel=1;
var layeronearray=[];
var layertwoarray=[];
var layerthreearray=[];
var perpixelX=canvas.width/1200;
var perpixelY=canvas.height/1200;
var posX;
var posY;
var lastdragpointx;
var lastdragpointy;
var lastloadx;
var lastloady;
function sendDataToLoad(img_location,img_imgurl,img_scale,img_level){
   
   for(var i=0;i<img_location.length;i++){
     
      var tolocation=locationforcanvas(img_location[i],img_scale[i])
      var locationx=tolocation.x;
      var locationy=tolocation.y;
      var scaleamount=img_scale[i];  
      var level=img_level[i];
      var imageurl= img_imgurl[i];
   loadimage(scaleamount,locationx,locationy,level,imageurl);
   }
}
function loadimage(scaleamount,locationx,locationy,level,img_imgurl){
   fabric.Image.fromURL(img_imgurl, function(img){
      img.opacity=1;
      var elWidth = img.naturalWidth || img.width;
      var elHeight = img.naturalHeight || img.height;
      var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth);
      var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight);
      img.width = elWidth;
      img.height = elHeight;
      img.scaleX = (scaleX/scaleamount);
      img.scaleY = (scaleY/scaleamount);
      img.left=(canvas.width/scaleamount)*(locationx-1);
      img.top=(canvas.height/scaleamount)*locationy;
      if(img.top==0){
          console.log("left",(canvas.width/scaleamount)*(locationx-1)," top ", img.top); 
      }
     
      img.hasBorders= false,
      img.hasControls= false,
      img.hasRotatingPoint= false; 
      img.selectable=false;
      addtoarray(img,level);
      canvas.add(img);
   });
}
function locationforcanvas(location,scaleamount){
   var x= location%scaleamount;
   var y = Math.floor((location-x)/scaleamount);
   if(x==0){
   y-=1
   if(scaleamount==16){
      x=16 
   }
   if(scaleamount==80){
      x=80
   }
   if(scaleamount==1200){
      x=1200
   }
   }
   return {
   x:x,
   y:y
   }
}



function changelayers(){
// layer one turn visible
if(zoomlevel<=20){
   for(var i=0;i<layeronearray.length;i++){
      layeronearray[i].opacity=1;
      }
      if(layertwoarray.length!=0){
      for(var i=0;i<layertwoarray.length;i++){
         layertwoarray[i].opacity=0;
         }
      }
      if(layerthreearray.length!=0){
         for(var i=0;i<layerthreearray.length;i++){
            layerthreearray[i].opacity=0;
            }
         }
}
//layertwo turn visible
if(zoomlevel>20&&zoomlevel<90){
   for(var i=0;i<layeronearray.length;i++){
      layeronearray[i].opacity=0.9;
      }
   for(var i=0;i<layertwoarray.length;i++){
         layertwoarray[i].opacity=1; 
      }
      if(layerthreearray.length!=0){
         for(var i=0;i<layerthreearray.length;i++){
            layerthreearray[i].opacity=0;
            }
         }
}
//layer 3 turn visible
if(zoomlevel>=90){
   for(var i=0;i<layeronearray.length;i++){
      layeronearray[i].opacity=0;
      }
      if(layertwoarray.length!=0){
      for(var i=0;i<layertwoarray.length;i++){
         layertwoarray[i].opacity=0.9;
         }
      }
      if(layerthreearray.length!=0){
         for(var i=0;i<layerthreearray.length;i++){
            layerthreearray[i].opacity=1;
            }
         }
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
}

function getCurrentCordinates(posX,posY,level){
 if(level==1){
    widthPerImage=75*perpixelX
 
    heightPerImage=75*perpixelY
   x=Math.floor((posX/widthPerImage)%16)+1;//x is fine
   y=Math.floor(posY/heightPerImage);
   
   return y*16+x;
 }
 if(level==2){
   widthPerImage=15*perpixelX
   heightPerImage=15*perpixelY
  x=Math.floor((posX/widthPerImage)%80)+1;//x is fine
  y=Math.floor(posY/heightPerImage);
  return y*80+x;
}
   if(level==3){
   widthPerImage=perpixelX
   heightPerImage=perpixelY
  x=Math.floor((posX/widthPerImage)%1200)+1;//x is fine
  y=Math.floor(posY/heightPerImage);
  return y*1200+x;
   }
}

//MOVEMENTS AND BUTTONS AND INFOMATION DISPLAYS

$("#reset").click( function()
         {
         zoomlevel=1;
         canvas.setZoom(1);
         changelayers();
         canvas.viewportTransform[4]=0;
        canvas.viewportTransform[5]=0;
         canvas.requestRenderAll();
         // document.getElementById('zoomlevel').innerHTML="zoomlevel "+ zoomlevel;
         }
      );
var panning = false;
canvas.on('mouse:down', function(e) {
panning = true;
});

canvas.on('mouse:up', function(e) {
panning = false;

});

canvas.on('mouse:move', function(e) {
canvas.selection = false;
if (panning && e && e.e) {
 var delta = new fabric.Point(e.e.movementX, e.e.movementY);
 canvas.relativePan(delta);
}
});

canvas.on('mouse:wheel', function(opt) {

var delta = opt.e.deltaY;
delta=-1*delta;
getzoomlevel(delta);
zoom = canvas.getZoom();
zoom = zoom + (delta/200)*4;

if (zoom > 1000){ 
zoom = 1000;}
if (zoom < .7){
zoomlevel-=1;
zoom = 0.9;}
canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
opt.e.preventDefault();
opt.e.stopPropagation();
// document.getElementById('zoomlevel').innerHTML="zoomlevel "+ zoomlevel;
if(zoomlevel==20){
   loadlayer(getCurrentCordinates(posX,posY,2),2);
}
if(zoomlevel==90){
   loadlayer(getCurrentCordinates(posX,posY,3),3)
}
changelayers();
});


canvas.on('mouse:down', function(opt) {
var evt = opt.e;
 this.isDragging = true;
 this.lastPosX = evt.clientX;
 this.lastPosY = evt.clientY;

});
canvas.on('mouse:move', function(opt) {
if (this.isDragging) {
 var e = opt.e;
 this.viewportTransform[4] += e.clientX - this.lastPosX;
 this.viewportTransform[5] += e.clientY - this.lastPosY;
 this.requestRenderAll();
 this.lastPosX = e.clientX;
 this.lastPosY = e.clientY;
}  
/// loads images at second layer
if(zoomlevel>20){
   differenceinX=Math.abs(lastloadx-posX);
   differenceinY=Math.abs(lastloady-posY);
 
   if(differenceinX>10||differenceinY>10){
      loadlayer(getCurrentCordinates(posX,posY,2),2);
      if(zoomlevel>70){
            for(var i=0;i<layertwoarray.length;i++){
               layertwoarray[i].opacity=0.9;
               }
      }
   }
}
if(zoomlevel>=90){
   differenceinX=Math.abs(lastloadx-posX);
   differenceinY=Math.abs(lastloady-posY);
 
   var difference;
if(zoomlevel>70&&zoomlevel<120){
difference=3
}
if(zoomlevel>=120&&zoomlevel<270){
difference=2
}else{difference=1}//so that the server won't get loaded a bunch of times for nothing

if(differenceinX>difference||differenceinY>difference){//after they move the mouse, this will ask server for images
      
      loadlayer(getCurrentCordinates(posX,posY,3),3);
   }
}
///
////gets mouse cordinates
var pointer = canvas.getPointer(event.e);
posX = pointer.x;
posY = pointer.y;
// document.getElementById('cordination').innerHTML=posX+ "|" +posY;
// document.getElementById('location').innerHTML= 'location for layer 1: '+getCurrentCordinates(posX,posY,1)+ '  |  '+'location for layer2: '+getCurrentCordinates(posX,posY,2)+'  |  '+'location for layer3:'+getCurrentCordinates(posX,posY,3);
///
});
canvas.on('mouse:up', function(opt) {
this.isDragging = false;
this.selection = true;
});
function getzoomlevel(delta){
if(delta<0){
zoomlevel-=1;
if(zoomlevel<=0){
zoomlevel=0;
}
}else{
zoomlevel+=1;
}

}

//this function determines window size and therefore, screen size
function setCanvasSize() {
   var myWidth = 0, myHeight = 0;
if( typeof( window.innerWidth ) == 'number' ) {
  //Non-IE
  myWidth = window.innerWidth;

  myHeight = window.innerHeight;
} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
  //IE 6+ in 'standards compliant mode'
  myWidth = document.documentElement.clientWidth;
  myHeight = document.documentElement.clientHeight;
} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
  //IE 4 compatible
  myWidth = document.body.clientWidth;
  myHeight = document.body.clientHeight;
}

// document.getElementById('c').width=myWidth*.8;
// document.getElementById('c').height=myHeight*0.8; 
document.getElementById('c').width=myWidth*0.9;

document.getElementById('c').height=myHeight*0.9; 
}




