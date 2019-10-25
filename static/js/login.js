
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


function signUp() {

    // get values
    let signUpEmail = document.querySelector('#signUpEmail').value;
    let signUpName = document.querySelector('#signUpName').value;
    let signUpPassword = document.querySelector('#signUpPassword').value;
    let signUpConfirmation = document.querySelector('#signUpConfirmation').value;

    console.log(signUpEmail, signUpName, signUpPassword, JSON.stringify({signUpEmail, signUpName, signUpPassword, signUpConfirmation}) );


    // then fetch data
    fetch(
        `/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({signUpEmail, signUpName, signUpPassword, signUpConfirmation})
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
                $('#form').addClass('ahashakeheartache');
            }
        })
}