loadheader()

$(window).resize(function() {
loadheader()
});

function loadheader(){
  if(document.body.clientWidth>=750){ 
    document.getElementById('topbar').innerHTML=`
    <p> <a href="/">MosaicTokyo </a> </p>
    <ul>
              <li><a href="./contact">Contact</a></li>
              <li><a href="./login">Log-In</a></li>
              <li><a href="#" onclick="modeUPLOAD(); return false;">Upload</a></li>
    </ul>
  `
  
}else{
    document.getElementById('topbar').innerHTML=`<p> <a href="/">MosaicTokyo</a> </p>             
    <div class="dropdown">
    <button class="dropbtn"><img src="/images/three-bars-icon-5.jpg" alt=""></button>
       <div class="dropdown-content">
   <a href="./contact">Contact</a>
   <a href="./login">LogIn</a>                     
   <a href="#" onclick="modeUPLOAD(); return false;">Upload</a>
     </div>`
     $('#canvasbtn').css({'right':'10%'});
}
}
$('.dropbtn').click(function(){
  if($('.dropdown-content').css('display')=='none'){
    $('.dropdown-content').css({'display':'block'})
  }else{
    $('.dropdown-content').css({'display':'none'})
  }
  

});


$(document).ready(function () {
  if (window.history && window.history.pushState) {
      $(window).on('popstate', function () {
          $(currentoverlay).css('display', 'none')
      });
  }
});