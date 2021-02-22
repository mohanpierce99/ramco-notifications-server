## Notifications component - server repo

### Full Demo and walkthrough of the project in video in 12 mins : Watch it here : 
Part1 - https://www.loom.com/share/485c8e6678c0476f91bb3f3c77087de5
Part2 - https://www.loom.com/share/ba8cc79891464acb99704eaa6f3a8779

To run the project :

Feed the mongodb connection url in `src/config/dev.js`

`npm start`  or `npm run dev` for dev mode.  - Needs port 3005 - 'Can be changed in server.js'

Once you have started the server -  make sure the website webpack server is booted up, move to the webapp dir wherever it is and run

`npm start` - Usually tries to run in port 3000, if not free lets you to choose some other port

Open a different terminal and move to this directory and move to the /cli - This is where the cli exists

`node cli.js -u sampleOrder.json`

or 

`node cli.js` to just update price,status of current orders and not create new ones






