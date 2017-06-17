var loopPlayInit = (function(){
	var $butLeft = null,
	$butRight = null,
	$butPlay = null,
	$imglist = null,
	imgArr = [['1.jpg','2.jpg','3.jpg','4.jpg'],['5.jpg','6.jpg','7.jpg','8.jpg'],['9.jpg','10.jpg','11.jpg','12.jpg']];
     imgArrIndex=0;
	function init() {
		$butLeft = $(".butLeft"),
		$butRight = $(".butRight"),
		$butPlay = $(".butPlay"),
		$imglist = $(".mainbox ul li");

		configer();
	}

	function configer(){
		$imglist.each(function(){
			var $this=$(this);
			$this.transform({rotate:"15deg"});
		})
	}
	//set click
	function setEvent(){
		$butLeft.bind("click",function(){
			anigo(-1);
			return false;
		})
		$butRight.bind("click",function(){
			anigo(1);
			return false;
		})
		$butPlay.bind("click",function(){
			return false;
		})
	}
	//set go img
	function anigo(d){
		imgArrIndex += d;
		$imglist.each(function(i){
			var $thisItme = $(this);
			var	$thisimg = $thisItme.children('img');
			var	$targetImg = imgArr[imgArrIndex][i];
		})

	}

     

	return init;
	}
})();