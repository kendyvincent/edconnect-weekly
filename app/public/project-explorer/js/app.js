let path = window.location.href;
//Working with the register page
if (path.includes('register.html')) {
    window.onload = async function () {
        let response_program = await fetch('/api/programs', {
            method: 'GET',
            headers: {
                'content-Type': 'application/json'
            }
        })
        let data = await response_program.json();
        let selectProg = document.getElementById('program');
        var length = selectProg.options.length;
        for (i = length-1; i >= 0; i--) {
            selectProg.options[i] = null;
        }
        data.forEach((item) => {
            let program_option = document.createElement('option');
            program_option.value = item;
            program_option.text = item;
            selectProg.append(program_option);
        })
            

        let response_grad = await fetch('/api/graduationYears', {
            method: 'GET',
            headers: {
                'content': 'application/json'
            }
        })
        let grad_data = await response_grad.json();
        let selectGrad = document.getElementById('select_Grad_Year');
        var length = selectGrad.options.length;
        for (i = length-1; i >= 0; i--) {
            selectGrad.options[i] = null;
        }
        grad_data.forEach((item) => {
            let grad_option = document.createElement('option');
            grad_option.value = item;
            grad_option.text = item;
            selectGrad.append(grad_option);
        }) 
    }     
  
    document.addEventListener('DOMContentLoaded', () => {
        document
        .getElementById('signupForm')
        .addEventListener('submit', handleForm);
    });

    let handleForm = async function (ev) {
        ev.preventDefault();
        let formHd = {
            firstname : document.getElementsByName('firstName')[0].value,
            lastname : document.getElementsByName('lastName')[0].value,
            email : document.getElementsByName('email')[0].value,
            password : document.getElementsByName('password')[0].value,
            program : document.getElementsByName('program')[0].value,
            matricNumber : document.getElementsByName('matricNumber')[0].value,
            graduationYear : document.getElementsByName('graduationYear')[0].value,
        };
        let formPost = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formHd)        
        })
        let response_form = await formPost.json();
            // Setting the cookie and handling errors
        if (response_form.status === 'ok') {
            let userId = response_form.data.id;
            let key = "uid";
            // let value = encodeURIComponent(userId);
            document.cookie = `${key} = ${userId}; path=/`;
            window.location.replace('index.html');
        } 
        else if (response_form !== 'ok') {
            let alertpost = document.getElementById('signupAlert');
            let para = document.createElement('p');
            alertpost.style.display = "block";
            para.innerHTML = (response_form.errors).toString().replaceAll(',','<br />');
            alertpost.append(para);
        }         
    }    
}

//Handling login and logout on the navbar
if (document.cookie) {
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    let cookieVal = getCookie("uid");
    console.log(cookieVal)
    let cookieAvailable = cookieVal ? true : false;
    console.log(cookieAvailable);
    if (cookieAvailable === true) {
        fetch(`/api/users/${cookieVal}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(dataFetched => dataFetched.json())
        .then(function (response) {
            console.log(response);
            document.getElementById("login").style.visibility = "hidden";
            // document.getElementById("loginBody").style.visibility = "hidden";
            document.getElementById("signup").style.visibility = "hidden";
            let welcomeGreetn = document.getElementById('username');
            welcomeGreetn.innerHTML = `<b> Hi, ${response.firstname}<b>`
            document.getElementById("logout").style.display = "block";
            welcomeGreetn.style.display = "block";
        }) 

        let logoutActions = document.getElementById("logout");
        logoutActions.addEventListener('click', function (ev) {
            ev.preventDefault();
            document.cookie = "uid=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;";
            window.location.replace('index.html');
            document.getElementById("signup").style.visibility = "visible";
            document.getElementById("login").style.visibility = "visible";
        })
    }
}


//Validating login details and error handling
if (path.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        document
        .getElementById('signinForm')
        .addEventListener('submit', handleLoginForm);
    });
    let handleLoginForm = async function (ev) {
        ev.preventDefault();
        let formData = {
            email : document.getElementsByName('email')[0].value,
            password : document.getElementsByName('password')[0].value,
        };
        let formPost = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)        
        })
        let response_form = await formPost.json();
        if (response_form.status === 'ok') {
            let key = "uid";
            let userId = response_form.data.id;
            document.cookie = `${key} = ${userId}; path=/`;
            window.location.replace('index.html');
        }
        else if (response_form.status !== "ok") {
            console.log(response_form.errors);
            let errHandlingSect = document.getElementById('loginErr');
            let para = document.createElement('p');
            errHandlingSect.style.display = "block";
            errHandlingSect.style.paddingBottom = "3px";
            errHandlingSect.style.paddingTop = "3px";
            para.innerHTML = 'Invalid email/password';
            errHandlingSect.append(para);
        } 
    }
}
//Handling the create project page and alerting possible errors
// if (path.includes('createproject.html')) {
//     window.onload = function () {
//             // function getCookie(name) {
//             //     var nameEQ = name + "=";
//             //     var ca = document.cookie.split(';');
//             //     for(var i=0;i < ca.length;i++) {
//             //         var c = ca[i];
//             //         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//             //         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//             //     }
//             //     return null;
//             // }
        
//             // let cookieVal = getCookie("uid");
//             // let cookieAvailable = cookieVal ? true : false;
//             let cookieCheck = document.cookie.split(';').some((item) => item.trim().startsWith('uid='));
//             if (!cookieCheck) {
//                 windows.location.replace("login.html");
//             }
//                 document.addEventListener('DOMContentLoaded', () => {
//                     document
//                     .getElementById('createProjectForm')
//                     .addEventListener('submit', handleCreatePojectForm);
//                 });
//                 let handleCreatePojectForm = async function (ev) {
//                     ev.preventDefault();
//                     let formData = {
//                         email : document.getElementsByName('name')[0].value,
//                         abstract : document.getElementsByName('abstract')[0].value,
//                         authors : document.getElementsByName('authors')[0].value,
//                         tags : document.getElementsByName('tags')[0].value,
//                     };
//                     let projectFormPost = await fetch('/api/projects', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify(formData)        
//                     })
//                     let response_form = await projectFormPost.json();
//                     if (response_form.status === 200) {
//                         window.location.replace("index.html");
//                     }
//                     else if (response_form.status !== 200) {
//                         let errHandlingSect = document.getElementById('projectErrDiv');
//                         let paraC = document.createElement('p');
//                         errHandlingSect.style.display = "block";
//                         paraC.innerHTML = (response_form.errors).toString().replaceAll(',','<br>');
//                         errHandlingSect.append(paraC);
//                     } 
//                 }
//     } 
// }

if (path.includes('createproject.html')) {
    window.onload = function () {
            let cookieCheck = document.cookie.split(';').some((item) => item.trim().startsWith('uid='));
            if (!cookieCheck) {
                window.location.replace("login.html");
            }
            const createProjectForm = document.getElementById("createProjectForm"); // Get the form element that I will listen to
                function handleCreatePojectForm (ev) {
                    ev.preventDefault();
                    let formData = {
                        name : document.getElementsByName('name')[0].value,
                        abstract : document.getElementsByName('abstract')[0].value,
                        authors : document.getElementsByName('authors')[0].value.split(","),
                        tags : document.getElementsByName('tags')[0].value.split(","),
                    };
                    console.log(formData);
                    fetch('/api/projects', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)        
                    })
                   .then((projectFormPost) => projectFormPost.json())
                   .then (response_form => {
                       console.log(response_form);
                    if (response_form.status === 'ok') {
                        window.location.replace("index.html");
                    }
                    else if (response_form.status !== 200) {
                        let errHandlingSect = document.getElementById('projectErrDiv');
                        let paraC = document.createElement('p');
                        errHandlingSect.style.display = "block";
                        paraC.innerHTML = (response_form.errors).toString().replaceAll(',','<br>');
                        errHandlingSect.append(paraC);
                    }  
                })
           }
        createProjectForm.addEventListener('submit', handleCreatePojectForm);
    } 
}

//handling the project list cards at the bottom of the index page
if (path.includes('index.html')) {
    window.onload = async function () {
        let response_projects = await fetch('/api/projects', {
            method: 'GET',
            headers: {
                'content-Type': 'application/json'
            }
        })
        let projectsData = await response_projects.json();
        console.log(projectsData);
        if (projectsData) {
            document.getElementsByClassName('showcase')[0].innerHTML = "";
            for (let i = 0; i < 4; i++) {
                // let userId = projectsData[i].id;
                let projTitle = document.createElement('a');
                projTitle.href = `viewproject.html?id=${projectsData[i].id}`;
                projTitle.className = "Card-Title";
                projTitle.textContent = projectsData[i].name;

                let ProjAuthors = document.createElement('h6');
                ProjAuthors.className = "card-subtitle";
                ProjAuthors.style.marginTop = "5px";
                ProjAuthors.textContent = projectsData[i].authors

                let projAbstract = document.createElement('p');
                projAbstract.className = "card-text";
                projAbstract.style.marginTop = "10px";
                projAbstract.textContent = projectsData[i].abstract

                let projTags = document.createElement('p');
                projTags.className = "card-text";
                projTags.textContent = projectsData[i].tags

                let cardBody = document.createElement('div');
                cardBody.className = "card-body";

                let cardMain = document.createElement('div');
                cardMain.className = "card";
                cardMain.classList.add("col");

                //Appending projects to the  Card-case Div
                cardMain.appendChild(cardBody);
                cardBody.appendChild(projTitle);
                cardBody.appendChild(ProjAuthors);
                cardBody.appendChild(projAbstract);
                cardBody.appendChild(projTags)
                document.getElementsByClassName("showcase")[0].appendChild(cardMain);
            }
        }

    }    
}

if (path.includes('viewproject.html')) {
    window.onload = async function () {
    // let url_string = window.location.href;
    // var projId = url_string.substring(url_string.lastIndexOf('?') + 1);
    let params = new URLSearchParams(document.location.search.substring(1));
    let projId = params.get("id");
    let requested_project = await fetch(`/api/projects/${projId}`, {
        method: 'GET',
        headers: {
            'content-Type': 'application/json'
        }
    })
    let projectToView = await requested_project.json();
    console.log(projectToView)
    let projNameFields = document.getElementById('project_name');
    projNameFields.textContent = projectToView.name;
    let projAbst = document.getElementById('project_abstract');
    projAbst.textContent = projectToView.abstract;
    let projtaggs = document.getElementById('project_tags');
    projtaggs.textContent = projectToView.tags;
    let projAuthors = document.getElementById('project_authors');
    projAuthors.textContent = projectToView.authors;

    let userInfo = await fetch (`/api/users/${projectToView.createdBy}`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    })
    let userData = await userInfo.json();
    console.log("New" + userData);
    let userNames = `${userData.firstname} ${userData.lastname}`;
    let projAuth = document.getElementById('project_author');
    projAuth.textContent = userNames;
    }
}
