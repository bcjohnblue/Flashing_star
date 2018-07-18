function flashingStar(delayTime, flashingTime, failTime) {
	if(passTimes >= passScore) {
		console.log("Pass!");

		//將背景圖 放大
		$(".bg").css("animation", "bg-scaleUp 15s ease-out forwards");
		// 加入 galaxy 的圖片
		append_imgGalaxy();
		append_textGalaxy();
		return;
	};

	var starShow = setTimeout(function() {
		var container = document.createElement("div")
		container.setAttribute("id", "container");

		var imgStar = document.createElement("img");
		imgStar.src = "img/star.png";
		imgStar.setAttribute("id", "imgStar");
		var galaxy = document.getElementById("galaxy");

		container.appendChild(imgStar);
		galaxy.appendChild(container);
	
		var topOffset = Math.random()*(window.innerHeight-100); // 隨機出現星星的位置
		var leftOffset = Math.random()*(window.innerWidth-100);
		
		var flashToggle = setInterval(function() {
			$("#container").children().toggle(); // $("#container").children() === <img>
			$("#container").css("top", topOffset + "px"); // 定位要定container的
			$("#container").css("left", leftOffset + "px");
		}, flashingTime)

		// 處理 成功點擊星星 的狀況
		$("#container").click(function(e) {
			$(this).remove(); // 移除掉 container
			clearInterval(flashToggle);
			clearTimeout(starShow);
			clearTimeout(failShow); // 有點擊到的話消除 fail 訊息
			delayTime *= 2/3; // 每次的 delay 時間越來越短
			flashingTime *= 9/10; // 每次的 星星閃爍 時間越來越短
			passTimes += 1;
			flashingStar(delayTime, flashingTime, failTime);
		})

		failTime *= 9/10;
		// console.log(failTime);

		// 處理 fail 的狀況
		var failShow = setTimeout(function() {
			// console.log("fail");
			var button = $("<button id=\'replayButton\'> \
							<img src=\'open-iconic-master/svg/reload.svg\' id=\'icon\'> \
							<span id=\'replayFont\'>重新</span> \
							</button> \
						 ")
			$("#container").remove();
			clearInterval(flashToggle);
			clearTimeout(starShow);
			clearTimeout(failShow);

			$("#galaxy").append(button);
			$(button).on("click", function() {
				history.go(0);	// refresh
			})
		}, failTime)	
	}, delayTime)
}