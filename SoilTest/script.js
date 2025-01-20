let language = 'en'; // Default language
let paymentMethod = ''; // Selected payment method
let timer = 300; // Countdown timer in seconds
let timerInterval;

const text = {
  en: {
    title: "Soil Test Form",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Address",
    soilType: "Soil Type",
    additionalInfo: "Additional Information",
    paymentMethod: "Payment Method",
    qrCodeTitle: "Scan the QR Code for Payment",
    uploadFile: "Upload Soil Sample File",
    submit: "Submit",
    selectSoilType: "Select soil type",
    selectPayment: "Select a payment method",
    timerRemaining: "Time Remaining for Payment",
    price: "Price: ₹499",
  },
  hi: {
    title: "मिट्टी परीक्षण फॉर्म",
    fullName: "पूरा नाम",
    email: "ईमेल पता",
    phone: "फोन नंबर",
    address: "पता",
    soilType: "मिट्टी का प्रकार",
    additionalInfo: "अतिरिक्त जानकारी",
    paymentMethod: "भुगतान विधि",
    qrCodeTitle: "भुगतान के लिए क्यूआर कोड स्कैन करें",
    uploadFile: "मिट्टी नमूना फ़ाइल अपलोड करें",
    submit: "जमा करें",
    selectSoilType: "मिट्टी का प्रकार चुनें",
    selectPayment: "भुगतान विधि चुनें",
    timerRemaining: "भुगतान के लिए शेष समय",
    price: "मूल्य: ₹499",
  }
};

function setLanguage(lang) {
  language = lang;
  document.getElementById('form-title').innerText = text[language].title;
  document.getElementById('price').innerText = text[language].price;
  document.getElementById('select-payment').innerText = text[language].selectPayment;
  document.getElementById('name-label').innerText = text[language].fullName;
  document.getElementById('email-label').innerText = text[language].email;
  document.getElementById('phone-label').innerText = text[language].phone;
  document.getElementById('address-label').innerText = text[language].address;
  document.getElementById('soil-type-label').innerText = text[language].soilType;
  document.getElementById('description-label').innerText = text[language].additionalInfo;
  document.getElementById('payment-method-label').innerText = text[language].paymentMethod;
  document.getElementById('qr-code-title').innerText = text[language].qrCodeTitle;
  document.getElementById('timer-text').innerText = text[language].timerRemaining;
  document.getElementById('submit-btn').innerText = text[language].submit;
}

function handlePaymentMethodChange(event) {
  paymentMethod = event.target.value;
  if (paymentMethod === 'upi') {
    document.getElementById('qr-code-section').classList.remove('hidden');
    startTimer();
  } else {
    document.getElementById('qr-code-section').classList.add('hidden');
    resetTimer();
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    if (timer > 0) {
      timer--;
      document.getElementById('timer-text').innerText = formatTime(timer);
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function resetTimer() {
  timer = 300;
  document.getElementById('timer-text').innerText = formatTime(timer);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function handleSubmit(event) {
  event.preventDefault();
  alert('Form submitted!');
  // You can handle form submission to server here
}

setLanguage(language);
