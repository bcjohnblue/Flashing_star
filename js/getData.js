function getData(url, callback) {
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		crossDomain: true, // force a crossDomain request
		dataType: 'jsonp', // 利用 jsonp 跨域
		success: callback
	})
}

function loadGalaxy(data) {
	$.each(data, function(key, value) { 
		// key=0 value={id: 3524, name: "Westerlund 2: Detail 2", news_name: "a"}
		if(value.name === "Westerlund 2: Detail 2") {
			getData("http://hubblesite.org/api/v3/image/" + value.id, function(data) {
				console.log(data);
				console.log(data.image_files[7].file_url);
				file_url = data.image_files[7].file_url;
				
				// 預先載入圖片				
				var preloadImg = new Image();
				preloadImg.src = file_url;
			})
		}	
	})
}

function append_imgGalaxy() {
	setTimeout(function() {
		var imgGalaxy = document.createElement("img");
		imgGalaxy.src = file_url;
		imgGalaxy.setAttribute("id", "imgGalaxy");
		galaxy.appendChild(imgGalaxy);
	}, 2000)
}

function append_textGalaxy() {
	setTimeout(function() {
		var div = document.createElement("div")
		div.setAttribute("id", "textGalaxy")
		div.innerHTML = "Welcome to the Westerlund 2 cluster~~"
		galaxy.appendChild(div);
		$("div").fadeIn(5000);
	}, 10000)
}