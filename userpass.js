module.exports = function(RED) {
	function UserpassNode(config) {
		RED.nodes.createNode(this, config);
		this.password = this.credentials.password;
		var node = this;

		this.on('input', function(msg) {
			msg.password = node.password;
			if (msg.password == null || msg.password.length < 1 ) {
				node.warn('Userpass node sending empty password; need configured?');
			}
			node.send(msg);
		});
	}
	RED.nodes.registerType("password", UserpassNode, {
		credentials: {
			password: {type: "text"}
		}
		settings: {
        		userpassNodeUsername: {
            		value: "",
            		exportable: false
			}
	       }
	});
}
