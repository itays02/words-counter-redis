#Words Counter
Installation Guide
1. First, install redis-server <br/>
   Download it from http://download.redis.io/redis-stable.tar.gz
   ```
   tar xvzf redis-stable.tar.gz
   cd redis-stable
   make
   ```
   Add redis to Path variable <br/>
   ```
   export PATH=$PATH:$HOME/<your-download-location>/redis-stable/src
   ```
   Restart the terminal and run ```redis-server``` <br/>
   <b>Make sure that the server run in port 6379.</b>
2. Run ```npm i``` to install packages
3. Run ``` npm run start``` to run the service. The server will run at port 3002
4. The app is ready! you can browse the welcome page in http://localhost:3002/
5. The APIs endpoint are according to the instructions.<br/>
   1. In order to count words, use the following route: <br/>
      ```POST http://localhost:3002/counter```
      in body, send these params: <br/>
      ```
      type : STRING | FILE | URL
      param: free text
      ```
      <b>For example, this is a body example:</b> 
      ```
      {
         "type":"STRING",
         "param":"abc abc"
      }
      ```
   2. In order to get the count of a word, use the following route. For example, in this case I'm getting the count of the word "abc". 
      ```
      http://localhost:3002/statistics?word=abc
      ```
6. There is a test file which I've tested my functions. You can run it by:
``npm run test``
      
Thank you!
<b>Itay Eylon</b>

