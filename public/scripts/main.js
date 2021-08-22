// NAWIGACJA
const navMenu = document.getElementById('nav_menu');
const navToggle = document.getElementById('nav_toggle');
const navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    });
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

const navLink = document.querySelectorAll('.nav_link');
function linkAction(){
    const navMenu = document.getElementById('nav_menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// OKIENKO POJAWIAJĄCE SIĘ PRZY SEKCJI 'USŁUGI' PO KLIKNIĘCIU PRZYCISKU SERVICES_BUTTON
// $('.services_button').on('click', function(){
//     $(this).siblings('.services_modal').addClass('active-modal');
// });

// $('.services_modal-close').on('click', function(){
//     $(this).parent('.services_modal-content').parent('.services_modal').removeClass('active-modal');
// })

// POJAWIANIE SIĘ PRELOADERA I JEGO ZANIKANIE

$(window).on('load', function(){
    $('.preloader').addClass('complete')
})


// DZIAŁANIE PRZYCISKU SCROLLUJĄCEGO DO GÓRY

const scrollBtn = document.querySelector('.scrollToTop-btn');

window.addEventListener('scroll', function(){
    scrollBtn.classList.toggle('active', window.scrollY > 500);
})

scrollBtn.addEventListener('click', function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// POJAWIENIE SIĘ PŁYNNIE SEKCJI (DODATEK)

window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');
    for(var i = 0;i< reveals.length;i++){
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 50;

        if(revealTop < windowHeight - revealPoint){
            reveals[i].classList.add('active');
        }
    }
}

// FILTROWANIE W PORTFOLIO

$('.portfolio .button-container .btn').click(function(){

    let filter = $(this).attr('data-filter');

    if(filter == 'all'){
        $('.portfolio .image-container .box').show('400');
    }
    else {
        $('.portfolio .image-container .box').not('.' + filter).hide('200');
        $('.portfolio .image-container .box').filter('.' + filter).show('400');
    }
});

//WYSYŁANIE WIADOMOŚCI 

let firstname = document.getElementById('first_name');
let lastname =  document.getElementById('last_name');
let email = document.getElementById('email');
let phone_number = document.getElementById('phone_number');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

const contactForm = document.querySelector('.formBox');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        phone_number: phone_number.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert(`Wiadomość została wysłana :)`);
            firstname.value = '';
            lastname.value = '';
            email.value = '';
            phone_number.value = '';
            subject.value = '';
            message.value = '';
        } else {
            alert('Coś poszło nie tak :/ Spróbuj jeszcze raz po pewnym czasie!')
        }
    }

    xhr.send(JSON.stringify(formData));
})

