defaultStore = [
    {
        id: 'lgm3puP3tMA',
        src: 'https://www.youtube.com/embed/lgm3puP3tMA',
        title: 'Vid1'
    },
    {
        id: 'HvkqvbdwOlw',
        src: "https://www.youtube.com/embed/HvkqvbdwOlw",
        title: 'Vid2'
    }
]

const body = document.querySelector('body');
const ulPlayList = document.querySelector('#play-list');
const videoArea = document.querySelector('.video-area');
const video = document.querySelector('#main-video');
const url = document.querySelector('#url-input');
const urlMobile = document.querySelector('#url-input-mobile');
const title = document.querySelector('#title-input');
const titleMobile = document.querySelector('#title-input-mobile');
const addButton = document.querySelector('#add-button');
const addButtonMobile = document.querySelector('#add-button-mobile');
const searchIcon = document.querySelector('.fa-search')
const searchScreenExtra = document.querySelector('.mobile-search');
const searchForm = document.querySelector('.search-form')

ulPlayList.addEventListener('click', ulClick);
addButton.addEventListener('click', ()=>setPlayList(url.value, title.value));
addButtonMobile.addEventListener('click', ()=>setPlayList(urlMobile.value, titleMobile.value));
searchIcon.addEventListener('click', openSearchForm);
searchScreenExtra.addEventListener('click', (e)=>closeSearchForm(e.target));

let playList;

function openSearchForm(){
    searchScreenExtra.style.display = 'flex';
}
function closeSearchForm(element = searchScreenExtra){
    if(element.classList.contains('mobile-search')) {searchScreenExtra.style.display = 'none';}
}

function getPlaylist (){
    playList = JSON.parse(localStorage.getItem('playList')) || [];
    if(!playList.length){
        playList = defaultStore;
    }
};
getPlaylist();
function updatePlayListArea(playList){
    if(!playList.length){
        playList = defaultStore;
    }
    localStorage.setItem('playList', JSON.stringify(playList));
    ulPlayList.innerHTML = '';
    playList.map((video)=>{ 
        setTimeout(()=>{
            ulPlayList.innerHTML += `
            <li id="${video.id}" class="my-flex play-list-items">
                <img class="thumbnail" src="//img.youtube.com/vi/${video.id}/0.jpg">
                <p class="title">${video.title}</p>
                <div class="list-content-buttons">
                    <!--<i class="fas fa-play"></i>
                    <i class="fas fa-pause"></i>-->
                    <i class="fas fa-trash-alt"></i>
                </div>
            </li>`;
        },100)
    });
};
updatePlayListArea(playList);
function clearFeilds(){
    urlMobile.value = '';
    titleMobile.value = '';
    url.value = '';
    title.value = '';
}
function setPlayList(url, title){
    if(url && title){
        let id = url.match(/[\w\-]{11,}/)[0];
        if(id){
            playList.push({
                id ,
                src: `https://www.youtube.com/embed/${id}`,
                title: title
            })
            updatePlayListArea(playList);
            clearFeilds();
            closeSearchForm();
        }
        else{
            alert('Provide data in correct form');
        }
    }
    else{
        alert('Fill out the feilds first');
    }
};
function updateVideoArea(index = 0){
    video.setAttribute('src', playList[index].src + '?autoplay=1');
};
updateVideoArea();

function ulClick(e){
    let element = e.target;
    if(element.parentNode.classList.contains('play-list-items')){
        element = element.parentNode;
        playVideo(element)
    }
    if(element.classList.contains("fa-trash-alt")){
        deleteVideo(e);
    }
};

function playVideo(element){
    for (let index = 0; index < playList.length; index++) {
        const obj = playList[index];
        if(obj.id === element.id){
            updateVideoArea(index);
        }
    }
}

function compareVideoArea(index){
    if(playList[index].src==video.src){
        return true;
    }
}

function deleteVideo(e){
    let video = e.target.parentNode.parentNode.id;
    for (let index = 0; index < playList.length; index++) {
        const obj = playList[index];
        if(obj.id == video){
            isSame = compareVideoArea(index);
            playList.splice(index, 1);
            updatePlayListArea(playList);
            updateVideoArea();
        }
    }
}
// setTimeout(() => {
//     const deleteButton = document.querySelector('.delete');
//     deleteButton.addEventListener('click', deleteVideo);
// }, 1500);


// function autoPlayer() {
//     document.querySelector('#main-video').contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
// }

// function StopIframeVideo() {
//     document.querySelector('#main-video').contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
// }

// function PauseIframeVideo() {
//     document.querySelector('#main-video').contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
// }