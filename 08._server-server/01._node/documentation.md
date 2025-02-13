# Docs

# Server runs on PORT 8080 via nodejs express
# is being served by Localtunnel (LT) 
# documentation can be found https://www.npmjs.com/package/localtunnel or https://github.com/localtunnel/localtunnel
Server URL: https://navid.loca.lt/
password: 195.249.146.101 if accessing from browser
otherwise it is recommended to access from Postman or using CURL in your commandline

@GetMappings
"/" - serves a static html page with some styling and functionality
"/requestFastAPIData" - returns fastApiData
"/expressData" - returns expressData
"/names/{name}" returns name

