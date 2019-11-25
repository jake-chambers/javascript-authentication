const authenticate = () => {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    console.log("trying to authenticate..")

    if (validateInputs(username, password)) {
        axios({
            method: 'post',
            url: '/users/login',
            data: {
                username: username,
                password: password
            },
        })
        .then(function (response) {
            if (response.status == 200){
                console.log("success")
                let token = response.headers['x-auth-token']
                window.localStorage.setItem('token', token)
                console.log("redirecting...")
                authenticationRedirect()
            }
        })
        .catch(function(err){
            alert("bad credentials")
        })
    }

}

authenticationRedirect = () => {
    let config = {
        headers: {'Authorization': window.localStorage.getItem('token')},
    }

    axios({
        method: 'get',
        url: '/users/profile',
        headers: {
            'Authorization': window.localStorage.getItem('token')
        }
    })
    .then(function(response){
        console.log(response)
    })
}


const validateInputs = (username, password) => {
    if (!username || !password) {
        alert("fix your inputs!!")
        return false;
    }
    return true;
}   