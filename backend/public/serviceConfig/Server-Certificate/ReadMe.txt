setup MongoDB:
https://www.tutorialspoint.com/mongodb/mongodb_environment.htm
1) Download package from https://www.mongodb.org/downloads
2) Check your system config 
   C:\>wmic os get osarchitecture
   OSArchitecture
   64-bit
3) move the file to the necessary location and rename to mongodb or use the code in cmd to rename C:\>move mongodb-win64-* mongodb
4) create a folder where the mongodb can hold its DB data
   C:\>md data
5) Run below code to start the DB configuration to the necessary folder 
   mongod.exe --dbpath "drive:\path\foldername" 
   in our case as am creating the folder in C: am using the below code
   C:\mongodb\bin>mongod.exe  --dbpath "c:\data"
6) now open another cmd and navigate to bin folder of mongodb folder and run the below code.
   C:\mongodb\bin>mongo.exe
7) now wheneever you wanna start the mongodb server use the below to commands
   C:\mongodb\bin>mongod.exe  --dbpath "c:\data"
   C:\mongodb\bin>mongo.exe


start the Node server:
1) C:\myWork>cd backend
2) C:\myWork\backend> npm run dev

Run Angular 
1) go to the angular project folder and run the below command
   ng serve -o
