function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // la hora '0' debería ser '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const strTime = hours + ':' + minutes + ' ' + ampm;
    document.getElementById('time').innerText = strTime;
}

setInterval(updateClock, 1000);
updateClock(); 


const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');

startButton.addEventListener('click', () => {
    startMenu.classList.toggle('hidden');
});

// Cerrar el menú si se hace clic por fuera
document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
        startMenu.classList.add('hidden');
    }
});


const desktopIcons = {
    'icon-terminal': 'window-terminal',
    'icon-profile': 'window-profile',
    'icon-sysmon': 'window-sysmon',
    'icon-music': 'window-music'
};

for (let iconId in desktopIcons) {
    const iconElement = document.getElementById(iconId);
    if (iconElement) {
        iconElement.addEventListener('click', () => {
            const win = document.getElementById(desktopIcons[iconId]);
            win.classList.remove('hidden');
            bringToFront(win);
        });
    }
}

document.querySelectorAll('.control-btn.close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const windowElement = e.target.closest('.window');
        windowElement.classList.add('hidden');
    });
});


let highestZ = 100;

function bringToFront(element) {
    highestZ++;
    element.style.zIndex = highestZ;
}

document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));
});


document.querySelectorAll('.window').forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;
        bringToFront(win);
        
        
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
    
        win.style.left = (e.clientX - offsetX) + 'px';
        win.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
        }
    });
});