exports.createHeader = function(title, type) {

	switch(type) {

	case 1:
		//Header only with title
		var viewHeader = Ti.UI.createView({
			top : '0dp',
			height : '46dp',
			width : Ti.UI.FILL,
			backgroundColor : '#de4c3f'
		});

		var viewForHeaderLabel = Ti.UI.createView({
			//left : '75dp',
			//right : '62dp',
			width : Ti.UI.SIZE,
			height : Ti.UI.FILL,
			//id : 'lbl',
			//backgroundSelectedColor : '#c64135',
		});

		var labelHeader = Ti.UI.createLabel({
			text : title,
			//left : 0,
			width : Ti.UI.SIZE,
			color : '#ffffff',
			height : "34dp", //Ti.UI.FILL,
			font : {
				fontSize : '15sp'
			},
			id : 'lbl',
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			//backgroundSelectedColor : '#c64135',
			wordWrap : false,
			ellipsize : true
		});

		viewForHeaderLabel.add(labelHeader);
		viewHeader.add(viewForHeaderLabel);
		viewForHeaderLabel = null;
		labelHeader = null;

		return viewHeader;
		break;
	case 2:
		//Header with back button
		var vwHeader = Ti.UI.createView({
			top : '0dp',
			height : '46dp',
			width : Ti.UI.FILL,
			backgroundColor : '#de4c3f'
		});

		var viewForHeaderLabel = Ti.UI.createView({
			left : '42dp',
			right : '42dp',
			//width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			//id : 'lbl',
			//backgroundSelectedColor : '#c64135',
		});

		var lblHeader = Ti.UI.createLabel({
			text : title,
			width : Ti.UI.SIZE,
			//left : '40dp',
			color : '#ffffff',
			height : "34dp", //Ti.UI.FILL,
			font : {
				fontSize : '15sp'
			},
			id : 'lbl',
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			//backgroundSelectedColor : '#c64135',
			wordWrap : false,
			ellipsize : true
		});

		var vwBack = Ti.UI.createView({
			top : '0dp',
			height : '46dp',
			width : '40dp',
			id : 'back',
			left : '0dp',
			backgroundSelectedColor : '#c64135'//'#f2401e',
		});

		//Event for applying click effect on ios devices

		if (Ti.Platform.osname !== 'android') {
			vwBack.addEventListener('touchstart', function(e) {
				e.source.backgroundColor = "#c64135";
			});

			vwBack.addEventListener('touchcancel', function(e) {
				e.source.backgroundColor = "transparent";
			});

			vwBack.addEventListener('touchend', function(e) {
				e.source.backgroundColor = "transparent";
			});

		}

		var imgBack = Ti.UI.createImageView({
			width : '40dp',
			height : '40dp',
			image : '/images/top-back-arrow.png',
			id : 'back',
			touchEnabled : false
		});

		viewForHeaderLabel.add(lblHeader);
		lblHeader = null;
		vwBack.add(imgBack);
		imgBack = null;
		vwHeader.add(viewForHeaderLabel);
		viewForHeaderLabel = null;
		vwHeader.add(vwBack);
		vwBack = null;

		var vwEdit = Ti.UI.createView({
			height : '46dp',
			width : '80dp',
			id : 'edit',
			right : '0dp',
			backgroundSelectedColor : '#c64135'//'#f2401e',
		});

		//Event for applying click effect on ios devices

		if (Ti.Platform.osname !== 'android') {
			vwEdit.addEventListener('touchstart', function(e) {
				e.source.backgroundColor = "#c64135";
			});

			vwEdit.addEventListener('touchcancel', function(e) {
				e.source.backgroundColor = "transparent";
			});

			vwEdit.addEventListener('touchend', function(e) {
				e.source.backgroundColor = "transparent";
			});

		}

		vwEdit.add(Ti.UI.createLabel({
			text : "Edit",
			width : Ti.UI.SIZE,
			//left : '40dp',
			color : '#ffffff',
			height : "34dp", //Ti.UI.FILL,
			font : {
				fontSize : '15sp'
			},
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			touchEnabled : false
		}));
		vwHeader.add(vwEdit);
		vwEdit = null;

		return vwHeader;
		break;

	}
};
