const btn = document.querySelector('.like');
const i = btn.querySelector('.fa-heart');
const body = document.querySelector('.sqr');

btn.addEventListener("click", () => {
    if (i.classList.contains('fa-regular')) {
        i.classList.remove('fa-regular');
        i.classList.add('fa-solid');
        body.addEventListener('mousemove', drawHeartOnPos);
    }

    else {
        i.classList.remove('fa-solid');
        i.classList.add('fa-regular');
        body.removeEventListener('mousemove', drawHeartOnPos);
    }
});

function drawHeartOnPos(event) {
    const heart = document.createElement("i");

    heart.className = 'fa-solid fa-heart';
    heart.style.position = "absolute";
    heart.style.top = (event.pageY - 10) + "px";
    heart.style.left = (event.pageX + 10) + "px"

    document.body.append(heart);
    setTimeout(function() {
        document.body.removeChild(heart);
    }, 500);
}