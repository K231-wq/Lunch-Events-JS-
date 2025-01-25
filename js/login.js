import { keyList } from './register.js';  // Importing keyList from register.js

// const nameElement = document.getElementById("name");
// const password = document.querySelector("#password");
// const loginBtn = document.querySelector('.js-login-btn');

// const resultArea = document.querySelector('.result-area');

document.addEventListener('DOMContentLoaded', () => {
    let userInfo = [];
    const nameElement = document.getElementById("name");
    const password = document.querySelector("#password");
    const loginBtn = document.querySelector('.js-login-btn');

    const resultArea = document.querySelector('.result-area');
    console.log(keyList);
    function renderLoad() {
        let nameValue = nameElement.value;
        let passwordValue = password.value;
        resultArea.classList.remove('passed', 'not_passed');
        let found = false;
        let fadeMessage1;
        let fadeMessage2;

        if(fadeMessage1){
            clearTimeout(fadeMessage1);
        }
        if(fadeMessage2){
            clearTimeout(fadeMessage2);
        }
    
        if(nameValue !== '' && passwordValue !== ''){
            keyList.forEach((pass) => {
                if (pass.name === nameValue && pass.key === passwordValue) {
                    found = true;
                    userInfo = pass;
                }
            });
        
            if (found) {
                resultArea.innerHTML = `<p>SUCCESSFULLY LOGIN</p>`;
                resultArea.classList.add('passed');
                saveUserData(userInfo);
                setTimeout(() => {
                    window.location.href = '/launch/home.html';
                }, 3000);
                console.log('passed');
            } else {
                resultArea.innerHTML = `<p>Name and Password are incorrect!!</p>`;
                resultArea.classList.add('not_passed');
                fadeMessage1 = setTimeout(() => {
                    resultArea.textContent = '';
                    resultArea.classList.remove('not_passed');
                    nameElement.value = '';
                    password.value = '';
                }, 3000);

                console.log('not');
            }
        }else{
            resultArea.innerHTML = `<p>You must enter name and password!!`;
            resultArea.classList.add('not_passed');
            fadeMessage2 = setTimeout(() => {
                resultArea.textContent = '';
                resultArea.classList.remove('not_passed');
                nameElement.value = '';
                password.value = '';
            }, 3000);
        }
        
    }

    loginBtn.addEventListener('click', () => {
        renderLoad();
    });

    document.body.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            renderLoad();
        }
    });

    function saveUserData(data){
        localStorage.setItem('UserInfo', JSON.stringify(data));
    } 
});
// function renderLoad() {
//     let nameValue = nameElement.value;
//     let passwordValue = password.value;
//     resultArea.classList.remove('passed', 'not_passed');
//     let found = false;

//     if(nameValue !== '' && passwordValue !== ''){
//         keyList.forEach((pass) => {
//             if (pass.name === nameValue && pass.key === passwordValue) {
//                 found = true;
//             }
//         });
    
//         if (found) {
//             resultArea.innerHTML = `<p>Name and Password are correct!!</p>`;
//             resultArea.classList.add('passed');
//             setTimeout(() => {
//                 window.location.href = '/launch/home.html';
//             }, 1000);
//             console.log('passed');
//         } else {
//             resultArea.innerHTML = `<p>Name and Password are incorrect!!</p>`;
//             resultArea.classList.add('not_passed');
//             console.log('not');
//         }
//     }else{
//         resultArea.innerHTML = `<p>You must enter name and password!!`;
//         resultArea.classList.add('not_passed');
//     }
    
// }

// loginBtn.addEventListener('click', () => {
//     renderLoad();
// });

