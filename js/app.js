/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
const listOfSections = document.querySelectorAll('section');
const button = document.querySelector('#to-top-button');
let timer = null;

/* dynamically creates navbar with document fragment */
let createNav = () => {
    const myDocFrag = document.createDocumentFragment();
    const myUl = document.querySelector('#navbar__list');
    for(const section of listOfSections){
        const newLiElement = document.createElement('li');
        newLiElement.classList.add('menu__link');
        newLiElement.innerHTML = `<a id = "${section.id}-link" href = "#${section.id}">${section.dataset.nav}</a>`;

        myDocFrag.appendChild(newLiElement);
    }
    myUl.appendChild(myDocFrag)
}

/* set active class and hide naviagtion after scrolling */
let setActive = () => {
    let nav = document.querySelector('nav');
    if(timer !== null){
        clearTimeout(timer);
    }
    
    /* if event listener is not triggered again within 30 millisec, we hide navbar */
    timer = setTimeout(function(){
        //if user not at the top, hide navbar and add scroll top button
        if(window.scrollY !== 0){
            nav.classList.remove('navbar__menu');
            nav.classList.add('hide-content')
            button.classList.remove('hide-content');
        } else{
            button.classList.add('hide-content');
        }}
    , 30);

    /* set active state */
    nav.classList.add('navbar__menu');
    nav.classList.remove('hide-content');
    const windowInnerHeight = innerHeight;
    let sectionStart = listOfSections[0];
    for(const section of listOfSections){
        const rect = section.getBoundingClientRect();
        const distanceRelativeTop = Math.abs(rect.top);
        if(rect.top < windowInnerHeight){
            sectionStart = section;
        }
        sectionStart.classList.remove('your-active-class');
    }
    sectionStart.classList.add('your-active-class');
}

/* event listener functions */
let scrollHandle = (event) => {
    //prevent anchor tag to jump by default
    event.preventDefault();
    const sectionElementId = event.currentTarget.id.slice(0,8);
    const anchorElement = document.querySelector(`#${sectionElementId}`);
    anchorElement.scrollIntoView({behavior: 'smooth'});
};

let collapseHandle = (event) => {
    const paragraphContent = document.querySelector(`#${event.currentTarget.id}-content`);
    paragraphContent.classList.toggle('hide-content');
}

let scrollToTop = (event) => {
    //scroll to top of page smoothly
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
}

/* call createNav to build my navigation bar*/
createNav();

//event listener for collapsible
listOfSections.forEach((section) => {
    section.addEventListener('click', collapseHandle, false);
})

//event listener for scroll to link clicked
const listOfAnchors = document.querySelectorAll('a');
listOfAnchors.forEach((anchor) => {
    anchor.addEventListener('click', scrollHandle , false);
});

//event listen to set active state
document.addEventListener('scroll', setActive, false);

//event listener to scroll to top when button clicked
button.addEventListener('click', scrollToTop, false);