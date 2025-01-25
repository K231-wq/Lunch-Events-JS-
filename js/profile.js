import { events } from "./data.js";
import { getMyInvitationList, deleteUserRsEvent, deleteUserCreateEvent } from "./util/Methods.js";

document.addEventListener('DOMContentLoaded', () => {
    const lobby = document.querySelector('.js-lobby-btn');
    const create = document.querySelector('.js-create-btn');
    const invite = document.querySelector('.js-invite-btn');
    const rsvp = document.querySelector('.js-rsvp-btn');
    const profile =document.querySelector('.js-profile-btn');
    const logout = document.querySelector('.js-logout-btn');

    const form = document.querySelector("form");
    const input = document.getElementById("image-file");
    const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
    const uniqueId = userInfo.uniqueId;
    const container = document.querySelector('.card-container');
    console.log(userInfo);

    form.addEventListener('click', () => {
        input.click();
    })
    input.onchange = ({target}) => {
        let file = target.files[0];
        if (file) {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('uniqueId', uniqueId);

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/upload.php', true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // Assuming the server returns the path to the uploaded image
                    let response = JSON.parse(xhr.responseText);
                    let imagePath = response.filePath;
                    profileImage.src = imagePath; // Update the profile image
                    alert('Image uploaded successfully!');
                } else {
                    alert('Image upload failed!');
                }
            };
            xhr.send(formData);
        }
    }
    
    renderUserInvitations();
    function renderUserInvitations(){
        let invitationHtml = '';
        let invitationList = getMyInvitationList(uniqueId);
        invitationList.forEach((eachInvite, index) => {
            invitationHtml += `
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
        container.innerHTML = invitationHtml;
        handleDelete();
        handleEditMethod();
    }

    handleDelete();
    function handleDelete(){
        const deleteBtns = document.querySelectorAll('.js-delete-btn');
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                let deleteId = btn.dataset.deleteId;
                deleteUserRsEvent(uniqueId, deleteId);
                deleteUserCreateEvent(deleteId);
            });
        });
    }
    handleEditMethod();
    function handleEditMethod(){
        const editBtns = document.querySelectorAll('.js-edit-btn');
        editBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const editId = btn.dataset.editId;
                window.location.href = `/launch/form-layout/update.html?editId=${editId}`;
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
    
});