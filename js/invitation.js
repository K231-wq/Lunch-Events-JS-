import { events } from "./data.js";
import { getMyInvitationList, deleteUserCreateEvent, deleteUserRsEvent } from "./util/Methods.js";
console.log(events);

document.addEventListener('DOMContentLoaded', () => {
    const lobby = document.querySelector('.js-lobby-btn');
    const create = document.querySelector('.js-create-btn');
    const invite = document.querySelector('.js-invite-btn');
    const rsvp = document.querySelector('.js-rsvp-btn');
    const profile =document.querySelector('.js-profile-btn');
    const logout = document.querySelector('.js-logout-btn');

    let userInfo = JSON.parse(localStorage.getItem('UserInfo'));
    const cardContainer = document.querySelector('.card-container');
    const uniqueId = userInfo.uniqueId;
    renderInvitationPage();
    function renderInvitationPage(){
        let invitationList = getMyInvitationList(userInfo.uniqueId);
        let invitationHtmllist = '';
        invitationList.forEach((eachInvite) => {
            invitationHtmllist += `
                 <div class="card">
                    <div class="text-container">
                        <div class="textform textfrom-address">
                            <i class="fa-solid fa-location-dot"></i>
                            <p>${eachInvite.address}</p>
                        </div>
                        <div class="textform textfrom-time">
                            <i class="fa-regular fa-clock"></i>
                            <p class="grid-title">Time:</p>
                            <p>${eachInvite.time}</p>
                        </div>
                        <div class="textform textfrom-capacity">
                            <i class="fa-solid fa-users"></i>
                            <p class="grid-title">Capacity:</p>
                            <p>${eachInvite.capacity}</p>
                        </div>
                        <div class="textform textfrom-des">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <p class="grid-title">Description:</p>
                            <p>${eachInvite.descripton}</p>
                        </div>
                        <div class="textform textfrom-create-by">
                            <i class="fa-solid fa-user"></i>
                            <p class="grid-title">Create By:</p>
                            <p>${eachInvite.create_at}</p>
                        </div>
                    </div>
                    <div class="btn-container">
                        <button class="edit-btn js-edit-btn" data-edit-id="${eachInvite.eventId}">
                            Edit
                        </button>
                        <button class="delete-btn js-delete-btn" data-delete-id="${eachInvite.eventId}">Delete</button>
                    </div>
                </div>
            `;
        });
        cardContainer.innerHTML = invitationHtmllist;
        handleEditMethod();
        handleDeleteMethod();
    }
    // handleEditMethod();
    function handleEditMethod(){
        const editBtns = document.querySelectorAll('.js-edit-btn');
        editBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const editId = btn.dataset.editId;
                console.log(editId);
                window.location.href = `/launch/form-layout/update.html?editId=${editId}`;
            });
        });
    }

    handleDeleteMethod();
    function handleDeleteMethod(){
        const deleteBtns = document.querySelectorAll('.js-delete-btn');
        console.log(uniqueId);
        deleteBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                let deleteId = btn.dataset.deleteId;
                deleteUserRsEvent(uniqueId, deleteId);
                deleteUserCreateEvent(deleteId);
                renderInvitationPage();
            });
        });
    };
    
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



