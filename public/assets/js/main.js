'use strict'

const entities = document.querySelectorAll('.pointer');
const sheet = $('#sheet');
const newEntity = new Event('entityCreated')

const handleClickEntity = () => {
    sheet.append(`
        <svg class="draggable" version="1.1" xmlns="http://www.w3.org/2000/svg"
            width="120" height="100" viewBox="0 0 120 100">
            <rect x="10" y="10" width="100" height="80" rx="20" ry="20"
            fill="RoyalBlue" />
        </svg>`);
    document.dispatchEvent(newEntity);
}

document.addEventListener('DOMContentLoaded', () => {

    entities.forEach(entity => { 
        entity.addEventListener('click', handleClickEntity ) 
    })

});