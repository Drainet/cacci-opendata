function dataLoad(list){
	var fileObj = parseFileListToObject(list);
	var filePromise = new Promise(function(resolve, reject){

		LoadDataFromFileList(fileObj);
		resolve(fileObj);
	});

	filePromise.then(function(val){
		barChartData = val;
		var range = val.index;

		for( var i = 0 ; i < range.length ; i++ ){
			var year = range[i];
			var data = getBoundPoints.call(val, year);
			data.sort(function(a, b){ return a.X-b.X });
			var BC = makeBarChart(data, 200, 100, year)
			BCArray.push(BC);
			
		}
	})
}

function parseFileListToObject(list){
	var jsonList = { "index":[] };
	list.forEach( function(file) {
			file = file.replace(/\s+/g, "");
			year = "y" + file.match(/\d+/g)[0];
			month = "m" + file.match(/\d+/g)[1];
			if( jsonList[year] == undefined ){
				jsonList[year] = { "index":[] };
				jsonList.index.push( year );
			}
			jsonList[year][month] = file;
			jsonList[year].index.push( month );
		});
	return jsonList;
}

function LoadDataFromFileList(list){
	list.index.forEach( getDataByIndex, list );
}

function getDataByIndex( index ){
	var year = this[index];
	year.index.forEach( getFileByMonth, year);
	
}

function getFileByMonth( month ){
	var file = this[month];
	//console.log(file);
	switch( checkFileType(file) ) {
    case "csv":
        parseFile.call(this, file, "csv");
        break;
    case "tsv":
        parseFile.call(this, file, "tsv");
        break;
    default:
        console.log("can't open File, because of file's type")
	}
}

function checkFileType( filename ){
	return filename.match(/\wsv$/g)[0];
}

function parseFile( file, fileType ){
	var month = "m" + file.match(/\d+/g)[1], target = this;
	d3[fileType]("data/" + file, type, function(error, data){
		data.forEach
		target[month] = data;
	});
}