// $(document).ready(function () {
//   const imgs = document.querySelectorAll(".img-select a");
//   const imgBtns = [...imgs];
//   let imgId = 1;

//   imgBtns.forEach((imgItem) => {
//     imgItem.addEventListener("click", (event) => {
//       event.preventDefault();
//       imgId = imgItem.dataset.id;
//       slideImage();
//     });
//   });

//   function slideImage() {
//     const displayWidth = document.querySelector(
//       ".img-showcase img:first-child"
//     ).clientWidth;

//     document.querySelector(".img-showcase").style.transform = `translateX(${
//       -(imgId - 1) * displayWidth
//     }px)`;
//   }

//   window.addEventListener("resize", slideImage);
// });

$(document).ready(function () {
  for (let i = 0; i < document.querySelectorAll(".img-showcase").length; i++) {
    const id = i + 1;
    var imgBtns = [
      ...document.querySelectorAll(`.img-select.img-select-${id} a`),
    ];
    let imgId = 1;
    function slideImage() {
      var displayWidth = document.querySelector(
        `.img-showcase.img-showcase-${id} img:first-child`
      ).clientWidth;
      document.querySelector(
        ".img-showcase.img-showcase-" + id
      ).style.transform = `translateX(${-(imgId - 1) * displayWidth}px)`;
    }
    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
      });
    }),
      window.addEventListener("resize", slideImage);
  }
});
