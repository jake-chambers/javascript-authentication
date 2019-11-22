const authenticate = () => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    console.log("trying to authenticate..")

    if (validateInputs(username, password)) {
        axios({
            method: 'post',
            url: '/authenticate',
            data: {
                username: username,
                password: password
            },
        })
        .then(function (response) {
            alert("successfully sent request")
        })
    }

}


const validateInputs = (username, password) => {
    if (!username || !password) {
        alert("fix your inputs!!")
        return false;
    }
    return true;
}   