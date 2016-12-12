//b.js
$("div.content").on('touchend', ".item-slide", function(e){
  if(!touchFlag){
    return;
  }
  var $this = $(this);
  var $next = $this.next();
  var $pre = $this.prev();
  var translateY = $this.height();
  // console.log(translateY);
  if(distanceY > 0 && $pre.length > 0){
  	 /* 方案2*/
  	 $this.addClass("zindex").addClass("transform");
  	 $pre.removeClass("zindex").removeClass("transform")
  	 			.css("transform", "translateY(0)");
     $this.css("transform", "translateY(" + translateY +"px)");
      /*方案1*/
    // Y += translateY;
    //  $("ul.list-slide").css("transform", "translateY(" + Y +"px)");
  }
  if(distanceY < 0 && $next.length > 0){
  	/* 方案2*/
		$this.addClass("zindex").addClass("transform");
    $next.addClass("active").removeClass("zindex").removeClass("transform")
    				.css("transform", "translateY(0)");
    $this.css("transform", "translateY(" + (0-translateY) +"px)");
    /*方案1*/
    //  Y -= translateY;
    //  $("ul.list-slide").css("transform", "translateY(" + Y +"px)");
  }
  distanceY = 0;
  touchFlag = false;
});