class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.x = 0;
        this.velocity = 0;
        this.maxSpeed = 8;
    }

    getId(){
        return this.id;
    }

    getUsername(){
        return this.username;
    }

    getX(){
        return this.x;
    }

    getVelocity(){
        return this.velocity;
    }

    getMaxSpeed(){
        return this.maxSpeed;
    }

    setX(x){
        this.x = x;
    }

    moveRight(){
        this.velocity = this.maxSpeed;
    }

    stopMoving(){
        this.velocity = 0;
    }

    moveLeft(){
        this.velocity = this.maxSpeed * -1;
    }

    calcNewPosition(){
        this.x = this.x + this.velocity;
    }

    hasVelocity(){
        return this.velocity != 0;
    }

    setVelocity(velocity){
        this.velocity = velocity;
    }

    setMaxSpeed(maxSpeed){
        this.maxSpeed = maxSpeed;
    }
}

module.exports = User;