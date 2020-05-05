# SpaceInvaders.io

## Autor
Tim Terwijn

### Week1:
As you can see in the Week1 branch, I have been building an application to test if it was possible for me to make a simple game. During this project I was trying to broadcast the X coordinate with the other user. I also tried to register and login a user with the use of local storage and a unique string id.  

![week1](/docs/week1.png)

### Description
I want to make a space invader versus game for two players. 

### Install guide
* Clone or download the repository $ git clone https://github.com/TimTerwijn/real-time-web-1920.git
* Open server folder with VSCode.
* Open terminal en enter npm install.
* Enter npm start in terminal.
* Go to http://localhost:3000/ to use the app.

### How to use
* Create a user name.
* Write something to chat with the other users.
* Use the arrow keys to move the input field.
* If you write something now the text in the chat is also on this position for everyone.

### Rubric
#### Demo:
https://chat-app-tim.herokuapp.com/

#### Data life cycle
![data-life-cycle](/docs/data-life-cycle.png)

#### Real-time events
...

#### Real time functions
...

#### Api
I made use of the starwars API, the starwars api is used to get the data of the starships.  
  
Starships{  
-MGLT  
-cargo_capacity  
-consumables  
-cost_in_credits  
-created  
-crew  
-edited  
-hyperdrive_rating  
-length  
-manufacturer  
-max_atmosphering_speed  
-model  
-name    
-passengers  
-films  
-pilots  
-starship_class  
-url  
}  
  
For now I only use the names of the spaceships from this api, but in the future I might use this api to to change the max speed of the spaceshipt to that of the hyperdrive_rating of the spaceship of the api.  

#### Database
...

#### Socket IO rooms
Each room can have a maximum of two players. Each time a new player joins the server checks if there is already a room with a player 1 but without a player 2. If so, that new player joins as player 2. If not the new player generates its own room and waits for other players.

### Roadmap
* Demo the app online
* Work on readme
* Implement real time functions (space invaders)
* Make use of an API
* Make use a database
* Socket IO rooms so users can play together
