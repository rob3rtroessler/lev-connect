
const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if(element !== "slide-up") {
            parent.classList.add('slide-up')
        }else{
            signupBtn.parentNode.classList.add('slide-up');
            parent.classList.remove('slide-up')
        }
    });
});

signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if(element !== "slide-up") {
            parent.classList.add('slide-up')
        }else{
            loginBtn.parentNode.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});



$('#form').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
    $('#form').delay(200).removeClass('ahashakeheartache');
});

// register - being called on register btn click
function register() {

    // get values
    let signUpEmail = document.querySelector('#signUpEmail').value;
    let signUpPassword = document.querySelector('#signUpPassword').value;
    let signUpConfirmation = document.querySelector('#signUpConfirmation').value;
    //let signUpUsername = document.querySelector('#signUpName').value;

    console.log(signUpEmail, signUpPassword, JSON.stringify({signUpEmail, signUpPassword, signUpConfirmation}) );


    // then fetch data
    fetch(
        `/register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({signUpEmail, signUpPassword, signUpConfirmation})
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // then check data;
            if (data.permission){
                document.getElementById("myNav").style.height = "0%";
            }
            else {
                $('#errorMessage').show();
                $('#errorMessage').html(data.message);
                $('#form').addClass('ahashakeheartache');
            }
        })
}

// login - being called on register btn click
function login() {

    // get values
    let loginEmail = document.querySelector('#loginEmail').value;
    let loginPassword = document.querySelector('#loginPassword').value;

    // then fetch data
    fetch(
        `/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({loginEmail, loginPassword})
        }
    )
        .then((response) => response.json())
        .then((data) => {

            // then check data;
            if (data.permission){
                globalTutorData = data.data.data;
                start();
                document.getElementById("myNav").style.height = "0%";
            }
            else {
                $('#errorMessage').show();
                $('#errorMessage').html(data.message);
                $('#form').addClass('ahashakeheartache');
            }
        })
}

function testRoute(){

}