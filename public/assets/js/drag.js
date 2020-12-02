'use strict';

document.addEventListener('entityCreated', () => {
    const drags = document.querySelectorAll('.draggable');

    drags.forEach(element => {
        let draggable = new PlainDraggable(element);
        draggable.snap = {x: 130};
    })
});