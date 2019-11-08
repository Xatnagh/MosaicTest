var onmobile;
 function mobilecheck() {
   var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
onmobile=check 
};
 mobilecheck()

setCanvasSize(); 
function loadlayer(location,layer){
   // console.log('location:',location)
   lastloadx=CenterCoord().x;
         lastloady=CenterCoord().y;
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
         scale=getscale(received['img_level'][0])
         
         sendDataToLoad(received['img_location'],received['img_imgurl'],scale,received['img_scaleX'],received['img_scaleY'],received['img_level']);
         console.log('data: sent',data['location'],data['layer'])
         // console.log(received['img_imgurl'] )
          },
   });
      }
///this loads first layer
var one=[1]
sendDataToLoad(jdata_location,jdata_imageurl,16,one,one,jdata_level);
///

var canvas = new fabric.Canvas('c');

function sendDataToLoad(img_location,img_imgurl,img_scale,img_scaleX,img_scaleY,img_level){
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
   
   loadimage(scale,scaleamountX,scaleamountY,locationx,locationy,level,imageurl);
   }
}
function loadimage(scale,scaleamountX,scaleamountY,locationx,locationy,level,img_imgurl){
   fabric.Image.fromURL(img_imgurl, function(img){
      if(img_imgurl=='/images/greensquare.jpg'){
        img.opacity=1; 
      }else{
        img.opcaity=0.99
      }
      
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
   });
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



function changelayers(){
// layer one turn visible
if(zoom<20){
   if(layeronearray[0].opcaity!=1){
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
  
}
//layertwo turn visible
if(layertwoarray.length!=0&&zoom>20&&zoom<130){
   if(layertwoarray[0].opacity!=0.99){
         for(var i=0;i<layeronearray.length;i++){
      layeronearray[i].opacity=0;
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
}
//layer 3 turn visible

if(zoom>130&&layerthreearray.length!=0){
     if(layerthreearray[0].opacity!=0.99){

   for(var i=0;i<layeronearray.length;i++){
      layeronearray[i].opacity=0.5;
      }
      if(layertwoarray.length!=0){
      for(var i=0;i<layertwoarray.length;i++){
         layertwoarray[i].opacity=0.9;
         }
      }
      for(var i=0;i<layerthreearray.length;i++){
            layerthreearray[i].opacity=0.99;
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
  if(level==4){
     layerfourarray.push(image)
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
$('#show').click( function(){
  var all= document.getElementsByClassName('hidden');
  if(all[0].style.opacity!=0.99){
     for (var i = 0; i < all.length; i++) {
   all[i].style.opacity = '1';
  }}
  else{
   for (var i = 0; i < all.length; i++) {
      all[i].style.opacity = '0';
  }
  
 }
});
$("#reset").click( function()
         {
         zoom=1;
         canvas.setZoom(1);
         changelayers();
         canvas.viewportTransform[4]=0;
        canvas.viewportTransform[5]=0;
         canvas.requestRenderAll();
         // document.getElementById('zoom').innerHTML="zoom "+ zoom;
         }
      );
     // mobile control

var pausePanning=false;
var lastX,lastY,xChange,yChange;
canvas.on({
   'touch:gesture': function(e) {
         if (e.e.touches && e.e.touches.length == 2) {
            pausePanning = true;
            var point = new fabric.Point(e.self.x, e.self.y);
            if (e.self.state == "start") {
               zoomStartScale = canvas.getZoom();
            }
            var delta = zoomStartScale * e.self.scale;
            canvas.zoomToPoint(point, delta);
            pausePanning = false;
            zoom = canvas.getZoom();
            if(zoom.between(15,16)){
               
            loadlayer(getCurrentCordinates(CenterCoord().x,CenterCoord().y,2),2);
         }
         if(zoom.between(128,129)){
            
            loadlayer(getCurrentCordinates(CenterCoord().x,CenterCoord().y,3),3)
         }
         changelayers();
         }
   } });
        
    

var panning = false;
canvas.on('mouse:down', function() {
panning = true;
this.isDragging=true;
});

canvas.on('mouse:up', function() {
panning = false;
});
if(is_touch_device()){
   canvas.on('touch:drag', function(e) {
      canvas.selection=false;
        currentX = e.self.x;
        currentY = e.self.y;
        xChange = (currentX - lastX)*1.5;
        yChange = (currentY - lastY)*1.5;
        if( (Math.abs(currentX - lastX) <= 20) && (Math.abs(currentY - lastY) <= 20)) {
            var delta = new fabric.Point(xChange, yChange);
            canvas.relativePan(delta);
        }
        lastX = e.self.x;
        lastY = e.self.y;
    loadImagesBasedOnPanning();
});
}else{
    canvas.on('mouse:move', function(e) {
   canvas.selection = false;
   if (panning && e && e.e) {
   var delta = new fabric.Point(e.e.movementX, e.e.movementY);
   canvas.relativePan(delta);
   loadImagesBasedOnPanning();
   var pointer = canvas.getPointer(event.e);
posX = pointer.x;
posY = pointer.y;

}
///gets mouse cordinates

});
}


canvas.on('mouse:wheel', function(opt) {
   var delta = opt.e.deltaY;
   if(navigator.userAgent.indexOf("Firefox") > 0) {
   delta=delta*60
   }
delta=-1*delta;
zoom = canvas.getZoom();
zoom = zoom + (delta/200)*(2+(1.025*zoom));

//this limits zoom
if (zoom > 1000){ 
zoom = 1000;}
if (zoom < .7){
zoom-=1;
zoom = 0.9;}
//
canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
opt.e.preventDefault();
opt.e.stopPropagation();

// document.getElementById('zoomlevel').innerHTML="zoom "+ zoom;
if(zoom.between(15,23)){
   
   loadlayer(getCurrentCordinates(CenterCoord().x,CenterCoord().y,2),2);
}
if(zoom.between(128,180)){
   
   loadlayer(getCurrentCordinates(CenterCoord().x,CenterCoord().y,3),3)
}
changelayers();
});


 function loadImagesBasedOnPanning(){
/// loads images at second layer
if(zoom>20&&zoom<90){
   differenceinX=Math.abs(lastloadx-CenterCoord().x);
   differenceinY=Math.abs(lastloady-CenterCoord().y);
 
   if(differenceinX>10||differenceinY>10){
     
      loadlayer(getCurrentCordinates(CenterCoord().x,CenterCoord().y,2),2);
      if(zoom>70){
         if(layertwoarray.length!=0){
             for(var i=0;i<layertwoarray.length;i++){
               layertwoarray[i].opacity=0.9;
               }
         }    
      }
   }
}
if(zoom>=90){
   differenceinX=Math.abs(lastloadx-CenterCoord().x);
   differenceinY=Math.abs(lastloady-CenterCoord().y);
 
   var difference;
if(zoom>70&&zoom<120){
difference=3
}
if(zoom>=120&&zoom<270){
difference=2
}else{difference=1}//so that the server won't get loaded a bunch of times for nothing

if(differenceinX>difference||differenceinY>difference){//after they move the mouse, this will ask server for images
  
   loadlayer(getCurrentCordinates(CenterCoord().x,CenterCoord().y,2),2);
      loadlayer(getCurrentCordinates(CenterCoord().x,CenterCoord().y,3),3);
   }
}
///
// document.getElementById('cordination').innerHTML=posX+ "|" +posY;
// document.getElementById('location').innerHTML= 'location for layer 1: '+getCurrentCordinates(posX,posY,1)+ '  |  '+'location for layer2: '+getCurrentCordinates(posX,posY,2)+'  |  '+'location for layer3:'+getCurrentCordinates(posX,posY,3);
///
};
canvas.on('mouse:up', function() {
this.isDragging = false;
this.selection = true;
});
var count=0;
var location1;
canvas.on('mouse:dblclick',function(e){
   let touch = e.e.touches ? e.e.touches[0] : e.e;
   posX=canvas.getPointer(touch).x
   posY=canvas.getPointer(touch).y
  if(uploading==false){ 
         var location=getCurrentCordinates(posX,posY,3)
         console.log(location)
         data={
            location:location
         }
         $.ajax({
            url:'/imageinfo',
            data:data,
            type:'GET',
            success:function(recieved){
               recieved=JSON.parse(recieved);
               location=recieved['location'];
               imgUrl=recieved['image_imgUrl'];
               url=recieved['image_url'];
               description=recieved['image_description'];
               imageInfoPage(imgUrl,url,description)
            }
         })
   }else{
      if(count==1){ 
         var location2=getCurrentCordinates(posX,posY,3)

         console.log('location1',location1,'location2',location2)
         count++
         makelist(location1,location2)
      }
      if(count==0){
      location1=getCurrentCordinates(posX,posY,3)
      console.log('location1',location1)
      count++
      }  
      if(count==2){
         count=0
         location1=null
         
      }
   }
});

function imageInfoPage(imgUrl,url,description){
  document.getElementById('pop_image').src=`${imgUrl}`;
  document.getElementById('pop_description').innerHTML=`${description}`;
  document.getElementById('pop_url').innerHTML=`${url}`;
  document.getElementById('pop_url').href=`${url}`;
  $('#overlay').css({'display':'block'});


}


//this function determines window size and therefore, screen size
function setCanvasSize(){
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
document.getElementById('c').width=myWidth;

document.getElementById('c').height=myHeight*0.9; 
}

$('#pop_close').click(function(){
$('#overlay').css({'display':'none'});
});

function CenterCoord(){
   return{
      x:fabric.util.invertTransform(canvas.viewportTransform)[4]+(canvas.width/zoom)/2,
      y:fabric.util.invertTransform(canvas.viewportTransform)[5]+(canvas.height/zoom)/2
   }

}


function is_touch_device() {
   var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
   var mq = function(query) {
     return window.matchMedia(query).matches;
   }
 
   if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
     return true;
   }
 
   // include the 'heartz' as a way to have a non matching MQ to help terminate the join
   // https://git.io/vznFH
   var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
   return mq(query);
 }
function getscale(level){
   if(level==2){
      return 80;
   }else{
       return 1200;
   }
}
Number.prototype.between = function(a, b) {
   var min = Math.min.apply(Math, [a, b]),
     max = Math.max.apply(Math, [a, b]);
   return this > min && this < max;
 };
 var zoom=canvas.getZoom();
 var layeronearray=[];
 var layertwoarray=[];
 var layerthreearray=[];
 var layerfourarray=[]
 var perpixelX=canvas.width/1200;
 var perpixelY=canvas.height/1200;
 var posX;
 var posY;
 var lastdragpointx;
 var lastdragpointy;
 var lastloadx;
 var lastloady;

     

   
