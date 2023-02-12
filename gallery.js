//  creating a closure so that multiple galleries can use the same code

function Gallery(gallery) {
  //  if nothing is passed
  if(!gallery) {
    throw new Error("No gallery!");
  }
  // selecting all the images in the gallery
  const images = gallery.querySelectorAll('img');
  // console.log(images); 
  // Select the modal 
  const modal = document.querySelector('.modal');
  // Select the previous and next buttons on the modal
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImg ;
  // When someone clicks an image, you have to show the image in the modal
  //  Update the image in the modal and pop up the modal
  
  
  // open the modal
  function openModal() {
    console.info('opening the modal...');
    // first check if the modal is already open
    if(modal.matches('.open')) {
      console.info("Modal is already open");
      return;
    }
    modal.classList.add('open');
    
    // Event listeners bound to the open modal
    // They will only fire inside the open modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
    
  }
  
  
  function closeModal() {
    modal.classList.remove('open');
    // removing the event listeners after closing the modal
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }
  
  function handleClickOutside(event) {
    // console.log(event.target, event.currentTarget);
    if(event.target === event.currentTarget) {
      closeModal();
    }
  }
  function handleKeyUp(event) {
    if(event.key === 'Escape') return closeModal();
    if(event.key === 'ArrowLeft') return showPrevImage();
    if(event.key === 'ArrowRight') return showNextImage();
  }

  function showNextImage() {
    // console.log(currentImg.nextElementSibling);
    showImage(currentImg.nextElementSibling || gallery.firstElementChild);
  }
  function showPrevImage() {
    showImage(currentImg.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(img) {
    if(!img) {
      console.info("No image to show");
      return;
    }
    // console.log(img);
    // if the image exists, update the modal with the image
    const modalImg = modal.querySelector('img');
    // console.log(img.dataset);
    modalImg.src = img.src;
    // modalImg.alt = img.alt;
    // modalImg.title = img.title;
    // modalImg.dataset.description = img.dataset.description;
    modal.querySelector('h2').textContent = img.title;
    modal.querySelector('figure p').textContent = img.dataset.description;
    currentImg = img;
    openModal();
    // console.log(modalImg);  
  }

  
  // Event Listeners
  images.forEach( img => img.addEventListener('click', event => showImage(event.currentTarget))) ;

  modal.addEventListener('click', handleClickOutside)
  // Event listener for keyboard users
  images.forEach( img => img.addEventListener('keyup', event => {
    if(event.key === 'Enter') {
      showImage(event.currentTarget);
    }
  }))

}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));

console.log('it works');