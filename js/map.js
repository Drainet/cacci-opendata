function getBoundPoints(year){
	var data = [], mapCurrentBound = map.getBounds();
	var range = this[year].index;
	for( var i = 0 ; i < range.length ; i++ ){
		var month = range[i];
		data.push( CheckEachMonthPoints(month, this[year][month], mapCurrentBound) );
	}
	return data;
}

function CheckEachMonthPoints(month, points, mapBound){
	var match = { "X": month.match(/\d+$/)[0] , "Y":0 };
	for( var i = 0 ; i < points.length ; i++ ){
		if( insideBound(points[i] , mapBound) )
			++match.Y;
	}
	return match;
}

function insideBound(position, bound){
	if(position.Y > bound.za.A && position.Y <= bound.za.j)
		return position.X < bound.qa.A && position.X >= bound.qa.j
	return false;
}

