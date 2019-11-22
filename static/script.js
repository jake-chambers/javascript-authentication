const authenticate = () => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    validateInputs(username,password)
    console.log("trying to authenticate..")
}


const validateInputs = (username, password) => {
    if (!username || !password){
        alert("fix your inputs!!")
    }
}   