vwActIndicator = null;
exports.addScrollLoader = function(view, top) {

	if (vwActIndicator === null) {

		vwActIndicator = Ti.UI.createView({
			backgroundColor : 'transparent',
			height : Ti.UI.SIZE,
			zIndex : 15,
			visible : true,
			//top : top === "" ? '0dp' : top

		});

		if (top != "") {
			vwActIndicator.top = top;
		}
		var loader = Titanium.UI.createActivityIndicator({
			//style : Ti.UI.ActivityIndicatorStyle.BIG_DARK,
			style : (Ti.Platform.osname == 'android') ? Titanium.UI.ActivityIndicatorStyle.BIG_DARK : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
			//color : '#fff',
			height : '50dp',
			width : '50dp',
		});

		loader.show();

		vwActIndicator.add(loader);
		view.add(vwActIndicator);
	}
};

exports.removeScrollLoader = function() {
	if (vwActIndicator !== null) {
		if (vwActIndicator.parent !== undefined && vwActIndicator.parent !== null) {
			vwActIndicator.parent.remove(vwActIndicator);
			vwActIndicator = null;
		}
	}
};

var vwActIndicator1 = null;
exports.createCheckOutLoader = function(view) {
	if (vwActIndicator1 === null) {
		vwActIndicator1 = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			zIndex : 100,

		});

		var loader = Titanium.UI.createActivityIndicator({
			style : (Ti.Platform.osname == 'android') ? Titanium.UI.ActivityIndicatorStyle.BIG_DARK : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
			height : '45dp',
			width : '45dp',
			zIndex : 15,
			color : '#fff',
			right : '10dp'

		});

		loader.show();

		vwActIndicator1.add(loader);
		view.add(vwActIndicator1);
	}
};
exports.removeCheckOutLoader = function() {

	if (vwActIndicator1 !== null) {
		if (vwActIndicator1.parent !== undefined) {
			vwActIndicator1.parent.remove(vwActIndicator1);
			vwActIndicator1 = null;
		}
	}
};
