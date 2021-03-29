const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors = authors;
        this.tags = tags;
        this.createdBy = id;
    }
}

class Projects extends DataModel {
    validate(obj) {
        let check_arrTags = Array.isArray(obj['tags']);
        let check_arrAuthors = Array.isArray(obj['authors']);
        let empty_properties = true;
        for (let props in obj) {
            if ((obj[props] === null  || !obj[props]) || (obj[props] === undefined)) {
                return empty_properties = false;
            }
        }
        if ((empty_properties) && (check_arrAuthors) && (check_arrTags)){
            return true;
        } 
        else {
            return false;
        }
    }

    // validate(obj) {
    //     //none of the properties in obj is empty
    //     let resEmpty = true;
    //     for (let stuff in obj) {
    //         if ((obj[stuff] === undefined) || (obj[stuff] === null || !obj[stuff])) {
    //             resEmpty = false;
    //         }
    //     }
    //     let tagsArray = Array.isArray(obj['tags'])
    //     let authorsArray = Array.isArray(obj['authors'])
    //     if (resEmpty && tagsArray && authorsArray) {
    //         return true
    //     }
    //     return false;
    // }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};