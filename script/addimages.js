var locationlist=[]
function makelist(l1,l2){
if(l1<1||l2<1||l1>1440000||l2>1440000){
    alert("one of the squares you selected is outside of the mosaic, please choose your locations again")
    location1=' '
    location2= ''
}
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
uploading=false
arraytosend={
    'arraytosend':JSON.stringify(locationlist),
    'level':3
}
var imageurl=['/images/greensquare.png']
$.ajax({
    url: "/update",
    data: arraytosend,
    type: "GET",
   success: function(result) {   
      result=JSON.parse(result)
      alreadyloaded_level3=alreadyloaded_level3.concat(result['img_location'])
    imageexist=result['bool']
    sendDataToLoad(result['img_location'],result['img_imgurl'],scale,result['img_scaleX'],result['img_scaleY'],result['img_level']);    
      if(imageexist){
          alert('Image already exist for another user in your chosen area')
      }else{
        sendDataToLoad(locationlist,imageurl,1200,one,one,4)
      }
       }
});
}

var uploading=false;
function modeUPLOAD(){
    if($('#confirm').css('display')=='none'){
          $('#confirm').css({'display':'block'})
        }else{
          $('#confirm').css({'display':'none'})
        }
    if(uploading==false){
     alert('you are uploading')
    uploading=true   
    $('#confirm').click(function(){
        
      });
    }else{
        uploading=false
        alert('you exited uploading')
    }
}
function cancelupload(){
    for(var i=0;i<layerfourarray.length;i++){
        layerfourarray.opacity=0;
    }
    layerfourarray=[]
    locationlist=[]
}
function confirmupload(){
    window.location.href = "./addImage";
    
}
