# SpaceInvaders.io

## Demo:
https://chat-app-tim.herokuapp.com/

## Autor
Tim Terwijn

## Week1:
As you can see in the Week1 branch, I have been building an application to test if it was possible for me to make a simple game. During this project I was trying to broadcast the X coordinate with the other user. I also tried to register and login a user with the use of local storage and a unique string id.

![week1](/docs/week1.png)

## Description
I want to make a space invader versus game where two players can try to shoot each other from behind bunkers. The player who wins gains points for his high scores. You can also score points by shooting monsters in the middle of the screen.

## Install guide
* Clone or download the repository $ git clone https://github.com/TimTerwijn/real-time-web-1920.git
* Open server folder with VSCode.
* Open terminal en enter npm install.
* Enter npm start in terminal.
* Go to http://localhost:3000/ to use the app.

## How to use
* Create a user name.
* Write something to chat with the other users.
* Use the arrow keys to move the input field.
* If you write something now the text in the chat is also on this position for everyone.

## Data life cycle
![data-life-cycle](/docs/data-life-cycle.png)

## Real-time events
*When a user is asked for his name when he starts the app for the first time. The name is sent to the server and is appointed a unique id and added to a room. The server sends this id back to the client so that the user is able to login again in the future.

*When a user uses an arrow key on his keyboard, his player moves. This is because the client gives a signal to the server that his player moves at its maximum speed. The server has an asynchronous loop that calculates and emits the new location to all players in that room.

*The sprite of the player will change when he presses on a starship image. The client sends the starship to the server, and broadcast it to all the players in the room.

## API
I made use of the [Starwars API](https://swapi.dev/), the Starwars api is used to get the data of the starships. This is a nice api because I do not need an api key. For now I only use the names of the spaceships from this API, but in the future I might use this API to change the max speed of the spaceship to that of the hyperdrive_rating of the spaceship of the API.

![api](/docs/api.png)

## Database
I make use of a SQL database from [db4free.net](https://www.db4free.net), at the moment I only use the database to store my users. But for the future I would also like to use it for my high scores. I have Git ignored my database credentials (DatabaseLogin.js) and used Heroku environment vars to connect to the database with Heroku.

![database](/docs/database.PNG)

## Socket IO rooms
Each room can have a maximum of two players. Each time a new player joins the server checks if there is already a room with a player 1 but without a player 2. If so, that new player joins as player 2. If not the new player generates its own room and waits for other players.

## Roadmap
* ~Demo the app online~
* ~Work on readme~
* ~Implement real time functions (space invaders)~
* ~Make use of an API~
* ~Make use a database~
* ~Socket IO rooms so users can play together~
* Shooting players
* High scores
* Hiding behind bunkers
* Monsters
