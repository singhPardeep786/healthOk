function formValidation(){
    const form = document.querySelector('#contactForm');
    const fullName = document.querySelector('#fullName');
    const phoneNumber = document.querySelector('#phoneNumber');   
    const career = document.querySelector('#helpWith');
    const message = document.querySelector('#message');
    
    // Get error message elements for each field
    const errorMessages = document.querySelectorAll('.error_message');
    const fullNameError = errorMessages[0];
    const phoneError = errorMessages[1];
    const careerError = errorMessages[2];
    const messageError = errorMessages[3];

    const responseMsg = document.querySelector(".responseMsg");
    
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
  
      let isValid = true;
  
      // Reset all messages
      errorMessages.forEach(error => error.style.display = "none");
      responseMsg.style.display = "none";
  
      // fullName validation
      if(fullName.value.trim().length < 2){
        fullNameError.style.display = "initial";
        fullNameError.textContent = "Please enter your full name";
        isValid = false;
      }
  
      // phoneNumber validation
      if (phoneNumber.value.trim() === "") {
        phoneError.style.display = "initial";
        phoneError.textContent = "Please enter your phone number";
        isValid = false;
      } else if (!/^\d{6,15}$/.test(phoneNumber.value.trim())) {
        phoneError.style.display = "initial";
        phoneError.textContent = "Please enter a valid phone number";
        isValid = false;
      }
  
      // career validation
      if(career.value.trim().length < 2){
        careerError.style.display = "initial";
        careerError.textContent = "Please enter your query";
        isValid = false;
      }
      
      // message validation
      if(message.value.trim().length < 10){
        messageError.style.display = "initial";
        messageError.textContent = "Please enter at least 10 characters";
        isValid = false;
      }
  
      // Only reset form if validation passes
      if(isValid){
        form.reset();
        responseMsg.style.display = "initial";
        responseMsg.style.right = 0;
        responseMsg.style.opacity = 1;
        setTimeout(()=>{
          responseMsg.style.right = "-100%";
          responseMsg.style.opacity = 0;
        }, 3000)
      }
    });
}

formValidation();