//dom elements and related
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const fileInput = document.querySelector('input[type="file"]');
const zoomIn = document.querySelector('.zoom-in');
const zoomOut = document.querySelector('.zoom-out');

//state variables
let image;
let imageSize = 1;
let imageX = 0;
let imageY = 0;
let dragging, dragStartPosition;

const drawImage = () => {
  if (image) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(
      image, 
      imageX, 
      imageY, 
      image.naturalWidth * imageSize,
      image.naturalHeight * imageSize,
    )
  }
};

fileInput.addEventListener('change', (e) => {
  image = new Image();
  image.onload = drawImage;
  image.src = URL.createObjectURL(e.target.files[0]);
});

zoomIn.addEventListener('click', () => {
  imageSize += 0.05;
  drawImage();
});

zoomOut.addEventListener('click', () => {
  imageSize -= 0.05;
  drawImage();
});

canvas.addEventListener('mousedown', (e) => {
  dragging = true;
  dragStartPosition = {
    mouse: {x: e.layerX, y: e.layerY},
    image: {x: imageX, y: imageY}
  }
});

canvas.addEventListener('mouseup', () => { dragging = false; })
canvas.addEventListener('mouseout', () => { dragging = false; })

canvas.addEventListener('mousemove', (e) => {
  if (dragging) {
    /*
      The new image position is equal to the
      image position when the drag began, plus the distance the mouse has moved
      from it's starting position when the drag began
     */
    imageX = dragStartPosition.image.x + (e.layerX - dragStartPosition.mouse.x)
    imageY = dragStartPosition.image.y + (e.layerY - dragStartPosition.mouse.y)
    drawImage();
  }
});