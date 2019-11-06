function makelist(l1,l2){
var locationlist=[];
var height =Math.floor(Math.abs(l2-l1)/1200+1);
var topcorner= Math.max(l1,l2);
var bottomcorner=Math.min(l1,l2)
var bottomleft,bottomright
//sets the bottom corners
if((topcorner-(height-1)*1200)<bottomcorner){
 bottomleft=topcorner-(height-1)*1200 
bottomright=bottomcorner
}else{
    bottomleft= bottomcorner
bottomright=topcorner-(height-1)*1200
}
for(var i=bottomleft;i<=bottomright;i++){
locationlist.push(i)
    for(var j=1;j<height;j++){
    locationlist.push(i+j*1200)
    }
}

var imageurl=['/images/greensquare.png']
for(var i=0;i<locationlist.length;i++){
    console.log('this is running')
    sendDataToLoad(locationlist,imageurl,1200,4)
    
}
}



var uploading=false;
function modeUPLOAD(){
    alert('you are uploading')
    uploading=true
}
