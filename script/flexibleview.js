loadheader()

$(window).resize(function() {
loadheader()
});

function homebtn(){
  if (window.location.href.split('/').pop() === ""||Number(window.location.href.split('#').pop())>0) { 
    
      return '<a onclick="modeUPLOAD();"id= uploadbtn>Upload</a>'
}
  else{
    return '<a href="./">Home</a>'
  }
}


function loadheader(){
  if(document.body.clientWidth>=750){ 
    document.getElementById('topbar').innerHTML=`
    <p> <a href="/">MosaicTokyo </a> </p>
    <ul>
              <li><a href="./contact">Contact</a></li>
              <li><a href="./login">Log-In</a></li>
              <li>${homebtn()}</li>
              
              
    </ul>
  `

}else{
    document.getElementById('topbar').innerHTML=`<p> <a href="/">MosaicTokyo</a> </p>             
    <div class="dropdown">
    <button id="dropbtn" onclick=toggledropdowncontent();><img src="/images/three-bars-icon-5.jpg" alt=""></button>
       <div class="dropdown-content">
          <a href="./contact">Contact</a>
          <a href="./login">LogIn</a>                     
          ${homebtn()}
       </div>`
     
}

}
function toggledropdowncontent(){
  $('.dropdown-content').toggle()
}



var times = 0;
function update_url() {
   times++;
   location.hash = times;
}

window.onhashchange = function() {  
    if(location.hash<1){
      $('.overlay').hide()
      times=0
      window.location.href.split('#')[0]
    }
   
  
}

