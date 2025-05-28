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

  mountStripe();

  let style = 'blue';
  document.body.classList.add(style);
  let blueButtons = document.querySelectorAll('.blue-btn'),
  section2 = document.querySelector('.section-2');
  section1 = document.querySelector('.section-1');
  
  blueButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      section2.classList.remove('hidden-section');
      section1.remove();
      requestAnimationFrame(animateProgress);
    })
  })
  
  storageContainer = document.querySelector('.storage-container'),
  completedContainer = document.querySelector('.completed-container');

  let startTime = null;
  const duration = 5000;
  
  function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); 

    const snowman = document.getElementById("snowman");

    // устанавливает прогресс анимации от 0 до 1
    function setProgress(progress) {
      const totalDuration = 2;
      snowman.setCurrentTime(progress * totalDuration);
    }

    setProgress(progress);
    
    if (progress < 1) {
      console.log(progress);
      requestAnimationFrame(animateProgress);
    } else {
      console.log('finish');
      setTimeout(() => {
        storageContainer.classList.add('hidden-section');
        completedContainer.classList.remove('hidden-section');
      }, 1000);
    }
  };
  
  let completedButton = document.querySelector('.completed-button'),
  section3 = document.querySelector('.section-3');
  
  if (completedButton != null) {
    completedButton.addEventListener('click', function() {
      completedContainer.classList.add('hidden-section');
      section2.classList.add('hidden-section');
      section3.classList.remove('hidden-section');
    })
  }
  
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
  secureSection = document.querySelector('.section-3 .secure-section');

  nextBtn.addEventListener('click', function() {
    if(email.value.match(emailRegex)) {
      secureSection.classList.add('hidden-section');
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
  let cardErrror = document.querySelectorAll('.card-error');

  cardErrror.forEach(input => {
    input.style.display = 'none'
  });

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
  
  // Format CVV
  function formatCVV(input) {
    let value = input.value.replace(/\D/g, ''); // Remove non-digits
    input.value = value.slice(0, 4); // Limit to 4 digits
  }
  
  // Add input listeners for formatting
  cardInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.style.border = '';

      const inputField = this.closest('.input-field');
      const errorElement = inputField?.querySelector('.card-error');
  
      if (errorElement) {
        errorElement.style.display = 'none'; 
      }
  
      if (this.placeholder === 'Card number') {
        let value = this.value.replace(/\D/g, ''); // Remove non-digits
        formatCardNumber(this);
      } else if (this.placeholder === 'Expiry date') {
        formatExpiryDate(this);
      } else if (this.placeholder === 'CVV') {
        formatCVV(this);
      }
    });
    
    // Prevent non-digit input only for card number, expiry date and CVV
    input.addEventListener('keypress', function(e) {
      if (this.placeholder === 'Card number' || this.placeholder === 'Expiry date' || this.placeholder === 'CVV') {  
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      }
    });
  });

  continueBtn?.addEventListener('click', async function(e) {
    e.preventDefault();

    let isValid = true;
    const cardholderInput = document.getElementById('cardholder-name');
    const errorDiv = cardholderInput.closest('.input-field')?.querySelector('.card-error');
    const inputGroup = cardholderInput.closest('.input-group')

    if (!cardholderInput.value.trim()) {
      inputGroup.style.border = '1px solid red';
      if (errorDiv) errorDiv.style.display = 'block';
      isValid = false;
    } else {
      inputGroup.style.border = 'none';
      if (errorDiv) errorDiv.style.display = 'none';
    }

    const testToken = await stripe.createToken(cardNumberElement, {
      name: cardholderInput.value || undefined,
    });

    handleStripeError(testToken, 'card-number');

    if (testToken.error) {
      isValid = false;
    }

    if (!isValid) return;

    const { token, error } = testToken;

    if (error || !token) {
      console.error(error?.message || 'Stripe token error');
      return;
    }

    let emailV = email?.value || "";
    console.log('email: ', emailV);
    await fetch("http://134.209.27.201:4242/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token.id,
        user_email: emailV, 
        price_id: "price_1RThR4FSmQ18A826qfeVjvri"
      })
    });
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
  
  
  function updateBarHeight() {
    const bar = document.querySelector('.bar');
    if (!bar) { return; }
    
    const barImg1 = document.querySelector('.bar-img-1');
    const barImg2 = document.querySelector('.bar-img-2');
    const barImg3 = document.querySelector('.bar-img-3');
    
    const wrapper = document.querySelector('.content-with-bar');
    const specialTitle1 = document.querySelector('.special-title-1');
    const specialTitle2 = document.querySelector('.special-title-2');
    const specialTitle3 = document.querySelector('.special-title-3');
    
    const wrapperTop = wrapper.getBoundingClientRect().top;
    const title1_rect = specialTitle1.getBoundingClientRect();
    const title2_rect = specialTitle2.getBoundingClientRect();
    const title3_rect = specialTitle3.getBoundingClientRect();
    
    const title1_center = title1_rect.top + title1_rect.height / 2 - wrapperTop;
    const title2_center = title2_rect.top + title2_rect.height / 2 - wrapperTop;
    const title3_center = title3_rect.top + title3_rect.height / 2 - wrapperTop;
    const title3_bottom = title3_rect.bottom - wrapperTop + 10;
    
    bar.style.height = `${title3_bottom}px`;
    
    barImg1.style.top = `${title1_center}px`;
    barImg2.style.top = `${title2_center}px`;
    barImg3.style.top = `${title3_center}px`;
  }
  
  window.addEventListener('load', updateBarHeight);
  window.addEventListener('resize', updateBarHeight);

  window.addEventListener('load', (event) => {
    setTimeout(() => {
      mobileMenu.classList.remove('init');
    });
  

    // section2.classList.remove('hidden-section');
    // section2.classList.add('hidden-section');
    section1.remove();
    section3.classList.remove('hidden-section');
    secureSection.classList.add('hidden-section');
    emailSection.classList.add('hidden-section');
    checkoutSection.classList.remove('hidden-section');
    section3.classList.remove('block-scroll');
    startCountdownFromTenMinutes();
    // requestAnimationFrame(animateProgress);
    // storageContainer.classList.add('hidden-section');
    // completedContainer.classList.remove('hidden-section');
  });

})
let stripe, elements, cardNumberElement, cardExpiryElement, cardCvcElement;

function mountStripe() {
  stripe = Stripe('pk_test_51RRRkMFSmQ18A826gulqxxmaFrwi1ZY94Qmw3ck96KPa8Du9QHxp4Jme7WtQT5raNomM8KKrOjFnbZyYv2dTH69z00bpV5a8yI');

  const style = {
    invalid: {
      color: '#B41B00',
    }
  };

  elements = stripe.elements();

  cardNumberElement = elements.create('cardNumber', {style});
  cardNumberElement.mount('#card-number-element');

  cardExpiryElement = elements.create('cardExpiry', {style});
  cardExpiryElement.mount('#card-expiry-element');

  cardCvcElement = elements.create('cardCvc', {style});
  cardCvcElement.mount('#card-cvc-element');

  cardNumberElement.on('change', (event) => handleStripeError(event, 'card-number'));
  cardExpiryElement.on('change', (event) => handleStripeError(event, 'expiry'));
  cardCvcElement.on('change', (event) => handleStripeError(event, 'cvc'));
}

function handleStripeError(event, fieldId) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  if (!errorElement) return;

  if (event.error) {
    errorElement.textContent = event.error.message;
    errorElement.style.display = 'block';
  } else {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}