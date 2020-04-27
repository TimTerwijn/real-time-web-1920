class Room {
    
    constructor(name, newUser) {
        this.name = name;
        this.user1 = newUser;
        this.user2 = null;
    }

    getName(){
        return this.name;
    }

    getUser1(){
        return this.User1;
    }

    getUser2(){
        return this.User2;
    }

    setUser2(newUser){
        this.user2 = newUser;
    }

    looksForPlayer(){
        return this.user2 === null && this.user1 !== null;
    }

    removeUser(user){
        if(this.user1 === user){
            this.user1 = null;
        }else if(this.user2 === user){
            this.user2 = null;
        }
    }
}

module.exports = Room;