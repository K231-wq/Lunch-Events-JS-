import { events } from "./data.js";
import { getEvent, editUserCreatedEvent } from "./util/Methods.js";

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('editId');
    // console.log("Event Id: " + editId);
    // console.log(events);

    handleUpdateEvent(editId);
    fetchEventDataValue(editId)    ;
});
function handleUpdateEvent(editId){
    const updateBtn = document.querySelector('.js-create-btn');
    const resultArea = document.querySelector('.js-error-result');
    const dateElement = document.getElementById('date');
    const capacityElement = document.getElementById('capacity');
    const descriptionElement = document.getElementById('description');
    const addressElement = document.getElementById('address');
    let updateInfo = [];

    updateBtn.addEventListener('click', () => {
        let date = dateElement.value;
        let capacity = Number(capacityElement.value);
        let description = descriptionElement.value;
        let address = addressElement.value;

        if(date && capacity && description && address){
            updateInfo.editId = editId;
            updateInfo.date = date;
            updateInfo.capacity = capacity;
            updateInfo.description = description;
            updateInfo.address = address;
            // console.log(updateInfo);
            editUserCreatedEvent(updateInfo);
            resultArea.innerHTML = `<p>SUCCESSFULLY EDITED THE EVENT😆😆</p>`;
            resultArea.classList.add('success');
            setTimeout(() => {
                resultArea.innerHTML = ' ';
                resultArea.classList.remove('success');
                window.location.href = '/launch/form-layout/invite.html';
            }, 2000);
        }else{
            alert("Please Fill all FIELDS😭😭");
            dateElement.value = null;
            capacityElement.value = '';
            descriptionElement.innerHTML = '';
            addressElement.value = '';
        }
    });
}
function fetchEventDataValue(editId){
    let event = getEvent(editId);
    // console.log(event);
    if(event){
        console.log(event);
        console.log(event.descripton);
        document.getElementById("date").value = event.time || '';
        document.getElementById("capacity").value = event.capacity || '';
        document.getElementById("description").innerHTML = event.descripton || '';
        document.getElementById("address").value = event.address || '';
    }else{
        console.error("Event is not found for ID:: " + editId);
    }
}