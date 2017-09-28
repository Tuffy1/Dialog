define(
	function() {
		var instance;	//利用闭包的特性，判断是否已经存在实例.处理点完出现之后还点的情况,不然会出现很多层
		function Dialog(config) {
			this.title = config.title ? config.title : 'this is title';
			this.content = config.content ? config.content : 'this is content';

			this.html = `
			<div class="dialog-dropback">
				<div class="container">
					<div class="head">${this.title}</div>
					<div class="content">${this.content}</div>
					<div class="footer">
						<button class="cancel">no</button>
						<button class="confirm">yes</button>
					</div>
				</div>
			</div>
			`
		}
		Dialog.prototype = {
			constructor: Dialog,
			show: function() {
				var that = this;
				if(instance) {
					this.destory();
				}
				$(that.html).appendTo($(document.body));
				instance = that;
				return new Promise(function(resolve, reject) {	//返回Promise，将后续操作放在外面
					$('.cancel').on('click', function(e) {
						that.hide();
						reject(e);
					})
					$('.confirm').on('click', function(e) {
						that.hide();
						resolve(e);
					})
				})
			},
			destory: function() {
				instance = null;
				$('cancel').off('click');
				$('confirm').off('click');
				$('.dialog-dropback').remove();
			},
			hide: function() {
				this.destory();
			}
		}
		return function(config) {
			return new Dialog(config);
		};
	}
)