//avplay.js
var an=0, salen=0, vn=0, svlen=0, delay=0;
var loop=false, shuffle=false, vplaying=false;
plist=new Array();
vplist=new Array();
function sequentialArray(){
for(var i=0;i<mlist.length;i++){plist[i]=mlist[i];}
for(var i=0;i<vlist.length;i++){vplist[i]=vlist[i];}
}
sequentialArray();
function shuffleArray(d){
for(var c=d.length-1;c>0;c--){
var b=Math.floor(Math.random() * (c+1));
var a=d[c];
d[c]=d[b];
d[b]=a;}
return d
}
function doloop(){
if(loop){
loop=false;
document.getElementById("b2").style.background="white";
salen=plist.length;
svlen=vplist.length;}
else{
loop=true;
salen=0;
svlen=0;
document.getElementById("b2").style.background="palegreen";}
}
function doshuffle(){
if(shuffle){
shuffle=false;
salen=0;
svlen=0;
sequentialArray();
document.getElementById("b1").style.background="white";}
else{
shuffle=true;
salen=plist.length;
svlen=vplist.length;
shuffleArray(plist);
shuffleArray(vplist);
document.getElementById("b1").style.background="palegreen";}
}
function hidemarks(mark){
var n=document.getElementsByClassName(mark).length;
for(var i=0;i<n;i++){
document.getElementsByClassName(mark)[i].style.visibility='hidden';}
}
function movemarker(mark,posn){
hidemarks(mark);
document.getElementsByClassName(mark)[posn].style.visibility='visible';
}
//***audio only
function initaudio(y){
if(vplaying){delay=100;document.getElementById("player").src = "";}//kill video player
else {delay=0;}
vplaying=false;
hidemarks(vmk);
salen=plist.length;
an=plist.indexOf(mlist[y]);
setTimeout(function() {openaudio(an);}, delay);//wait a bit before opening audio
return false;
}
function openaudio(x){
var content = '<!DOCTYPE html><HTML lang="en">'
 + '<head><META charset="utf-8">'
 + '<style>article {float:left;width:60%;font-weight:bold;}'
 + 'audio {display:block;} figure {margin:0; padding:0;} #tleft, #tmiddle {float:left;}'
 + '#tleft img {width:'+plist[x][3]+'px; height:'+plist[x][4]+'px;}'
 + '#tmiddle img {width:'+plist[x][6]+'px; height:'+plist[x][7]+'px; padding-left:5px;}</style>'
 + '<script>function listener(){'
 + 'document.getElementsByTagName("audio")[0].addEventListener("ended",parent.newAsrc,false);}<\/script>'
 + '</HEAD><body onload="listener()"><article>'
 + '<AUDIO controls autoplay>'
 + '<source src="'+plist[x][0]+'.ogg" type="audio/ogg"/>'
 + '<source src="'+plist[x][0]+'.mp3" type="audio/mpeg"/></AUDIO>'
 + '&nbsp;Playing: '+plist[x][1]+'.</article>'
if(plist[x][2]){content+='<figure id="tleft">'
 + '<img src="'+plist[x][0]+'.jpg" ALT="'+plist[x][0]+'"><p>'
 + '<figcaption><b>'+plist[x][2]+'</b></figcaption></figure>'}
if(plist[x][5]){content+='<figure id="tmiddle">'
 + '<img src="'+plist[x][0]+'1.jpg" ALT="'+plist[x][0]+'1"><p>'
 + '<figcaption><b>'+plist[x][5]+'</b></figcaption></figure>'}
content+='</body></html>';
var ifr = document.getElementById("player");
ifr.contentWindow.document.open('text/html', 'replace');
ifr.contentWindow.document.write(content);
ifr.contentWindow.document.close();
if(plist[x][8]){parent.frames["libretto"].location.href=plist[x][8]+'.html';}
if(plist[x][9]){parent.frames["synopsis"].location.href=plist[x][9]+'.html';}
movemarker(amk,mlist.indexOf(plist[x]));
return false;
}
function newAsrc(){
++an;
if((shuffle)&&(salen>0)){
salen--;}
if((shuffle)&&(salen==0)&&(!loop)){
hidemarks(amk);
return document.getElementById("player").src = nullpage;}
if(an>=plist.length){
if((loop)||(shuffle)){
an=0;}
else{
hidemarks(amk);
return document.getElementById("player").src = nullpage;}}
return openaudio(an);
}
//***video only
function initvideo(y){
hidemarks(amk);//clear audio markers
svlen=vplist.length;
vplaying=true;
vn=vplist.indexOf(vlist[y]);
movemarker(vmk,vlist.indexOf(vplist[vn]));
document.getElementById("player").src = vplist[vn];
return false;
}
function openvideo(x){
movemarker(vmk,vlist.indexOf(vplist[x]));
document.getElementById("player").src = vplist[x];
}
function newVsrc(){
++vn;
if((shuffle)&&(svlen>0)){
svlen--;}
if((shuffle)&&(svlen==0)&&(!loop)){
hidemarks(vmk);
return document.getElementById("player").src = nullpage;}
if(vn>=vplist.length){
if((loop)||(shuffle)){
vn=0;}
else{
hidemarks(vmk);
return document.getElementById("player").src = nullpage;}}
return openvideo(vn);
}
//if(top.location != self.location){top.location.replace(self.location);}
//end