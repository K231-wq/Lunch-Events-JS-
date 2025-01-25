import { getPassword } from "./util/password.js";
let keyList = [{}];
const uniqueId = getPassword(25, true, true, true, true);
try {
    keyList = JSON.parse(localStorage.getItem('keyData')) || [{
        name: 'admin', 
        key: 'admin',
        uniqueId: 'zq-5-HcQbkOEievt3pjmHt4Sundefined'
    }];
} catch (e) {
    keyList = [{name: 'admin', key: 'admin'}];
}

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('#name');
    const passElement = document.querySelector('#password');
    const resultArea = document.querySelector('.result-area');
    const regBtn = document.querySelector('.regBtn');
    resultArea.classList.remove('passed', 'not_passed');

    if (regBtn) {
        regBtn.addEventListener('click', () => {
            let nameValue = String(nameElement.value);
            let passValue = String(passElement.value);
            let fadeMessage1;
            let fadeMessage2;
            if(fadeMessage1){
                clearTimeout(fadeMessage1);
            }
            if(fadeMessage2){
                clearTimeout(fadeMessage2);
            }
            if(!nameValue || !passValue){
                resultArea.innerHTML = `<p>Enter Name and Password!!!</p>`;
                resultArea.classList.add('not_passed')
                fadeMessage1 = setTimeout(() => {
                    resultArea.textContent = '';
                    resultArea.classList.remove('not_passed');
                    nameElement.value = '';
                    passElement.value = '';
                    }, 2000);
                console.log("not passed");
                return;
            }
            if(nameValue && passValue){
                resultArea.innerHTML = '<p>Successfully Added</p>';
                resultArea.classList.add('passed');
                fadeMessage2 = setTimeout(() => {
                    resultArea.textContent = '';
                    resultArea.classList.remove('passed');
                    nameElement.value = '';
                    passElement.value = '';
                }, 2000);

                keyList.push({
                    name: nameValue,
                    key: passValue,
                    uniqueId: getPassword(25, true, true, true, true)
                });
                saveData(keyList);
                console.log(keyList);
                window.location.href = '/launch/log_page.html';
            }
            
        });
    }
});

function saveData(data) {
    localStorage.setItem('keyData', JSON.stringify(data));
}

export { keyList };
