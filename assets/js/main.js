const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    loop: false,
    slidesPerView: 3,
    spaceBetween: 14,
    centeredSlides: true,
    activeSlideKey: 1,
    initialSlide: 1,
    breakpoints: {
      340: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1165: {
        slidesPerView: 3, 
        spaceBetween: 30,
      },
    },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
  });


  function startCountdownFromTenMinutes() {
    const timers = document.querySelectorAll('.timer');
    
    timers.forEach(timer => {
        const minsElement = timer.querySelector('.mins');
        const secsElement = timer.querySelector('.secs');
        
        let minutes = 10;
        let seconds = 0;
        
        minsElement.textContent = minutes.toString().padStart(2, '0');
        secsElement.textContent = seconds.toString().padStart(2, '0');
        
        const countdown = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(countdown);
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            
            minsElement.textContent = minutes.toString().padStart(2, '0');
            secsElement.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    });
  }

// Blue or white version

document.addEventListener('DOMContentLoaded', function() {
  let style = 'blue';
  document.body.classList.add(style);
  let blueButtons = document.querySelectorAll('.blue-btn'),
      section2 = document.querySelector('.section-2');

  blueButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      section2.classList.remove('hidden-section');
      requestAnimationFrame(animateProgress);
    })
  })

  let iosSection = document.querySelector('.ios'),
      systemSection = document.querySelector('.system'),
      appsSection = document.querySelector('.apps'),
      photosSection = document.querySelector('.photos'),
      progressBar = document.querySelector('.progress-bar .track'),
      storageContainer = document.querySelector('.storage-container'),
      completedContainer = document.querySelector('.completed-container');


  function screenAnimation () {
    photosSection.style.width = '20%';
    appsSection.style.width = '28%';
    systemSection.style.width = '35%';
    iosSection.style.width = '43%';
  }



  let startTime = null;
  const duration = 5000;
  let loadingItems = document.querySelectorAll('.progress-container .item');

  function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); 
    
    progressBar.style.width = `${progress * 100}%`;
    
    if (progress >= 0.3 && progress < 0.6) {
      loadingItems[0].classList.add('active');
      screenAnimation();
    } else if (progress >= 0.6 && progress < 1) {
      loadingItems[1].classList.add('active');
    } else if (progress >= 1) {
      loadingItems[2].classList.add('active');}
    
    
    if (progress < 1) {
      requestAnimationFrame(animateProgress);
    } else {
      setTimeout(() => {
        storageContainer.classList.add('hidden-section');
        completedContainer.classList.remove('hidden-section');
      }, 2000);
    }
  };

  let completedButton = document.querySelector('.completed-container button'),
      section3 = document.querySelector('.section-3');

  completedButton.addEventListener('click', function() {
    completedContainer.classList.add('hidden-section');
    section2.classList.add('hidden-section');
    section3.classList.remove('hidden-section');
  })


  // Validation email
  let email = document.getElementById('email'),
      emailBtn = document.querySelector('#emailBtn'),
      error = document.querySelector('.error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

  email.addEventListener('input', function() {
    if (email.value.match(emailRegex)) {
      error.classList.remove('active');
      email.classList.remove('error-input');
      emailBtn.classList.remove('blocked');
    } else {
      error.classList.add('active');
      email.classList.add('error-input');
      emailBtn.classList.add('blocked');
    }
  })

  // Add email provider to email
  let tooltips = document.querySelectorAll('.tooltips .item');

  tooltips.forEach(function(tooltip) {
    tooltip.addEventListener('click', function() {
      email.value = email.value + tooltip.textContent;
      if (email.value.match(emailRegex)) {
        error.classList.remove('active');
        email.classList.remove('error-input');
      emailBtn.classList.remove('blocked');

      } else {
        error.classList.add('active');
        email.classList.add('error-input');
        emailBtn.classList.add('blocked');
      }
    })
  });

  let nextBtn = document.querySelector('#emailBtn'),
      emailSection = document.querySelector('.section-3 .container'),
      checkoutSection = document.querySelector('.checkout');

  nextBtn.addEventListener('click', function() {
    if(email.value.match(emailRegex)) {
      emailSection.classList.add('hidden-section');
      checkoutSection.classList.remove('hidden-section');
      section3.classList.remove('block-scroll');
      startCountdownFromTenMinutes();
    }
  })


  // Package selection
  let packages = document.querySelectorAll('.packages .item');

  packages.forEach(function(package) {
    package.addEventListener('click', function() {
      packages.forEach(function(package) {
        package.classList.remove('active');
      })
      package.classList.add('active');
    })
  })

  // Card validation and formatting
  let cardInputs = document.querySelectorAll('.card-form input');
  let continueBtn = document.querySelector('.continue-btn');

  // Format card number with spaces
  function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, ''); // Remove existing spaces
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    
    // Limit to 16 digits + spaces
    input.value = formattedValue.slice(0, 19);
  }

  // Format expiry date with slash
  function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    // Limit to MM/YY format
    input.value = value.slice(0, 5);
  }

  // Format CVC
  function formatCVC(input) {
    let value = input.value.replace(/\D/g, ''); // Remove non-digits
    input.value = value.slice(0, 4); // Limit to 4 digits
  }

  // Add input listeners for formatting
  cardInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.style.border = '';
      
      if (this.placeholder === 'Card number') {
        let value = this.value.replace(/\D/g, ''); // Remove non-digits
        formatCardNumber(this);
      } else if (this.placeholder === 'MM/YY') {
        formatExpiryDate(this);
      } else if (this.placeholder === 'CVC') {
        formatCVC(this);
      }
    });

    // Prevent non-digit input only for card number, expiry date and CVC
    input.addEventListener('keypress', function(e) {
      if (this.placeholder === 'Card number' || 
          this.placeholder === 'MM/YY' || 
          this.placeholder === 'CVC') {
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      }
    });
  });

  function validateCard() {
    let isValid = true;
    
    cardInputs.forEach(input => {
      if (!input.value) {
        input.style.border = '1px solid red';
        isValid = false;
      }
    });

    // Basic card number validation (16 digits)
    let cardNumber = document.querySelector('input[placeholder="Card number"]');
    if (cardNumber.value && cardNumber.value.replace(/\s/g, '').length !== 16) {
      cardNumber.style.border = '1px solid red';
      isValid = false;
    }

    // Expiry date validation (MM/YY format)
    let expiryDate = document.querySelector('input[placeholder="MM/YY"]');
    if (expiryDate.value && !/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
      expiryDate.style.border = '1px solid red';
      isValid = false;
    }

    // CVC validation (3-4 digits)
    let cvc = document.querySelector('input[placeholder="CVC"]');
    if (cvc.value && !/^\d{3,4}$/.test(cvc.value)) {
      cvc.style.border = '1px solid red';
      isValid = false;
    }

    return isValid;
  }

  continueBtn.addEventListener('click', function(e) {
    e.preventDefault();
    validateCard();
  });

  // Prevent letters in card number and expiry date
  let numberCard = document.querySelector('#numberCard');
  let dateInput = document.querySelector('input[placeholder="MM/YY"]');

  numberCard.addEventListener('keypress', function(e) {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });

  dateInput.addEventListener('keypress', function(e) {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });


  // Mobile menu
  let burger = document.querySelector('.hero-section .header .burger-menu');
  let mobileMenu = document.querySelector('.mobile-menu-popup'),
      closeBtn = document.querySelector('.mobile-menu-popup .close-btn');

  burger.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
  })

  mobileMenu.addEventListener('click', function(event) {
    if(event.target === mobileMenu) {
      event.stopPropagation();
    mobileMenu.classList.remove('active');
    }
  })

  closeBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
  })
  

  
})