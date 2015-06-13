var map;
function initialize(){
	var mProp = {
		center: new google.maps.LatLng(25.0345573, 121.5218498),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("googleMap"), mProp);

	// 當map拖拉結束時，確認畫面點點的總數量和觸發BarCharts變化
	google.maps.event.addListener(map, 'bounds_changed', changeBarChart);
	google.maps.event.addListenerOnce(map, 'idle', function(){
		dataLoad(filelist);
		changeBarChart();
	})
}

google.maps.event.addDomListener(window, 'load', initialize);