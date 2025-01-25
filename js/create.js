// console.log(JSON.parse(localStorage.getItem('UserInfo')));
import { events } from "./data.js";
import { getPassword } from "./util/password.js";
console.log(getPassword(20, true, true, false, true));
let userInfo;
try{
    userInfo = loadUserInfo();
}catch(e){
    console.error("userInfo is missing");
    alert("UserInfo missing!");
}
if(!userInfo){
    console.error("userInfo is missing");
    alert("User Data is missing!!");
}
console.log(userInfo);
console.log(events);

document.addEventListener('DOMContentLoaded', () => {
    const lobby = document.querySelector('.js-lobby-btn');
    const create = document.querySelector('.js-create-btn');
    const invite = document.querySelector('.js-invite-btn');
    const rsvp = document.querySelector('.js-rsvp-btn');
    const profile =document.querySelector('.js-profile-btn');
    const logout = document.querySelector('.js-logout-btn');

    const dateElement = document.getElementById('date');
    const capacityElement = document.getElementById('capacity');
    const desElement = document.getElementById('description');
    const addressElement = document.getElementById('address');
    const createBtn = document.querySelector('.js-create-event-btn');
    const resultArea = document.querySelector('.js-error-result');
    

    createBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let date = dateElement.value;
        let capacity = Number(capacityElement.value);
        let description = desElement.value;
        let address = addressElement.value;

        if(date && capacity && description && address){
            events.push({
                uniqueId: userInfo.uniqueId,
                eventId: getPassword(20, true, true, false, true),
                name: userInfo.name,
                address: address,
                time: date,
                capacity: capacity,
                descripton: description,
                create_at: new Date().toISOString()
            });

            saveAllEvents(events);
            alert('Event created successfully!');

            console.log(events);
            resultArea.innerHTML = `<p>Successfully Created✌</p>`;
            resultArea.classList.add('success');
            
            capacityElement.value = '';
            desElement.value = '';
            addressElement.value = '';
            setTimeout(()=>{
                resultArea.textContent = '';
                resultArea.classList.remove('success');
            }, 1000);

        }else{
            alert('Please fill in all Fields');
        }
        
    });
    
    lobby.addEventListener('click', () => {
        window.location.href = '/launch/home.html';
    });
    create.addEventListener('click', () => {
        window.location.href = '/launch/form-layout/create(test).html';
    });
    invite.addEventListener('click', () => {
        window.location.href = '/launch/form-layout/invite.html';
    });
    rsvp.addEventListener('click', () => {
        window.location.href = '/launch/form-layout/rsvp.html';
    })
    profile.addEventListener('click', () => {
        window.location.href = '/launch/form-layout/profile.html'
    });
    logout.addEventListener('click', () => {
        // if(localStorage.getItem('RsEvents')){
        //     localStorage.removeItem('RsEvents');
        // }
        if(localStorage.getItem('UserInfo')){
            localStorage.removeItem('UserInfo');
        }
        alert('You are Log out!!!');
        setTimeout(() => {
            window.location.href = '/launch/log_page.html';
        }, 2000);
    });
    
});

// document.addEventListener('DOMContentLoaded', () => {
//     const dateElement = document.getElementById('date');
//     const capacityElement = document.getElementById('capacity');
//     const desElement = document.getElementById('description');
//     const addressElement = document.getElementById('address');
//     const createBtn = document.querySelector('.js-create-btn');

//     createBtn.addEventListener('click', (event) => {
//         event.preventDefault(); // Prevent default behavior
        
//         let date = dateElement.value;
//         let capacity = Number(capacityElement.value);
//         let description = desElement.value;
//         let address = addressElement.value;
        
//         if (date && capacity && description && address) {
//             testingInfo.push({
//                 uniqueId: userInfo.uniqueId,
//                 name: userInfo.name,
//                 address: address,
//                 time: date,
//                 capacity: capacity,
//                 description: description,
//                 create_at: new Date().toISOString()
//             });

//             tesingData(testingInfo); // Save to localStorage
//             alert('Event created successfully!');
//         } else {
//             alert('Please fill in all fields.');
//         }
//     });
// });

export function loadUserInfo(){
    let object = JSON.parse(localStorage.getItem('UserInfo'));
    return object;
}

export function saveAllEvents(data){
    localStorage.setItem('AllEvents', JSON.stringify(data));
}

// function tesingData(data){
//     localStorage.setItem('testingInfo', JSON.stringify(data));
// }