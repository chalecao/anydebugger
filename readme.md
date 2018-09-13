## anydebugger
anydebugger enable you debug you web pages anywhere via Chrome Devtool with Chrome Devtools Protocol supported partially. we will support JavaScript Debug soon!

## usage
```
npm install anydebugger -g

anydebugger -v //see version

anydebugger //start debug

anydebugger -p 9000 //start debug
```
then it will open your default browser antomatically, you can follow the web guide.

### 3 steps 2 debug you page
step 1: embed anydebugger.js in your page， you can download from the web guide. after
start anydebugger.


step 2: app url parameter "debugurl" in you url, for example:
```
http://xxx.com/xxx/yyy/zzz?debugurl=127.0.0.1:8888
```
if no debugurl specified, anydebugger will use the script src host as default.


step 3: debug your page. when you refresh your page, you will find the debug-able page list on the anydebugger web page. then click it and Chrome devTools show time.

## framework
![](./doc/intro.png)
![](./doc/timeline.png)
