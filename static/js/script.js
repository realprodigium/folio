const cursor = document.querySelector('.blob');

document.addEventListener('mousemove', function(e) {
    requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
    
        cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    });
});

function disableBlobOnMobile() {
    if ("ontouchstart" in window || navigator.maxTouchPoints) {
        blob.style.display = "none"; 
        document.removeEventListener("mousemove", updateBlobPosition);
    }
}

disableBlobOnMobile();
