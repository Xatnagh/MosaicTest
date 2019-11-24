var locationlist=[]
var bottomleft
var height,width;
function makelist(l1,l2){
if(l1<1||l2<1||l1>1440000||l2>1440000){
    alert("one of the squares you selected is outside of the mosaic, please choose your locations again")
    location1=''
    location2= ''
}
var topcorner= Math.max(l1,l2);
var bottomcorner=Math.min(l1,l2);

 height =Math.floor(topcorner/1200)-Math.floor(bottomcorner/1200)+1
 var bottomright
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
 width= bottomright%1200-bottomleft%1200+1;
console.log('width=', width)
uploading=false
arraytosend={
    'arraytosend':JSON.stringify(locationlist) ,
    'level':3
}

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

        sendDataToLoad([bottomleft],[image],1200,[width],[height],[4])
      }
       }
});
}

var uploading=false;
function modeUPLOAD(){
    uploading=!uploading
    $('.dropdown-content').hide()
    $('#dropzone').toggle()
    $('#cancelbtn').toggle()
    $('#confirmbtn').toggle()
    }


function modeUPLOAD_2(){
    $('#uploadbtn').hide()
    $('#dropzone').hide()
    $('#cancelbtn').hide()
    $('#confirmbtn').hide()
    if($('#confirm').css('display')=='none'){
        $('#confirm').css({'display':'block'})
      }else{
        $('#confirm').css({'display':'none'})
      }
    
  }
    
function confirmupload(){
    if(locationlist.length!=0){
        localStorage.setItem('image', image);
       
        localStorage.setItem('location',JSON.stringify(locationlist) )
        localStorage.setItem('pointerlocation',bottomleft)
        localStorage.setItem('width',width)
        localStorage.setItem('height',height)
     window.location.href = "./addImage";   
    }
    else{
        alert("You didn't select where you want to put your image!")
    }
    
    
}

$('#cancelbtn').click(function(){
    document.getElementById('imagezone').innerHTML=`
    <img src="" alt=""> 
    `
    $('#imagezone').hide()
    image=null
    $('.dropzone')[0].dropzone.files.forEach(function(file) { 
        file.previewElement.remove(); 
      });
      $('.dropzone').removeClass('dz-started');
});

$('#confirmbtn').click(function(){
    if(document.getElementById('image')!=null){
        image=document.getElementById('image').src 
       modeUPLOAD_2();
    }else{
        alert('there is no image!')
    }
    
}); 
//for url images
$('#submit').click(function(){
     image=document.getElementById('imageurl').value
    $('#imagezone').show()
    document.getElementById('imagezone').innerHTML=`
    <img id=image src="${image}" alt="">
    ` 
});


    Dropzone.options.dz = {
    autoProcessQueue: false,
    acceptedFiles: 'image/jpeg,image/png,image/jpg',
    previewTemplate: '<div class="dz-filename"><span data-dz-name></span></div>',
    createImageThumbnails: false,
    accept: function(file, done) {
      // FileReader() asynchronously reads the contents of files (or raw data buffers) stored on the user's computer.
      var reader = new FileReader();
      reader.onload = (function(entry) {
        console.log(entry)
        // The Image() constructor creates a new HTMLImageElement instance.
        image = new Image(); 
        image.name='image'
        image.src = entry.target.result;
        image.onload = function() {
            // $('#dropzone').hide()
            $('#imagezone').show()
    document.getElementById('imagezone').innerHTML=`<img id=image src="${image.src}" alt="">` 
          
        };
      });
      
      reader.readAsDataURL(file);
      done();
    }
  
}
