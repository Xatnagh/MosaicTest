makelist(1,13)
function makelist(l1,l2){
squarelength=4;
var locationlist=[];
var topcorner= Math.max(l1,l2);
var bottomcorner=Math.min(l1,l2);
var height =Math.floor(topcorner/4)-Math.floor(bottomcorner/4)+1
var bottomleft,bottomright
if((topcorner-(height-1)*4)<bottomcorner){
    bottomleft=topcorner-(height-1)*4 
   bottomright=bottomcorner
   }else{
       bottomleft= bottomcorner
   bottomright=topcorner-(height-1)*4
   }

for(var i=bottomleft;i<=bottomright;i++){
locationlist.push(i)
    for(var j=1;j<height;j++){
    locationlist.push(i+j*4)
    }
    console.log(locationlist)
}
console.log('height',height)
console.log(bottomleft,bottomright)

// var imageurl=['/images/greensquare.png']
// for(var i=0;i<locationlist.length;i++){
//     console.log('this is running')
//     sendDataToLoad(locationlist,imageurl,4,4)
    
// }
}



var uploading=false;
function modeUPLOAD(){
    alert('you are uploading')
    uploading=true
}
