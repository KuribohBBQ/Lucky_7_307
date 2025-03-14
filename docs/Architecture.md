Our Architecture shares some data from backend to frontend and frontend to backend. Mainly Login Details and Tasks. Frontend effectively communicates with Backend and vice versa.


Architecture:
-docs - Documents for Architecture of our project and UML diagram

---Architecture.md

---UMLLUCKY7.png

-node_modules

---npm installs and other node mods

-packages

---express-backend - backend of our program, responsible for holding backend code, testing software, models for images in our button

-----cypress - testing

-----models - mongo integration

-----services - mongo integration

--------Source code - Contains files for Authentication, Cypress Testing Config, ESLint and Prettier, and Backend.js code mainly for data and Login user and pass


---react-frontend

-----node_modules - NPM installs

-----src

-------- assets - images for buttons including home and table

------- code for front end - Login Page, Todo Page, Taskpage - for algorithm, CSS for each, Calendar, Task Table - support for TaskPage


