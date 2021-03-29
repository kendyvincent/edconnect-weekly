class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    // getById(id) {
    //     let get_Id = this.data.find(info => info.id === id);
    //     if (!get_Id) {
    //         return null;
    //     } 
    //     else {
    //         return get_Id;
    //     }
    // }

    getById(id) {
        console.log(this.data, id);
        let userId = this.data.find(prop => prop.id === id)
        if(userId !== undefined) {
            return userId;
        } else {
            return null;
        }
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        let index = this.data.findIndex(prop => prop.id === id);
        if (index !== undefined) {
            for (const prop in obj){
                this.data[index][prop] = obj[prop];
            }
            return true;
        } else {
            return false;
        }
    }

    delete(id) {
        let gId = this.data.findIndex(info => info.id === id);
        if (gId > -1) {
            this.data.splice(gId, 1);
            return true;
        } else {
            return false;
        }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;