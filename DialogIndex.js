var Dialog = require(['Dialog'], function(Dialog) {
	$('button').on('click',function() {
		Dialog({
			title: 'hello world',
			content: 'i am Joyee'
		})
		.show()
		.then(function() {	//对话框点击了“yes”
			console.log("select yes, now you can do what you should do");
		},function() {		//对话框点击了“no”
			console.log("select no, now you can do what you should do");
		})
	})
});