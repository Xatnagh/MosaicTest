
function makelist(l1,l2){

var locationlist=[];
var topcorner= Math.max(l1,l2);
var bottomcorner=Math.min(l1,l2);
var height =Math.floor(topcorner/1200)-Math.floor(bottomcorner/1200)+1
var bottomleft,bottomright
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

console.log(locationlist)
arraytosend={
    'arraytosend':JSON.stringify(locationlist)
}
var imageurl=['/images/greensquare.png']
$.ajax({
    url: "/update",
    data: arraytosend,
    type: "POST",
   success: function(result) {   
      result=JSON.parse(result)
      console.log(result['img_location'])
    imageexist=result['bool']
      if(imageexist){
          alert('Image already exist for another user in your chosen area')
      }else{
        sendDataToLoad(result['img_location'],result['img_imgurl'],scale,result['img_scaleX'],result['img_scaleY'],result['img_level']);
        sendDataToLoad(locationlist,imageurl,1200,one,one,4)
      }
       }
});
}

var uploading=false;
function modeUPLOAD(){
    alert('you are uploading')
    uploading=true
}
