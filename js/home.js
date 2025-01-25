import { events } from "./data.js";
import { addToRsEvents, loadRsEvents } from "./util/Methods.js";

const lobby = document.querySelector('.js-lobby-btn');
const create = document.querySelector('.js-create-btn');
const invite = document.querySelector('.js-invite-btn');
const rsvp = document.querySelector('.js-rsvp-btn');
const profile =document.querySelector('.js-profile-btn');
const logout = document.querySelector('.js-logout-btn');

let userInfo = JSON.parse(localStorage.getItem('UserInfo'));
if(!userInfo){
    alert("userInfo is missing😒😒");
}
const uniqueId = userInfo.uniqueId;
loadRsEvents(uniqueId); // load the data from the rsEvents

console.log(uniqueId);
let htmlList = ' ';
const cartContainer = document.querySelector('.card-container');
function renderHtml(){
    htmlList = ' ';
    events.forEach((event) => {
        htmlList += `
        <div class="card">
            <div class="text-container">
                <div class="textform textfrom-address">
                    <i class="fa-solid fa-location-dot"></i>
                    <p>${event.address}</p>
                </div>
                <div class="textform textfrom-time">
                    <i class="fa-regular fa-clock"></i>
                    <p class="grid-title">Time:</p>
                    <p>${event.time}</p>
                </div>
                <div class="textform textfrom-capacity">
                    <i class="fa-solid fa-users"></i>
                    <p class="grid-title">Capacity:</p>
                    <p>${event.capacity}</p>
                </div>
                <div class="textform textfrom-des">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p class="grid-title">Description:</p>
                    <p>${event.descripton}</p>
                </div>
                <div class="textform textfrom-create-by">
                    <i class="fa-solid fa-user"></i>
                    <p class="grid-title">Create By:</p>
                    <p>${event.name}</p>
                </div>
            </div>
            <div class="btn-container">
                <button class="request-btn js-request-btn" data-request-id="${event.eventId}">Request</button>
            </div>
        </div>
        `;
    });
    cartContainer.innerHTML = htmlList;
}
renderHtml();

const requestBtns = document.querySelectorAll('.request-btn');
requestBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(btn.innerHTML === 'Request'){
            btn.style.backgroundColor = 'orange';            
            btn.innerHTML = 'Requested';
            setTimeout(() => {
                btn.style.backgroundColor = '';
                btn.innerHTML = 'Request';
            }, 2000);
        }else{
            btn.style.backgroundColor = '';
            btn.innerHTML = 'Request';
        }
    })
});

document.querySelectorAll('.js-request-btn')
    .forEach((button) => {
        button.addEventListener('click', () => {
            let eventId = button.dataset.requestId;
            console.log(eventId);
            addToRsEvents(uniqueId, eventId);
        });

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

// console.log(JSON.parse(localStorage.getItem('UserInfo')));

// console.log(rsEvents);