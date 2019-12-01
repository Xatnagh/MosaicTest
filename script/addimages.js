var locationlist=[]
var bottomleft
var height,width;
function makelist(l1,l2){
if(l1<1||l2<1||l1>1440000||l2>1440000){
    alert("one of the squares you selected is outside of the mosaic, please choose your locations again")
    location1=null
    location2=null
    uploading=true;
    return;
}
var topcorner= Math.max(l1,l2);
var bottomcorner=Math.min(l1,l2);
var bottomright

height =Math.floor(topcorner/1200.00001)-Math.floor(bottomcorner/1200.00001)+1

if((topcorner-(height-1)*1200)<bottomcorner){
   
    bottomleft=topcorner-(height-1)*1200 
   bottomright=bottomcorner
   }else{
    bottomleft= bottomcorner
   bottomright=topcorner-(height-1)*1200
   }
  
width= bottomright-bottomleft+1;


    if(width*height>10000){
        alert('the area you chose is absolutely massive, please wait while the computer processes it, you might want to reset your browser if the website begin to lag')
    }
    
    for(var i=0;i<height;i++){
        for(var j=bottomleft;j<=bottomright;j++){
        locationlist.push(j+i*1200)
        }
    }
   
    uploading=false
   
    arraytosend={
        'arraytosend':JSON.stringify(locationlist) ,
        'level':3,
    }
    
    $.ajax({
        url: "/update",
        data: arraytosend,
        type: "GET",
       success: function(layer3image) {   
          layer3image=JSON.parse(layer3image)       
          imageexist=layer3image['bool']
        var addimgscale=1200
        sendDataToLoad(layer3image['img_location'],layer3image['img_imgurl'],addimgscale,layer3image['img_scaleX'],layer3image['img_scaleY'],layer3image['img_level']);    
          if(imageexist){
              alert('Image already exist for another user in your chosen area!')
              uploading=true;
              locationlist=[]
          }else{
            alreadyloaded_level3=alreadyloaded_level3.concat(layer3image['img_location'])
            sendDataToLoad([bottomleft],[image],1200,[width],[height],[4])
          }
           }
    });
    
}



var uploading=false;
function modeUPLOAD(){
    update_url()
    uploading=!uploading
    $('.dropdown-content').hide()
    $('#dropzone').toggle()
    }


function modeUPLOAD_2(){
    $('#uploadbtn').hide()
    $('#dropzone').hide()
    $('#cancelbtn').hide()
    $('#confirmbtn').hide()
    $('#confirm').toggle()

  }
    
function confirmupload(){
    if(locationlist.length!=0){
        var temp=getlayersoflocation(locationlist)
        var layer1=temp['layer1']
    var layer2=temp['layer2']
    console.log(layer2)
    for(var i=0;i<layer2.length;i++){
        loadlocationimage(layer2[i],2)
    }
    // for(var i=0;i<layer1.length;i++){
    //     loadlocationimage(layer1[i],1)
    // }

        
        // localStorage.setItem('image', image);
        // localStorage.setItem('location',JSON.stringify(locationlist))
        // localStorage.setItem('pointerlocation',bottomleft)
        // localStorage.setItem('width',width)
        // localStorage.setItem('height',height)
    //  window.location.href = "./addImage";   
    }
    else{
        alert("You didn't select where you want to put your image!")
    }  
}


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

$('#cancelbtn').click(function(){
    $('#cancelbtn').hide()
            $('#confirmbtn').hide()
    document.getElementById('pewviewimg').src='';
    $('#imagezone').hide()
    image=null
    $('.dropzone')[0].dropzone.files.forEach(function(file) { 
        file.previewElement.remove(); 
      });
      $('.dropzone').removeClass('dz-started');
});

$('#confirmbtn').click(function(){
    
    if(document.getElementById('pewviewimg')!=null){
        image=document.getElementById('pewviewimg').src 
       modeUPLOAD_2();
    }else{
        alert('there is no image!')
    }
    
}); 
//for url images
$('#submit').click(function(){
    $('#cancelbtn').show()
    $('#confirmbtn').show()
     image=document.getElementById('imageurl').value
      document.getElementById('pewviewimg').src=image
    $('#imagezone').show()
    update_url()
});


    Dropzone.options.dz = {
    autoProcessQueue: false,
    maxFiles: 1,
    acceptedFiles: 'image/jpeg,image/png,image/jpg',
    previewTemplate: '<div class="dz-filename"><span data-dz-name></span></div>',
    createImageThumbnails: false,
    init: function() {
        this.on("addedfile", function() {
            while (this.files.length > this.options.maxFiles) {
                this.removeFile(this.files[0]);
            }
        });
    },
    accept: function(file, done) {
      // FileReader() asynchronously reads the contents of files (or raw data buffers) stored on the user's computer.
      var reader = new FileReader();
      reader.onload = (function(entry) {
        // The Image() constructor creates a new HTMLImageElement instance.
        image = new Image(); 
        image.name='image'
        image.src = entry.target.result;
        image.onload = function() {
            $('#imagezone').show()
            update_url()
          $('#cancelbtn').show()
            $('#confirmbtn').show()
    document.getElementById('pewviewimg').src=image.src
          
        };
      });
      
      reader.readAsDataURL(file);
      done();
    }
  
}
