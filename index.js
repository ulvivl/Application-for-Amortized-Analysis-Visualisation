
document.getElementById('nav').onclick= function(event) {
    var target = event.target; // где был клик?
    if (target.className == 'menu-item') {
        var s=target.getElementsByClassName('submenu');
        closeMenu();
        s[0].style.display='block';
        <script type="text/javascript">
                  document.body.innerHTML = '';

    }
}
document.onmousemove=function(event) {
    var target = event.target; // где был клик?
    console.log(event.target);
    if (target.className!='menu-item' && target.className!='submenu') {
        closeMenu();
    }
}
function closeMenu(){
    var menu=document.getElementById('nav');
    var subm=document.getElementsByClassName('submenu');
    for (var i=0; i<subm.length; i++) {
        subm[i].style.display="none";
    }
}
