var winQuestion = null;

exports.questionViewCreation = function() {

	if (winQuestion === null) {

		winQuestion = Ti.UI.createWindow({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			left : '0dp',
			orientationModes : [Ti.UI.PORTRAIT],
			navBarHidden : true,
			exitOnClose : true,
			fullscreen : false,
			top : '0dp'
		});

		winQuestion.open();

		winQuestion.addEventListener('androidback', function(e) {
			exports.removeQuestion();
		});

		winQuestion.add(require('common/headers').createHeader("Question", 1));

		var questionListView = Ti.UI.createScrollView({
			width : Ti.UI.FILL,
			contentWidth : Ti.UI.FILL,
			height : Ti.UI.FILL,
			visible : true,
			backgroundColor : "#efefef",
			layout : 'vertical',
			top : '46dp' //temp
		});

		questionListView.addEventListener('click', function(e) {

			if (e.source.id == 'parent') {

				e.source.children[0].children[0].children[1].visible = true;
				e.source.children[0].children[0].children[0].visible = false;

				var network = require('common/networklayer').networkFact();
				network.GetToServer(network.answerUrl, 60000, onAnswerListLoad, onAnswerListError);

				function onAnswerListLoad() {
					e.source.children[0].children[0].children[1].visible = false;
					e.source.children[0].children[0].children[0].visible = true;
					var response = JSON.parse(this.responseText);
					if (response.status == true) {
						require('questionAndAnswer/answer').answerViewCreation(e.source, response.response[0].comments);
					}
				}

				function onAnswerListError(exe) {
					e.source.children[0].children[0].children[1].visible = false;
					e.source.children[0].children[0].children[0].visible = true;
					var toast = Ti.UI.createNotification({
						message : exe,
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT,
						bottom : '10dp',
						borderRadius : 50,
					});
					toast.show();
				}

			}
		});

		require('common/loader').addScrollLoader(questionListView, '150dp');

		setTimeout(function(e) {
			QuestionListFetchFromServer(questionListView);
		}, 300);

		winQuestion.add(questionListView);
		//questionListView = null;
	}
};

//Function for hitting the server for fetching the Company List
function QuestionListFetchFromServer(questionListView) {
	/*CODE FOR FETCHING Questions LIST OF USER*/
	var network = require('common/networklayer').networkFact();
	network.GetToServer(network.questionUrl, 60000, onQuestionListLoad, onQuestionListError);

	function onQuestionListLoad() {
		require('common/loader').removeScrollLoader();
		var response = JSON.parse(this.responseText);
		if (response.status == true) {

			var colorArray = ['#a7c23d', '#29c2d4', '#9c28b1', '#f8ce44', '#ff9703'];
			var viewCube = null,
			    countParentView = null,
			    countView = null,
			    loaderView = null,
			    loader = null,
			    countLabel = null;

			for (var i = 0; response.response.length > i; i++) {

				viewCube = Ti.UI.createView({
					top : '8dp',
					left : '8dp',
					right : "8dp", //'80dp',
					height : '80dp',
					backgroundColor : '#ffffff',
					borderRadius : 2,
					questionText : response.response[i].questionText,
					id : 'parent',
					childrenthNumber : i,
					themeColor : colorArray[i % 5]
				});

				countParentView = Ti.UI.createView({
					left : '0dp',
					height : '70dp',
					width : '70dp',
					touchEnabled : false
				});

				countView = Ti.UI.createView({
					height : '50dp',
					width : '50dp',
					borderRadius : 2,
					backgroundColor : colorArray[i % 5],
					touchEnabled : false
				});

				countLabel = Ti.UI.createLabel({
					color : '#ffffff',
					font : {
						fontSize : '27sp'
					},
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
					text : i + 1,
					touchEnabled : false,
					visible : true
				});
				countView.add(countLabel);
				countLabel = null;

				loaderView = Ti.UI.createView({
					height : '40dp',
					width : '40dp',
					touchEnabled : false,
					visible : false
				});
				loader = Titanium.UI.createActivityIndicator({
					style : Titanium.UI.ActivityIndicatorStyle.BIG_DARK,
					height : '30dp',
					width : '30dp',
				});

				loader.show();
				loaderView.add(loader);
				loader = null;
				countView.add(loaderView);
				loaderView = null;

				countParentView.add(countView);
				countView = null;
				viewCube.add(countParentView);
				countParentView = null;

				viewCube.add(Ti.UI.createLabel({
					left : '70dp',
					color : "#1e1e1e",
					top : '15dp',
					bottom : '15dp',
					right : '10dp',
					height : Ti.UI.SIZE,
					font : {
						fontSize : '13sp'
					},
					wordWrap : true,
					ellipsize : true,
					text : response.response[i].message,
					touchEnabled : 'false',
					textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT
				}));

				questionListView.add(viewCube);

				viewCube = null;
			}
			questionListView.height = Ti.UI.FILL;
			questionListView.visible = true;

		} else {
			var NoDataFoundView = Ti.UI.createView({
				top : '4dp',
				left : '4dp',
				right : '4dp',
				bottom : '4dp',
				backgroundColor : '#fff'
			});

			var NoDataFoundContainerView = Ti.UI.createView({
				height : Ti.UI.SIZE,
				layout : 'vertical'
			});

			var NoCmpFoundImage = Ti.UI.createImageView({
				top : '0dp',
				height : '108dp',
				width : '130dp',
				image : '/images/SomethingWentWrong.png'
			});
			NoDataFoundContainerView.add(NoCmpFoundImage);
			NoCmpFoundImage = null;

			var NoCmpFoundLabel = Ti.UI.createLabel({
				top : '15dp',
				color : '#a3a3a3',
				font : {
					fontSize : '22sp'
				},
				text : "Something wrong here"
			});
			NoDataFoundContainerView.add(NoCmpFoundLabel);
			NoCmpFoundLabel = null;

			var NoDataFoundCmtLabel = Ti.UI.createLabel({
				top : '15dp',
				color : '#a3a3a3',
				right : '40dp',
				left : '40dp',
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				font : {
					fontSize : '14sp'
				},
				text : "Sorry we're having some technical issue (as you can see) try to refresh the page. Something works."
			});
			NoDataFoundContainerView.add(NoDataFoundCmtLabel);
			NoDataFoundCmtLabel = null;

			NoDataFoundView.add(NoDataFoundContainerView);
			NoDataFoundContainerView = null;

			questionListView.add(NoDataFoundView);
			NoDataFoundView = null;
			questionListView.height = Ti.UI.FILL;
			questionListView.visible = true;
		}
		response = null;
	}

	function onQuestionListError(exe) {
		require('common/loader').removeScrollLoader();
		var toast = Ti.UI.createNotification({
			message : exe,
			duration : Ti.UI.NOTIFICATION_DURATION_SHORT,
			bottom : '10dp',
			borderRadius : 50,
		});
		toast.show();
	}

}

exports.removeQuestion = function() {
	if (winQuestion !== null) {
		winQuestion.close();
		winQuestion = null;
	}
};
