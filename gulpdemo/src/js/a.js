//a.js
var touchFlag = false;
var touchY = 0;
var distanceY = 0;
var Y = 0;
$(document.body).on('touchmove', function(e){
  e.stopPropagation();
  // console.log(e.stopPropagation);
});
$("div.content").on('touchstart', ".item-slide", function(e){
  touchFlag = true;
  touchY = e.touches[0].pageY;
  // console.log("touchstart>>>" + touchY);
});

$("div.content").on('touchmove', ".item-slide", function(e){
  touchFlag = true;
  distanceY = e.touches[0].pageY - touchY;
//   console.log("touchmove>>>>" + distanceY);
});
