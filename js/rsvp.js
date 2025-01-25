import { rsEvents, loadRsEvents, getEvent, removeRsEventsOnce } from "./util/Methods.js";
import { events } from "./data.js";

const lobby = document.querySelector('.js-lobby-btn');
const create = document.querySelector('.js-create-btn');
const invite = document.querySelector('.js-invite-btn');
const rsvp = document.querySelector('.js-rsvp-btn');
const profile =document.querySelector('.js-profile-btn');
const logout = document.querySelector('.js-logout-btn');

const cartContainer = document.querySelector('.card-container');

let userInfo = JSON.parse(localStorage.getItem('UserInfo'));
const uniqueId = userInfo.uniqueId;
// loadRsEvents(uniqueId);
// console.log(rsEvents);
renderRSVPHtml();

function renderRSVPHtml(){
    let rsEventHtml = '';
    loadRsEvents(uniqueId);
    rsEvents.forEach((rsEvent) => {
        let matchingEvent = getEvent(rsEvent.eventId);
        // console.log(matchingEvent);
        rsEventHtml += `
            <div class="card">
                <div class="text-container">
                    <div class="textform textfrom-address">
                        <i class="fa-solid fa-location-dot"></i>
                        <p>${matchingEvent.address}</p>
                    </div>
                    <div class="textform textfrom-time">
                        <i class="fa-regular fa-clock"></i>
                        <p class="grid-title">Time:</p>
                        <p>${matchingEvent.time}</p>
                    </div>
                    <div class="textform textfrom-capacity">
                        <i class="fa-solid fa-users"></i>
                        <p class="grid-title">Capacity:</p>
                        <p>${matchingEvent.capacity}</p>
                    </div>
                    <div class="textform textfrom-des">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <p class="grid-title">Description:</p>
                        <p>${matchingEvent.descripton}</p>
                    </div>
                    <div class="textform textfrom-create-by">
                        <i class="fa-solid fa-user"></i>
                        <p class="grid-title">Create By:</p>
                        <p>${matchingEvent.create_at}</p>
                    </div>
                </div>
                <div class="btn-container">
                    <button class="delete-btn js-request-btn" data-request-id="${matchingEvent.eventId}">Delete</button>
                </div>
            </div>
        `;
        
    });
    cartContainer.innerHTML = rsEventHtml;
    handleDelete();
}
handleDelete();
function handleDelete(){
    const delButtons = document.querySelectorAll('.js-request-btn');
    delButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let eventId = btn.dataset.requestId;
            removeRsEventsOnce(uniqueId, eventId);
            renderRSVPHtml();
        });
    });
}
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
