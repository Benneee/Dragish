const log = console.log;

log("Client-side JS loaded!");

// The drop area
let dropArea = document.getElementById("drop-area");

// Add listener for all the events we will need
["dragcenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

// Preventing default drag and drop behavours when any of the events listed above is in use
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Help the user know they have dragged the item into the correct area by changing the color of the border

["dragenter", "dragover"].forEach(eventName => {
  dropArea.addEventListener(eventName, hl, false);
});

["dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, unhl, false);
});

function hl(e) {
  dropArea.classList.add("hl");
}

function unhl(e) {
  dropArea.classList.remove("hl");
}

// Section to do stuff with files when they are dropped
dropArea.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  // Because files is a FileList, we need to convert it to an array to work with it
  files = [...files];
  files.forEach(uploadFile);
  files.forEach(previewFile);
}

function uploadFile(file) {
  // Here we send files over to the server
  let url = "";
  let formData = new FormData();

  formData.append("file", file);
  log(formData);

  //   fetch(url, {
  //     method: "POST",
  //     body: formData
  //   })
  //     .then(() => {
  //       //   Do stuff with response
  //     })
  //     .catch(() => {
  //       //   Do stuff with error message
  //     });
}

// Preview Files
function previewFile(file) {
  let reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let doc = document.createElement("img");
    doc.src = reader.result;
    document.getElementById("gallery").appendChild(doc);
  };
}
