const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber= matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        let auth_email = this.data.find(em_ps => em_ps.email === email);
        let auth_password = this.data.find(em_ps => em_ps.password === password);
        if ((auth_email) && (auth_password)) {
            return true;
        } 
        else {
            return false;
        }
    }

    getByEmail(email) {
        let getEmail = this.data.find(eml => eml.email === email)
        if (getEmail !== undefined){
            return getEmail;
        } else {
            return null;
        }
    }

    getByMatricNumber(matricNumber) {
        let mat_no = this.data.find(matric => matric.matricNumber === matricNumber);
        if (mat_no !== undefined) {
            return mat_no
        } else {
            return null;
        }
    }

    validate(obj) {
        let emails_match = this.data.find(match => match.email === obj.email);
        let mats_match = this.data.find(match => match.matricNumber === obj.matricNumber);
        let empty_obj = false;
        for (let props in obj) {
            if ((obj[props] === undefined) || (obj[props] === null)) {
                empty_obj = true
            }
        }
        if ((emails_match) || (mats_match) || (obj.password.length < 7) || (empty_obj === true)) {
            return false;
        }
        else {
            return true;
        } 
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};