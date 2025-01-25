import { events } from "../data.js";
export let rsEvents;

export function loadRsEvents(uniqueId){
    rsEvents = JSON.parse(localStorage.getItem(uniqueId)) || [];
    // console.log("Loaded rsEvents:", rsEvents);
}

export function addToRsEvents(uniqueId, eventId){
    let matchingEvent;
    rsEvents.forEach((rsEvent) => {
        if(rsEvent.eventId === eventId){
            matchingEvent = eventId;
        }
    })
    if(matchingEvent){
        alert("The Event is already added!!👌")
    }else{
        rsEvents.push({
            eventId: eventId
        });
    }
    console.log(rsEvents);
    saveRsEvents(uniqueId, rsEvents);
    
}
function saveRsEvents(name, data){
    localStorage.setItem(name, JSON.stringify(data));
}

// rsvp all reserve get data method
export function getEvent(eventId){
    let matchingEvent = events.find(event => event.eventId === eventId);
    // events.forEach((eachEvent) => {
    //     if(eachEvent.eventId === eventId){
    //         matchingEvent = eachEvent;
    //     }
    // });
    return matchingEvent;
}
//rsvp data remove
export function removeRsEventsOnce(uniqueId, eventId){
    loadRsEvents(uniqueId);
    // let matchingEvent = [];
    // rsEvents.forEach((rsEvent) => {
    //     if(rsEvent.eventId !== eventId){
    //         matchingEvent.push(rsEvent);
    //     }
    // });
    rsEvents = rsEvents.filter(rsEvent => rsEvent.eventId !== eventId);
    console.log(rsEvents);
    saveRsEvents(uniqueId, rsEvents);
}

export function getMyInvitationList(UniqueId){
    let myInvitations = [];
    events.forEach((eachEvent) => {
        if(eachEvent.uniqueId === UniqueId){
            myInvitations.push(eachEvent);
        }
    });
    return myInvitations;
}

export function deleteUserCreateEvent(eventId){
    const index = events.findIndex(event => event.eventId === eventId);
    if(index !== -1){
        console.log(index);
        events.splice(index, 1);
        saveAllEvents(events);
    }
    console.log("SUCCESSFULLY SAVED THE EVENTS 😁😁");
}
export function deleteUserRsEvent(uniqueId, eventId){
    if(loadRsEvents(uniqueId) !== null){
        loadRsEvents(uniqueId);
        rsEvents = rsEvents.filter((rsEvent) => rsEvent.eventId !== eventId);
        saveRsEvents(uniqueId, rsEvents);
    }else{
        console.log("not exists");
        return;
    }
}
export function editUserCreatedEvent(updateInfo){
    events.forEach((event, index) => {
        if(event.eventId === updateInfo.editId){
            event.time = updateInfo.date;
            event.capacity = updateInfo.capacity;
            event.descripton = updateInfo.description;
            event.address = updateInfo.address;
        }
    });
    // console.log(events);
    saveAllEvents(events);
}
function saveAllEvents(data){
    localStorage.setItem('AllEvents', JSON.stringify(data));
}