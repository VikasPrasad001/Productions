var winAnswer = null;

//This Js is only for display disclaimer of any question
exports.answerViewCreation = function(questionObjView, andwerData) {
	if (winAnswer === null) {
		winAnswer = Ti.UI.createWindow({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			left : '0dp',
			orientationModes : [Ti.UI.PORTRAIT],
			navBarHidden : true,
			exitOnClose : false,
			fullscreen : false,
			top : '0dp',
		});
		
		winAnswer.addEventListener('androidback', function(e) {
			exports.removeAnswerScreen();
		});

		var answerView = Ti.UI.createView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			backgroundColor : '#e5e5e5',
		});
		winAnswer.add(answerView);

		//--------------------- adding header

		var header = require('common/headers').createHeader('Answer - ' + (parseInt(questionObjView.childrenthNumber) + 1), 2);

		header.backgroundColor = questionObjView.themeColor;

		answerView.addEventListener('click', function(e) {
			Ti.API.info(e.source.id);
			if (e.source.id === 'back') {
				exports.removeAnswerScreen();
			} else if (e.source.id === 'edit') {
				winAnswer.children[0].children[0].children[2].id = "update";
				winAnswer.children[0].children[0].children[2].children[0].setText("Update");
				winAnswer.children[0].children[1].children[0].removeAllChildren();
				winAnswer.children[0].children[1].children[0].add(Ti.UI.createTextArea({
					top : '8dp',
					left : '10dp',
					color : '#000000',
					right : '10dp',
					height : Ti.UI.SIZE,
					font : {
						fontSize : '14sp'
					},
					value : questionObjView.children[1].text
				}));
				winAnswer.children[0].children[1].children[0].children[0].setSelection(winAnswer.children[0].children[1].children[0].children[0].value.length, winAnswer.children[0].children[1].children[0].children[0].value.length);
				setTimeout(function() {
					winAnswer.children[0].children[1].children[0].children[0].focus();
				}, 200);

			} else if (e.source.id === 'update') {
				if (winAnswer.children[0].children[1].children[0].children[0].value.trim() == "") {
					Titanium.UI.createNotification({
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT,
						message : "Question text should not be empty.",
					}).show();
				} else {
					var editQuestion = winAnswer.children[0].children[1].children[0].children[0].value;
					winAnswer.children[0].children[0].children[2].id = "edit";
					winAnswer.children[0].children[0].children[2].children[0].setText("Edit");
					winAnswer.children[0].children[1].children[0].removeAllChildren();
					winAnswer.children[0].children[1].children[0].add(Ti.UI.createLabel({
						top : '8dp',
						left : '10dp',
						color : '#000000',
						right : '10dp',
						height : Ti.UI.SIZE,
						font : {
							fontSize : '14sp'
						},
						text : editQuestion + '\n'
					}));
					questionObjView.children[1].text = editQuestion;
				}
			}
		});

		answerView.add(header);
		header = null;

		var scrvwAnswers = Ti.UI.createScrollView({
			top : '46dp',
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			contentWidth : Ti.UI.FILL,
			backgroundColor : '#e6e6e6',
			layout : 'vertical'
		});

		var vwheader = Ti.UI.createView({
			top : '5dp',
			left : '5dp',
			right : '5dp',
			height : Ti.UI.SIZE,
			backgroundColor : '#ffffff'
		});

		vwheader.add(Ti.UI.createLabel({
			top : '8dp',
			left : '10dp',
			color : '#000000',
			right : '10dp',
			height : Ti.UI.SIZE,
			font : {
				fontSize : '14sp'
			},
			text : questionObjView.children[1].text + "\n"
		}));

		scrvwAnswers.add(vwheader);
		vwheader = null;

		var answerInnerView = Ti.UI.createView({
			top : '5dp',
			left : '5dp',
			right : '5dp',
			height : Ti.UI.SIZE,
			layout : 'vertical',
			backgroundColor : '#ffffff'
		});

		for (var i = 0; i < andwerData.length; i++) {
			answerInnerView.add(Ti.UI.createLabel({
				top : '20dp',
				left : '20dp',
				right : '20dp',
				height : Ti.UI.SIZE,
				color : '#464545',
				bottom : '20dp',
				font : {
					fontSize : '13sp'
				},
				text : andwerData[i].message
			}));

			answerInnerView.add(Ti.UI.createView({
				top : '0dp',
				left : '5dp',
				right : '5dp',
				height : '1dp',
				backgroundColor : '#e6e6e6'
			}));
		}

		scrvwAnswers.add(answerInnerView);
		answerInnerView = null;

		answerView.add(scrvwAnswers);
		scrvwAnswers = null;
		winAnswer.open();
	}
};

exports.removeAnswerScreen = function() {
	if (winAnswer !== null) {
		winAnswer.close();
		winAnswer = null;
	}
};
