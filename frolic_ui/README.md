# Frolic UI project

This is the project which displays the fron end of frolic API. You can login, register, add, update, delete, view items alongwith their categories. Remember you need to first register yourself and login in order to add, update and delete items. You can also upload picture of the item and filter the items according to categories.

## Installation

1. First of all you will need the following softwares installed on you machine
    - **Node Package Manager**
    - **Command Line/Shell Prompt/Terminal**, a software to compile and run the code
    - **Web browser**
    - **Allow-Control-Allow-Origin in Chrome**

2. Then you should go into the directory called as precinct. Then type the below command : 
   ```npm install```

3. Then it will start installing the necessary packages for the project such as webpack,gulp etc.

4. After the installation completes type the below command to start the local server using gulp :
   ```npm start```

5. As the webpack compiles the files successfully the server will start at **http://localhost:9001**. Hit this url in browser you will get the project's home page.

6. Note one important thing that you need to install Allow-Control-Allow-Origin extension in chrome in order to get and post data onto API. Go to settings => extensions => get more extensions => type Allow-Control-Allow-Origin => install it.

7. Then you have to toggle it on off for the first time you open the project. Click on CORS extension icon on top right side of browser and then toggle it on off.
