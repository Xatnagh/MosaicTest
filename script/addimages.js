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
var bottomright
height =Math.floor(topcorner/1200)-Math.floor(bottomcorner/1200)+1

if((topcorner-(height-1)*1200)<bottomcorner){
    bottomleft=topcorner-(height-1)*1200 
   bottomright=bottomcorner
   }else{
       bottomleft= bottomcorner
   bottomright=topcorner-(height-1)*1200
   }
width= bottomright%1200-bottomleft%1200+1;

    if(width*height>10000){
        alert('the area you chose is absolutely massive, please wait while the computer processes it, you might want to reset your browser if the website begin to lag')
    }
    
    for(var i=1;i<height;i++){
    
        for(var j=bottomleft;j<=bottomright;j++){
        locationlist.push(j+i*1200)
        }
    }
    getlayersoflocation()
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
          imageexist=result['bool']
        var addimgscale=1200
        sendDataToLoad(result['img_location'],result['img_imgurl'],addimgscale,result['img_scaleX'],result['img_scaleY'],result['img_level']);    
          if(imageexist){
              alert('Image already exist for another user in your chosen area!')
              uploading=true;
          }else{
            alreadyloaded_level3=alreadyloaded_level3.concat(result['img_location'])
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
    if($('#confirm').css('display')=='none'){
        $('#confirm').css({'display':'block'})
      }else{
        $('#confirm').css({'display':'none'})
      }
    
  }
    
function confirmupload(){
    if(locationlist.length!=0){
        getlayersoflocation(locationlist)
        localStorage.setItem('image', image);
        localStorage.setItem('location',JSON.stringify(locationlist))
        localStorage.setItem('pointerlocation',bottomleft)
        localStorage.setItem('width',width)
        localStorage.setItem('height',height)
     window.location.href = "./addImage";   
    }
    else{
        alert("You didn't select where you want to put your image!")
    }  
}
function getlayersoflocation(locationlist){
    var layer1=[];
    var layer2=[];

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
