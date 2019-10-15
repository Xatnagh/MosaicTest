
var myWidth = 0, myHeight = 0;
//this function determines window size and therefore, screen size
function alertSize() {
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
console.log( 'Width = ' + myWidth );
console.log( 'Height = ' + myHeight );
}
alertSize();
document.getElementById('c').width=myWidth*.95;
document.getElementById('c').height=myHeight*0.9; 
/* 
var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = (canvas.scaleX || 1) * canvas.width / elWidth;
var scaleY = (canvas.scaleY || 1) * canvas.height / elHeight;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX /{zoom scale};
img.scaleY = scaleY /{zoom scale};
*/

var canvas = new fabric.Canvas('c');
var zoom;
var zoomlevel=1;
var layerone=[];
var array=[];//layer2
var layerthreearray=[];
var layerfourarray=[];
//layer one
function loadimg(){
fabric.Image.fromURL('https://cdn.pixabay.com/photo/2018/08/31/18/21/fantasy-3645269_960_720.jpg', function(img){
  
var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth);
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight);
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
   img.hasBorders= false,
      img.hasControls= false,
      img.hasRotatingPoint= false; 
       img.selectable=false;
addtoarray_layer1(img);
 canvas.add(img);
}); 
}
//end of layer one


//layer two
fabric.Image.fromURL('https://www.tokkoro.com/picsup/1434470-landscape.jpg', function(img){

img.opacity=0;
var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth)/2;
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight)/2;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
img.top=0;
img.left=0;
     img.hasBorders= false,
        img.hasControls= false,
        img.hasRotatingPoint= false; 
   img.selectable=false;

addtoarray_layer2(img);
canvas.add(img);
});

fabric.Image.fromURL('https://www.tokkoro.com/picsup/1434470-landscape.jpg', function(img){
img.opacity=0.0;
 var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth)/2;
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight)/2;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
  img.top=canvas.getHeight()/2
     img.hasBorders= false,
        img.hasControls= false,
        img.hasRotatingPoint= false; 
   img.selectable=false;
addtoarray_layer2(img);
canvas.add(img);
});

fabric.Image.fromURL('https://www.tokkoro.com/picsup/1434470-landscape.jpg', function(img){
img.opacity=0.0;
var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth)/2;
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight)/2;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
  img.top=canvas.getHeight()/2;
  img.left=canvas.getWidth()/2;
     img.hasBorders= false,
        img.hasControls= false,
        img.hasRotatingPoint= false; 
   img.selectable=false;
addtoarray_layer2(img);
canvas.add(img);
});
fabric.Image.fromURL('https://www.tokkoro.com/picsup/1434470-landscape.jpg', function(img){

img.opacity=0.0;
 var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth)/2;
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight)/2;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
   img.left=canvas.getWidth()/2;
     img.hasBorders= false,
        img.hasControls= false,
        img.hasRotatingPoint= false; 
   img.selectable=false;
addtoarray_layer2(img);
  canvas.add(img);
});
//end of layer2

//layer3
fabric.Image.fromURL('https://www.tokkoro.com/picsup/1434470-landscape.jpg', function(img){
img.opacity=0;//transpaent
var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth)/4;
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight)/4;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
img.top=0,
img.left=0,
img.hasBorders= false,
img.hasControls= false,
img.hasRotatingPoint= false; 
img.selectable=false;
addtoarray_layer3(img);
canvas.add(img);
});

fabric.Image.fromURL('https://www.tokkoro.com/picsup/1434470-landscape.jpg', function(img){
img.opacity=0;//transpaent
var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth)/4;
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight)/4;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
img.top=canvas.height/4,
img.left=canvas.getWidth()/4,
img.hasBorders= false,
img.hasControls= false,
img.hasRotatingPoint= false; 
img.selectable=false;
addtoarray_layer3(img);
canvas.add(img);
});

fabric.Image.fromURL('https://www.tokkoro.com/picsup/1434470-landscape.jpg', function(img){

img.opacity=0;//transpaent
var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth)/4;
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight)/4;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
img.top=canvas.height/4,
img.left=0,
img.hasBorders= false,
img.hasControls= false,
img.hasRotatingPoint= false; 
img.selectable=false;
addtoarray_layer3(img);
canvas.add(img);
});

fabric.Image.fromURL('https://www.tokkoro.com/picsup/1434470-landscape.jpg', function(img){

img.opacity=0;//transpaent
var elWidth = img.naturalWidth || img.width;
var elHeight = img.naturalHeight || img.height;
var scaleX = ((canvas.scaleX || 1) * canvas.width / elWidth)/4;
var scaleY = ((canvas.scaleY || 1) * canvas.height / elHeight)/4;
img.width = elWidth;
img.height = elHeight;
img.scaleX = scaleX;
img.scaleY = scaleY;
img.top=0,
img.left=canvas.width/4,
img.hasBorders= false,
img.hasControls= false,
img.hasRotatingPoint= false; 
img.selectable=false;
addtoarray_layer3(img);
canvas.add(img);
});
//end of layer 3

//layer 4
function loadlayer4(){
for(var i=0;i<jdata_location.length;i++){
   var locationx=locationforcanvas(jdata_location[i],4).x;
   var locationy=locationforcanvas(jdata_location[i],4).y;
   var scaleamount=jdata_scale[0];
  
loadlayer4image(i,scaleamount,locationx,locationy);
}
}
function loadlayer4image(i,scaleamount,locationx,locationy){
   fabric.Image.fromURL(jdata_imageurl[i], function(img){
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
      img.hasBorders= false,
      img.hasControls= false,
      img.hasRotatingPoint= false; 
      img.selectable=false;
      addtoarray_layer4(img);
      canvas.add(img);
   });
}
function locationforcanvas(location,level){
   var y = Math.floor(location/(level*2));
   var x= location%8;
   if(x==0){
   y-=1
   x=8
   }
   return {
   x:x,
   y:y
   }
}
loadimg();


function changelayers(){
//layer1
if(zoomlevel<5){

for(var i=0;i<array.length;i++){
array[i].opacity=0;
}
layerone[0].opacity=1;
}
//layer 2
if(zoomlevel>=5&&zoomlevel<10){

for(var i=0;i<layerthreearray.length;i++){
layerthreearray[i].opacity=0; //sets layer 3 invisable
}

for(var i=0;i<array.length;i++){
array[i].opacity=1;}//sets layer 2 visable
layerone[0].opacity=0;//sets layer 1 invisable
}

//layer 3
if(zoomlevel>=10 &&zoomlevel<=19){
for(var i=0;i<array.length;i++){
array[i].opacity=0;
}
for(var i=0;i<layerthreearray.length;i++){
layerthreearray[i].opacity=1;
}
for(var i=0;i<layerfourarray.length;i++){
   layerfourarray[i].opacity=0;
   }
}
//layer 4
if(zoomlevel==20){
   for(var i=0;i<layerfourarray.length;i++){
      layerfourarray[i].opacity=1;
      }
      for(var i=0;i<layerthreearray.length;i++){
   layerthreearray[i].opacity=0;
   }
}

}

function addtoarray_layer1(image){
layerone.push(image);
}
function addtoarray_layer2(image){
array.push(image);
}
function addtoarray_layer3(image){
layerthreearray.push(image);
}
function addtoarray_layer4(image){
   layerfourarray.push(image);
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
         document.getElementById('zoomlevel').innerHTML="zoomlevel "+ zoomlevel;
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
 var units = 10;
 var delta = new fabric.Point(e.e.movementX, e.e.movementY);
 canvas.relativePan(delta);
}
});

canvas.on('mouse:wheel', function(opt) {

var delta = opt.e.deltaY;
delta=-1*delta;
getzoomlevel(delta);
zoom = canvas.getZoom();
zoom = zoom + delta/200;

if (zoom > 20){ 
zoom = 20;}
if (zoom < .7){
zoomlevel-=1;
zoom = 0.7;}
canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
opt.e.preventDefault();
opt.e.stopPropagation();
document.getElementById('zoomlevel').innerHTML="zoomlevel "+ zoomlevel;
if(zoomlevel==20){
   loadlayer4();
}
changelayers();

});

canvas.on('mouse:down', function(opt) {
var evt = opt.e;
if (evt.altKey === true) {
 this.isDragging = true;
 this.selection = false;
 this.lastPosX = evt.clientX;
 this.lastPosY = evt.clientY;
}

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
////gets mouse cordinates
var pointer = canvas.getPointer(event.e);
var posX = pointer.x;
var posY = pointer.y;
document.getElementById('cordination').innerHTML=posX+" | "+posY;
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






