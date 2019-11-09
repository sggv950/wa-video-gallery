function getVideosData() {
  if (localStorage.videosData) return getFromStorage('videosData');
  else {
    var videosData = [
      {
        id: makeId(),
        title: "How to Set Up Your Call Center",
        url: "https://www.youtube.com/embed/POALVD7pbrQ",
        viewers: 0,
        topic: "Set Up Your Call Center"
      },
      {
        id: makeId(),
        title: "How to Add a Phone Line and Set Its Business Hours",
        url: "https://www.youtube.com/embed/M0cnxbjeoEI",
        viewers: 0,
        topic: "Set Up Your Call Center"
      },
      {
        id: makeId(),
        title: "How to Add a Call Queue and Assign Agents to It",
        url: "https://www.youtube.com/embed/oZOn8aLdoto",
        viewers: 0,
        topic: "Set Up Your Call Center"
      },
      {
        id: makeId(),
        title: "How to Set Up an Interactive Voice Response (IVR) Flow",
        url: "https://www.youtube.com/embed/FbXoepqqWJ8",
        viewers: 0,
        topic: "Set Up Your Call Center"
      },
      {
        id: makeId(),
        title: "How to Customize the Audio Callers Hear While Waiting",
        url: "https://www.youtube.com/embed/RK4OvfHFTgI",
        viewers: 0,
        topic: "Set Up Your Call Center"
      },
      {
        id: makeId(),
        title: "How to Create Articles for Your Help Center",
        url: "https://www.youtube.com/embed/ogwv3bD8eNs",
        viewers: 0,
        topic: "Create Articles for Your Help Center"
      },
      {
        id: makeId(),
        title: "How to Customize Your Help Center",
        url: "https://www.youtube.com/embed/7K_zBDfSPsQ",
        viewers: 0,
        topic: "Create Articles for Your Help Center"
      },
      {
        id: makeId(),
        title: "How to Add a Field to Your Help Center Contact Form",
        url: "https://www.youtube.com/embed/MF84JXk7cjA",
        viewers: 0,
        topic: "Create Articles for Your Help Center"
      },
      {
        id: makeId(),
        title: "How to Set Up Your Ticketing System",
        url: "https://www.youtube.com/embed/uG_06Cl857k",
        viewers: 0,
        topic: "Set Up Your Ticketing System"
      },
      {
        id: makeId(),
        title: "How to Edit Automated Ticket Follow-Up Emails",
        url: "https://www.youtube.com/embed/dEIXZj_NHlk",
        viewers: 0,
        topic: "Set Up Your Ticketing System"
      },
      {
        id: makeId(),
        title: "Setting Up Interactive Voice Response",
        url: "https://www.youtube.com/embed/Xt96TRw-zeM",
        viewers: 0,
        topic: "Setting Up Interactive Voice Response"
      },
      {
        id: makeId(),
        title: "Setting Up Automatic Actions",
        url: "https://www.youtube.com/embed/0wXAobKUNc8",
        viewers: 0,
        topic: "Setting Up Automatic Actions"
      },
      {
        id: makeId(),
        title: "Creating an Internal Knowledge Base",
        url: "https://www.youtube.com/embed/-vUuChSwY6E",
        viewers: 0,
        topic: "Creating an Internal Knowledge Base"
      }
    ];
    var videosDataJson = JSON.stringify(videosData);
    localStorage.setItem("videosData", videosDataJson);
    return videosData;
  }
}

function getVideoById(id) {
  var videosData = getVideosData();
  return videosData.find(video => {
    return video.id === id;
  });
}

function addVideoToStorage(videosDataObj){
    var videosData = getVideosData();
    videosData.push(videosDataObj);
    saveToStorage('videosData', JSON.stringify(videosData));
    return videosData;
}

function updateVideoInStorage(id, videosDataObj){
    console.log('calling updateVideoInStorage', id, videosDataObj)
    var videosData = getVideosData();
    var videoToUpdateIdx = videosData.findIndex(video => {
        return video.id === id;
    })
    console.log('calling videoToUpdateIdx', videoToUpdateIdx)
    videosData.splice(videoToUpdateIdx, 1, videosDataObj)
    console.log('calling videosData', videosData)
    saveToStorage('videosData', JSON.stringify(videosData));
    return videosData;
}

function removeVideoFromStorage(id) {
  var videosData = getVideosData();
  var filteredVideos = videosData.filter(video => {
    return video.id !== id;
  });

  saveToStorage('videosData', JSON.stringify(filteredVideos));
  return filteredVideos;
}

//add export later
//   export default {
//       getVideosData,
//       getVideoById
//   }
