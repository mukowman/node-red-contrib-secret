module.exports = function(RED) {
	function SecretNode(config) {
		RED.nodes.createNode(this, config);
		this.secret = this.credentials.secret;
		var node = this;

		this.on('input', function(msg) {
			msg.secret = node.secret;
			if (msg.secret == null || msg.secret.length < 1 ) {
				node.warn('secret node sending empty secret; need configured?');
			}
			node.send(msg);
		});
	}
	RED.nodes.registerType("secret", SecretNode, {
		credentials: {
			secret: {type: "text"}
		}
	});
}
