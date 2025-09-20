// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Login Form Handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const email = formData.get('email');
        const password = formData.get('password');
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate login
        alert('Login successful! Redirecting to dashboard...');
        // In a real app, you would redirect to the dashboard
        window.location.href = 'breed-recognition.html';
    });
}

// Signup Form Handling
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const terms = formData.get('terms');
        
        if (!fullName || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // if (!terms) {
        //     alert('Please accept the terms and conditions');
        //     return;
        // }
        
        // Simulate signup
        alert('Account created successfully! Please login to continue.');
        window.location.href = 'login.html';
    });
}

// Password Toggle Functionality
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.password-toggle');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Breed Recognition Functionality
const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const recognizeBtn = document.getElementById('recognizeBtn');
const resultsSection = document.getElementById('resultsSection');
const loading = document.getElementById('loading');
const breedResult = document.getElementById('breedResult');

// Sample breed data for demonstration
const sampleBreeds = [
    {
        name: 'Holstein Friesian',
        Nili-Ravi Buffalo (Punjab),
    Physical Traits: Large-sized with a wedge-shaped body; black coat with white markings.,

Milk Quality: High yield of 1,800–2,500 liters per lactation with 6.5% butterfat content.,

Breeding Tips: Adaptable to various climates; suitable for both draught and milk production.,

Common Diseases: Prone to mastitis and heat stress
confidence: 88
    },
    {
        name: 'Angus',
        origin: 'Scotland',
        characteristics: 'Medium to large-sized beef cattle, naturally polled (hornless). Known for excellent meat quality and marbling.',
        temperament: 'Generally calm and easy to handle, good maternal instincts.',
        care: 'Hardy breed that adapts well to various climates. Requires good pasture management.',
        image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        confidence: 88
    },
    {
        name: 'Jersey',
        origin: 'Jersey Island, Channel Islands',
        characteristics: 'Small dairy breed with light brown to fawn coloring. Produces rich, high-butterfat milk.',
        temperament: 'Alert and sometimes nervous, but generally manageable with proper handling.',
        care: 'Efficient feed converters, suitable for smaller operations. Need protection from extreme weather.',
        image: 'https://images.pexels.com/photos/1459978/pexels-photo-1459978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        confidence: 92
    }
];

if (imageInput && uploadArea) {
    // File input change handler
    imageInput.addEventListener('change', handleImageSelect);
    
    // Drag and drop handlers
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => imageInput.click());
    
    // Recognize button handler
    if (recognizeBtn) {
        recognizeBtn.addEventListener('click', recognizeBreed);
    }
}

function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        displayImage(file);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        imageInput.files = files;
        displayImage(files[0]);
    }
}

function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImg.src = e.target.result;
        document.querySelector('.upload-content').style.display = 'none';
        imagePreview.style.display = 'block';
        recognizeBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    imageInput.value = '';
    imagePreview.style.display = 'none';
    document.querySelector('.upload-content').style.display = 'block';
    recognizeBtn.disabled = true;
    resultsSection.style.display = 'none';
}

// function recognizeBreed() {
//     if (!imageInput.files[0]) return;
    
//     // Show results section and loading
//     resultsSection.style.display = 'block';
//     loading.style.display = 'block';
//     breedResult.style.display = 'none';
    
//     // Simulate API call delay
//     setTimeout(() => {
//         // Randomly select a breed for demonstration
//         const randomBreed = sampleBreeds[Math.floor(Math.random() * sampleBreeds.length)];
        
//         // Update UI with breed information
//         document.getElementById('breedName').textContent = randomBreed.name;
//         document.getElementById('breedOrigin').textContent = randomBreed.origin;
//         document.getElementById('breedCharacteristics').textContent = randomBreed.characteristics;
//         document.getElementById('breedTemperament').textContent = randomBreed.temperament;
//         document.getElementById('breedCare').textContent = randomBreed.care;
//         document.getElementById('breedImage').src = randomBreed.image;
//         document.getElementById('confidenceText').textContent = randomBreed.confidence + '%';
//         document.getElementById('confidenceFill').style.width = randomBreed.confidence + '%';
        
//         // Hide loading and show results
//         loading.style.display = 'none';
//         breedResult.style.display = 'block';
//     }, 2000);
// }

// async function recognizeBreed() {
//     if (!imageInput.files[0]) return;

//     // Show results section and loading
//     resultsSection.style.display = 'block';
//     loading.style.display = 'block';
//     breedResult.style.display = 'none';

//     try {
//         // 1. Get backend ngrok URL
//         const urlResponse = await fetch("https://fa9ba1038c45.ngrok-free.app/ngrok_url");
//         const urlData = await urlResponse.json();
//         const backendUrl = urlData.ngrok_url;

//         // 2. Prepare file upload
//         const formData = new FormData();
//         formData.append("file", imageInput.files[0]);

//         // 3. Send image to FastAPI /predict endpoint
//         const response = await fetch(`${backendUrl}/predict`, {
//             method: "POST",
//             body: formData,
//         });

//         const data = await response.json();

//         if (data.top3 && data.top3.length > 0) {
//             const best = data.top3[0];

//             document.getElementById('breedName').textContent = best.class;
//             document.getElementById('breedOrigin').textContent = "Unknown";
//             document.getElementById('breedCharacteristics').textContent = "N/A";
//             document.getElementById('breedTemperament').textContent = "N/A";
//             document.getElementById('breedCare').textContent = "N/A";
//             document.getElementById('breedImage').src = "placeholder.jpg";
//             document.getElementById('confidenceText').textContent = Math.round(best.confidence * 100) + '%';
//             document.getElementById('confidenceFill').style.width = Math.round(best.confidence * 100) + '%';
//         } else {
//             document.getElementById('breedName').textContent = "No breed detected.";
//         }
//     } catch (err) {
//         console.error("Prediction failed:", err);
//         alert("Error connecting to backend.");
//     }

//     // Hide loading and show results
//     loading.style.display = 'none';
//     breedResult.style.display = 'block';
// }



// async function recognizeBreed() {
//     if (!imageInput.files[0]) return;

//     resultsSection.style.display = 'block';
//     loading.style.display = 'block';
//     breedResult.style.display = 'none';

//     try {
//         // ⚠️ replace with the latest ngrok URL every restart
//         const backendBase = "https://8f087d0a6540.ngrok-free.app";

//         const formData = new FormData();
//         formData.append("file", imageInput.files[0]);

//         const response = await fetch(`${backendBase}/predict`, {
//             method: "POST",
//             body: formData,
//         });

//         if (!response.ok) throw new Error("Backend error: " + response.status);

//         const data = await response.json();

//         if (data.top3 && data.top3.length > 0) {
//             const best = data.top3[0];
//             document.getElementById('breedName').textContent = best.class;
//             document.getElementById('confidenceText').textContent = Math.round(best.confidence * 100) + '%';
//             document.getElementById('confidenceFill').style.width = Math.round(best.confidence * 100) + '%';
//             document.getElementById('breedImage').src = "placeholder.jpg";
//         } else {
//             document.getElementById('breedName').textContent = "No breed detected.";
//         }
//     } catch (err) {
//         console.error("Prediction failed:", err);
//         alert("Error connecting to backend.");
//     }

//     loading.style.display = 'none';
//     breedResult.style.display = 'block';
// }


async function recognizeBreed() {
    if (!imageInput.files[0]) return;

    // Show UI
    resultsSection.style.display = 'block';
    loading.style.display = 'block';
    breedResult.style.display = 'none';

    try {
        // ⚠️ Replace with your latest ngrok URL after each restart
        const backendBase = "https://bf00e7d423f8.ngrok-free.app";

        // Prepare form data
        const formData = new FormData();
        formData.append("file", imageInput.files[0]);

        // Send image to FastAPI
        const response = await fetch(`${backendBase}/predict`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Backend error: " + response.status);

        const data = await response.json();

        // Update UI with top prediction
        if (data.top3 && data.top3.length > 0) {
            const best = data.top3[0];

            document.getElementById('breedName').textContent = best.class;
            document.getElementById('confidenceText').textContent =
                Math.round(best.confidence * 100) + '%';
            document.getElementById('confidenceFill').style.width =
                Math.round(best.confidence * 100) + '%';
            document.getElementById('breedImage').src = "placeholder.jpg";
        } else {
            document.getElementById('breedName').textContent = "No breed detected.";
        }
    } catch (err) {
        console.error("Prediction failed:", err);
        alert("Error connecting to backend: " + (err.message || ""));
    } finally {
        loading.style.display = 'none';
        breedResult.style.display = 'block';
    }
}



// const sampleBreeds = [
//     {
//         name: 'Holstein Friesian',
//         origin: 'Netherlands and Germany',
//         characteristics: 'Large-sized dairy cattle with distinctive black and white markings. Known for high milk production and docile temperament.',
//         temperament: 'Docile and easy to handle, making them ideal for dairy operations.',
//         care: 'Requires high-quality feed and regular milking. Sensitive to heat stress.',
//         image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
//     },
//     {
//         name: 'Angus',
//         origin: 'Scotland',
//         characteristics: 'Medium to large-sized beef cattle, naturally polled (hornless). Known for excellent meat quality and marbling.',
//         temperament: 'Generally calm and easy to handle, good maternal instincts.',
//         care: 'Hardy breed that adapts well to various climates. Requires good pasture management.',
//         image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
//     },
//     {
//         name: 'Jersey',
//         origin: 'Jersey Island, Channel Islands',
//         characteristics: 'Small dairy breed with light brown to fawn coloring. Produces rich, high-butterfat milk.',
//         temperament: 'Alert and sometimes nervous, but generally manageable with proper handling.',
//         care: 'Efficient feed converters, suitable for smaller operations. Need protection from extreme weather.',
//         image: 'https://images.pexels.com/photos/1459978/pexels-photo-1459978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
//     }
// ];

// async function recognizeBreed() {
//     if (!imageInput.files[0]) return;

//     // Show UI
//     resultsSection.style.display = 'block';
//     loading.style.display = 'block';
//     breedResult.style.display = 'none';
//     const top3Container = document.getElementById("top3Results");
//     top3Container.innerHTML = "";

//     try {
//         // Get ngrok URL from Vercel discovery service
//         const res1 = await fetch("https://<your-vercel-domain>/api/ngrok");
//         if (!res1.ok) throw new Error("Failed to get discovery URL");
//         const json1 = await res1.json();
//         const backendUrl = json1.ngrok_url;
//         if (!backendUrl) throw new Error("Backend URL not set yet");

//         // Prepare image upload
//         const formData = new FormData();
//         formData.append("file", imageInput.files[0]);

//         // Send to FastAPI
//         const res2 = await fetch(`${backendUrl}/predict`, {
//             method: "POST",
//             body: formData,
//         });
//         if (!res2.ok) throw new Error("Backend error: " + res2.status);
//         const data = await res2.json();

//         // Helper function to update breed info
//         function updateBreedUI(best) {
//             const breedInfo = sampleBreeds.find(b => b.name === best.class);

//             document.getElementById("breedName").textContent = best.class;

//             if (breedInfo) {
//                 document.getElementById("breedOrigin").textContent = breedInfo.origin;
//                 document.getElementById("breedCharacteristics").textContent = breedInfo.characteristics;
//                 document.getElementById("breedTemperament").textContent = breedInfo.temperament;
//                 document.getElementById("breedCare").textContent = breedInfo.care;
//                 document.getElementById("breedImage").src = breedInfo.image;
//             } else {
//                 document.getElementById("breedOrigin").textContent = "Unknown";
//                 document.getElementById("breedCharacteristics").textContent = "N/A";
//                 document.getElementById("breedTemperament").textContent = "N/A";
//                 document.getElementById("breedCare").textContent = "N/A";
//                 document.getElementById("breedImage").src = "placeholder.jpg";
//             }

//             const confidencePercent = Math.round(best.confidence * 100);
//             document.getElementById("confidenceText").textContent = confidencePercent + "%";
//             document.getElementById("confidenceFill").style.width = confidencePercent + "%";
//         }

//         // Display results
//         if (data.top3 && data.top3.length > 0) {
//             const best = data.top3[0];
//             updateBreedUI(best);

//             // Display Top-3 predictions
//             data.top3.forEach(b => {
//                 const div = document.createElement("div");
//                 div.className = "top3-item";
//                 div.innerHTML = `<strong>${b.class}</strong>: ${Math.round(b.confidence*100)}%`;
//                 top3Container.appendChild(div);
//             });

//         } else {
//             document.getElementById("breedName").textContent = data.message || "No breed detected.";
//         }

//     } catch (err) {
//         console.error("Prediction failed:", err);
//         alert("Error connecting to backend: " + (err.message || ""));
//     } finally {
//         loading.style.display = "none";
//         breedResult.style.display = "block";
//     }
// }



// async function recognizeBreed() {
//     if (!imageInput.files[0]) return;

//     // Show UI
//     resultsSection.style.display = 'block';
//     loading.style.display = 'block';
//     breedResult.style.display = 'none';

//     try {
//         // 1) Get ngrok URL from Vercel discovery service
//         const res1 = await fetch("https://<your-vercel-domain>/api/ngrok");
//         if (!res1.ok) throw new Error("Failed to get discovery URL");
//         const json1 = await res1.json();
//         const backendUrl = json1.ngrok_url;
//         if (!backendUrl) throw new Error("Backend URL not set yet");

//         // 2) Prepare image upload
//         const formData = new FormData();
//         formData.append("file", imageInput.files[0]);

//         // 3) Send to FastAPI
//         const res2 = await fetch(`${backendUrl}/predict`, {
//             method: "POST",
//             body: formData,
//         });
//         if (!res2.ok) throw new Error("Backend error: " + res2.status);
//         const data = await res2.json();

//         // 4) Update UI
//         if (data.top3 && data.top3.length > 0) {
//             const best = data.top3[0];
//             document.getElementById("breedName").textContent = best.class;
//             document.getElementById("confidenceText").textContent =
//                 Math.round(best.confidence * 100) + "%";
//             document.getElementById("confidenceFill").style.width =
//                 Math.round(best.confidence * 100) + "%";
//             document.getElementById("breedImage").src = "placeholder.jpg";
//         } else {
//             document.getElementById("breedName").textContent =
//                 data.message || "No breed detected.";
//         }
//     } catch (err) {
//         console.error("Prediction failed:", err);
//         alert("Error connecting to backend: " + (err.message || ""));
//     } finally {
//         loading.style.display = "none";
//         breedResult.style.display = "block";
//     }
// }




// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

console.log('Cattle Breeds Recognition System loaded successfully!');

// Language Toggle Functionality
let currentLanguage = 'en';

function toggleLanguage(lang) {
    currentLanguage = lang;
    
    // Update button states
    document.getElementById('en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('hi-btn').classList.toggle('active', lang === 'hi');
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-hi]');
    elements.forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-hi');
        }
    });
    
    // Update placeholders
    const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder], select');
    inputs.forEach(input => {
        const enPlaceholder = input.getAttribute('data-placeholder-en');
        const hiPlaceholder = input.getAttribute('data-placeholder-hi');
        
        if (enPlaceholder && hiPlaceholder) {
            input.placeholder = lang === 'en' ? enPlaceholder : hiPlaceholder;
        }
    });
}

// Animal Registration Form Handling
const animalRegistrationForm = document.getElementById('animalRegistrationForm');
if (animalRegistrationForm) {
    // Set today's date as default for registration date
    const today = new Date().toISOString().split('T')[0];
    const registrationDateInput = document.querySelector('input[name="registrationDate"]');
    if (registrationDateInput) {
        registrationDateInput.value = today;
    }
    
    animalRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Basic validation
        const requiredFields = ['ownerName', 'mobile', 'village', 'district', 'state', 'pincode', 
                               'species', 'breed', 'ageYears', 'gender', 'purpose', 'animalSource', 'registrationDate'];
        
        let isValid = true;
        let missingFields = [];
        
        requiredFields.forEach(field => {
            if (!formData.get(field)) {
                isValid = false;
                missingFields.push(field);
            }
        });
        
        if (!isValid) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }
        
        // Validate mobile number
        const mobile = formData.get('mobile');
        if (mobile && !/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Validate PIN code
        const pincode = formData.get('pincode');
        if (pincode && !/^\d{6}$/.test(pincode)) {
            alert('Please enter a valid 6-digit PIN code');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Animal registered successfully! Registration ID: ' + Math.random().toString(36).substr(2, 9).toUpperCase());
            this.reset();
            
            // Reset registration date to today
            if (registrationDateInput) {
                registrationDateInput.value = today;
            }
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// GPS Location Function
function getLocation() {
    const gpsInput = document.getElementById('gpsLocation');
    
    if (navigator.geolocation) {
        gpsInput.value = 'Getting location...';
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude.toFixed(6);
                const lon = position.coords.longitude.toFixed(6);
                gpsInput.value = `${lat}, ${lon}`;
            },
            function(error) {
                gpsInput.value = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Location access denied by user.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("Location request timed out.");
                        break;
                    default:
                        alert("An unknown error occurred while retrieving location.");
                        break;
                }
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// File Upload Preview
document.addEventListener('DOMContentLoaded', function() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const label = this.parentElement.querySelector('.file-upload-label span');
            if (this.files.length > 0) {
                label.textContent = `Selected: ${this.files[0].name}`;
                label.style.color = '#4ade80';
            }
        });
    });
});
