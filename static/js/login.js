function signUp() {

    // get values
    let signUpEmail = document.querySelector('#signUpEmail').value;
    let signUpName = document.querySelector('#signUpName').value;
    let signUpPassword = document.querySelector('#signUpPw').value;

    console.log(signUpEmail, signUpName, signUpPassword, JSON.stringify({signUpEmail, signUpName, signUpPassword}) );


    // then fetch data
    fetch(
        `/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({signUpEmail, signUpName, signUpPassword})
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // then check data;
            if (data.permission){
                window.location.href='/';
            }
        })
}