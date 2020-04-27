class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

    getId(){
        return this.id;
    }

    getUsername(){
        return this.username;
    }
}

module.exports = User;