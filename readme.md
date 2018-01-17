

### Dependancies

* node.js 
* twit : https://github.com/ttezel/twit
* neo4j driver : https://www.npmjs.com/package/neo4j-driver

### Requires
* Neo4j (local or remote)
* DXC Digital Explorer dataset - for trend data

### install

clone\download repo
~~~~
npm install
~~~~

### running
ensure Neo is avaiable
~~~~
node bot.js
~~~~

### Aim 
Provide a realtime twitter feed against a named trend within the DE solution

By using the name of a trend within Digital Explorer, return the following information

Top
Recent
People

#### authenication 
Neo 
Access to neo is either via a local instance or DE development (restricted); update neoconfig.js

twitter
Private applicationa and keys required, create/update twitconfig.js
