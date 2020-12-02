'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const drags = document.querySelectorAll('.draggable');

    drags.forEach(element => {
        let draggable = new PlainDraggable(element);
        draggable.snap = {x: 130};
    })
});