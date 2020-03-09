var locationlist=[]
var upperlocation=[]
var bottomleft
var height,width;
function makelist(l1,l2){//given two location from any corner checks the bround, determine wheter an image is already there or not, if not, display the image
if(l1<1||l2<1||l1>1440000||l2>1440000){
    alert("one of the squares you selected is outside of the mosaic, please choose your locations again")
    setTimeout('removeselected()',100) //timeout because sometimes button 2 won't get deleted
    return;
}
var topcorner= Math.max(l1,l2);
var bottomcorner=Math.min(l1,l2);
var bottomright;

height =Math.floor(topcorner/1200.00001)-Math.floor(bottomcorner/1200.00001)+1

if((topcorner-(height-1)*1200)<bottomcorner){
   
    bottomleft=topcorner-(height-1)*1200 
   bottomright=bottomcorner
   }else{
    bottomleft= bottomcorner
   bottomright=topcorner-(height-1)*1200
   }
  
    width= bottomright-bottomleft+1;

    if(width*height>1000000){
        alert('the area you chose is absolutely massive, please wait while the computer processes it, you might want to reset your browser if the website begin to lag')
    }
    //this makes the locationlist
    // for(var i=0;i<height;i++){
    //     for(var j=bottomleft;j<=bottomright;j++){
    //     locationlist.push(j+i*1200)
    //     }
    // }
   
    uploading=false
    upperlocation=getlayersoflocation(bottomleft,width,height)
    arraytosend={
        'bottomleft':bottomleft,
        'width':width,
        'height':height,
        'level':3,
    }
    console.log('width',width)
    console.log('height',height)

    showloadingscreen();
    document.getElementById('LoadingMessage').innerHTML="Please Wait while we check with the server"

    $.ajax({
        url: "/update_layers",
        data: arraytosend,
        type: "GET",
       success: function(areataken) {
           console.log(typeof(areataken))   
           hideloadingscreen();
          if(areataken=="False"){
              alert('Image already exist for another user in your chosen area!')
              removeselected()
          }else{
            sendDataToLoad([bottomleft],[image],1200,[width],[height],[4])
          }
           },
           error: function(){
               alert("something went wrong")
               hideloadingscreen();
           }
        
    });
    
}



var uploading=false;
function modeUPLOAD(){
    update_url()
    uploading=true
    $('.dropdown-content').hide()
    $('#dropzone').toggle()
    if($('#dropzone').css("display")=='none'){
        uploading=false;
    }
    }
function modeUPLOAD_2(){
    $('#uploadbtn').hide()
    $('#dropzone').hide()
    $('#cancelbtn').hide()
    $('#confirmbtn').hide()
    $('#confirm').toggle()

  }
  function cancelupload(){
   uploading=true
   canvas.requestRenderAll()
   layerfourarray[0].opacity=0
   location1=' ',location2= ' '
   layerfourarray=[]
   locationlist=[]
}
function confirmupload(){//confirm after user had uploaded
    if(upperlocation['layer2']!=0){
        var layer1=upperlocation['layer1']
        var layer2=upperlocation['layer2']

        localStorage.setItem('layer1',JSON.stringify(layer1))
        localStorage.setItem('layer2',JSON.stringify(layer2))
        localStorage.setItem('image', image);
        localStorage.setItem('pointerlocation',bottomleft)
        localStorage.setItem('width',width)
        localStorage.setItem('height',height)
     window.location.href = "./addImage";   

    }
    else{
        alert("You didn't select where you want to put your image!")
    }  
}


function removeselected(){
    for(let i=0;i<layerfourarray.length;i++){
        layerfourarray[i].opacity=0;
    }
    location1=''
    location2=''
    locationlist=[]
    canvas.requestRenderAll()
}
function cancelimageselection(){
    $('#cancelbtn').hide()
            $('#confirmbtn').hide()
    document.getElementById('pewviewimg').src='';
    $('#imagezone').hide()
    image=null
    $('.dropzone')[0].dropzone.files.forEach(function(file) { 
        file.previewElement.remove(); 
      });
      $('.dropzone').removeClass('dz-started');

}
function exitupload(){
    
    cancelimageselection()
    removeselected()
    $('#confirm').toggle()
    $('#exitupload').toggle()
    $('#uploadbtn').show()
    uploading=false;
}

$('#confirmbtn').click(function(){
    if(document.getElementById('pewviewimg')!=null){
        image=document.getElementById('pewviewimg').src 
       modeUPLOAD_2();
       $('#exitupload').toggle()
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
