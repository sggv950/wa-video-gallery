//add import later

function init() {
  var videosData = getVideosData();
  return renderVideoList(videosData);
}

function renderVideoList(videosData) {
  var elVideoGallery = document.querySelector(".gallery-list");
  var strHtml = ``;
  videosData.forEach(video => {
    strHtml = `${strHtml}<li class="video-card-item" onclick="handleWatchVideo('${video.id}')">
      <div>
      <div class="image-container" >
        <div class="cta-container" >
          <p class="cta-text">watch video</p>
        </div>
        <img src="https://picsum.photos/325/200" alt=""/>
      </div>
      <div>
      <p class="video-title-text">${video.title}<p>
      </div>
      <button class="edit-video-btn" onclick="handleVEditVideo(event, '${video.id}')">Edit</button>
    </li>`;
  });
  if (strHtml === "")
    strHtml = `<div><h2>sorry we couldnt find any videos</h2></div>`;
  elVideoGallery.innerHTML = strHtml;
}

function handleWatchVideo(videoId) {
  console.log(videoId);
  var videoData = getVideoById(videoId);
  var elModal = document.querySelector(".modal");
  var elVideoModal = document.querySelector(".watch-video-modal");
  var strHtml = `
    <span><p class="close-modal-btn">&times</p></span> 
    <div>
    <h2>${videoData.title}</h2>
    <iframe width="560" height="315" src=${videoData.url} allowfullscreen></iframe>
    </div>`;

  elModal.style.display = "block";
  elVideoModal.innerHTML = strHtml;
}

function closeVideoModal(event) {
  var elModal = document.querySelector(".modal");
  var closeModalBtn = document.querySelector(".close-modal-btn")
  var saveEditBtn = document.querySelector(".video-edit-save-btn")
  var elVideoModal = document.querySelector(".watch-video-modal");
  var elEditModal = document.querySelector(".edit-video-modal");
  if (event.target == elModal || event.target == closeModalBtn || event.target == saveEditBtn) {
    elVideoModal.innerHTML = "";
    elEditModal.innerHTML = "";
    elModal.style.display = "none";
  } else return;
}

function handleVEditVideo(event, id = 0) {
  event.stopPropagation();
  var videoData = getVideoById(id);
  var elModal = document.querySelector(".modal");
  var elVideoModal = document.querySelector(".edit-video-modal");
  var strHtml = `
  <span><i class="fas fa-times fa-2x close-modal-btn"></i></span>
  <div class="video-edit-form">
  <h2>Edit Video</h2>
    <div class="video-edit-form-section">
      title 
      <input class="video-edit-form-title-input" type="text" value="${videoData.title}" />
    </div>
    <div class="video-edit-form-section">
      topic 
      <input class="video-edit-form-topic-input" type="text" value="${videoData.topic}" />
    </div>
    <div class="video-edit-form-section">
      url 
      <input class="video-edit-form-url-input" type="text" value="${videoData.url}" />
    </div>
      <button class="video-edit-save-btn" onclick="handleSaveVideo(event, '${videoData.id}')">save</button>
  </div>`;
  elModal.style.display = "block";
  elVideoModal.innerHTML = strHtml;
}

function handleVRemoveVideo(event, id) {
  event.stopPropagation();
  var updatedVideosData = removeVideoFromStorage(id);
  return renderVideoList(updatedVideosData);
}

function handleSaveVideo(event, id = 0) {
  console.log('calling handleSaveVideo', id);
  event.preventDefault();
  var titleInput = document.querySelector(".video-edit-form-title-input");
  var topicInput = document.querySelector(".video-edit-form-topic-input");
  var urlInput = document.querySelector(".video-edit-form-url-input");
  var videoDataObj = {
    id: id ? id : makeId(),
    title: titleInput.value,
    url: urlInput.value.replace("watch?v=", "embed/"),
    viewers: id ? getVideoById(id).viewers : 0,
    topic: topicInput.value
  }
  
  console.log('from handleSaveVideo', videoDataObj)
  var updatedVideosData;
  if(id) updatedVideosData = updateVideoInStorage(id, videoDataObj);
  else updatedVideosData = addVideoToStorage(videoDataObj);

  closeVideoModal(event);
  return renderVideoList(updatedVideosData);
}
