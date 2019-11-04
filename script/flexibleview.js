
if(screen.width>900){ 
    console.log('boo')
    document.getElementById('topbar').innerHTML=`
    <p> <a href="/">MosaicTokyo </a> </p>
    <ul>
              <li><a href="./contact">Contact</a></li>
              <li><a href="./login">Log-In</a></li>
              <li><a href="./addImage">Upload</a></li>
    </ul>
  `
}else{
    document.getElementById('topbar').innerHTML=`<p> <a href="/">MosaicTokyo</a> </p>             
    <div class="dropdown">
    <button class="dropbtn"><img src="/images/three-bars-icon-5.jpg" alt=""></button>
       <div class="dropdown-content">
   <a href="./contact">Contact</a>
   <a href="./login">LogIn</a>                     
   <a href="./addImage">Upload</a>
     </div>`
}
