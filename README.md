# football-match-api
This Project first used the AI from defang generate to build a node.js project that displays a table of the premier league matches from [football-data.org's](https://www.football-data.org/) API. I then altered the code to become a react-node-express version of the project and I connected the project to a postgres database that is hosted using neon (I used the same format as the defang sample for the react-node-express project). The project displays all the matches for the premier league season as well as their scores if they have already been played. The project also implements Auth0's authentication and authorization. 

The project is deployed using defang compose up and can be accessed on [https://joshua-frey-wsu-client.prod1a.defang.dev/](https://joshua-frey-wsu-client.prod1a.defang.dev/).

If you use a domain name, specify in the compose.yaml file and use defang cert generate command for the new dns.
