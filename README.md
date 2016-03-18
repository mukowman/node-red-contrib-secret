### Decription

A simple node for injecting secrets into your flows, whether they're API keys needed for an HTTP request, encryption keys, passwords, or whatever else.

This node is useful because it stores the configured secret in the credential file, which is not included in an export; if you've simply hardcoded the credential on an HTTP node's URL, you can no longer safely export that flow. A secret node holding that key means that you can export your flow without compromising your key.

#### Usage

Here's an example of how to use the secret node. This particular example is hiding my IFTTT API key:

![Flow](example-flow.png?raw=true)

And in importable format:

    [{"id":"92c88bb7.aa8f98","type":"secret","z":"81d5bf3e.6ee35","name":"IFTTT API Key","x":560,"y":1600,"wires":[["b8bd3eb2.8ebc2"]]},{"id":"b8bd3eb2.8ebc2","type":"template","z":"81d5bf3e.6ee35","name":"Set msg.url","field":"url","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"https://maker.ifttt.com/trigger/doorbell/with/key/{{secret}}","x":670,"y":1660,"wires":[["974aeaa.8864318","5bfa7c4f.3f1074"]]},{"id":"5bfa7c4f.3f1074","type":"http request","z":"81d5bf3e.6ee35","name":"IFTTT","method":"GET","ret":"txt","url":"","x":830,"y":1680,"wires":[[]]},{"id":"974aeaa.8864318","type":"debug","z":"81d5bf3e.6ee35","name":"","active":true,"console":"false","complete":"true","x":830,"y":1640,"wires":[]},{"id":"87c666a4.8f1968","type":"inject","z":"81d5bf3e.6ee35","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":440,"y":1540,"wires":[["92c88bb7.aa8f98"]]}]

 1. Trigger node - it's simply there to trigger the flow, we're not using anything from it. (in reality, this is initiated by an MQTT input message)
 2. Secret node - it takes the existing `msg` object, adds a new `msg.secret` as configured, then sends the `msg` on.
    ![Config](example-dialog.png?raw=true)
 3. Template node - the HTTP node expects the URL in `msg.url`. In this case, the API key needs to be in the URL, so the template sets `msg.url` to `https://maker.ifttt.com/trigger/doorbell/with/key/{{secret}}` - this would trigger the 'doorbell' action (which must be configured in an IFTTT recipe for you), and cleanly inserts the secret key into the URL that will be called.
 4. Output - both dump the `msg` object out so we can see what we just sent, as well as sending it into the HTTP node to be triggered in IFTTT's system.
