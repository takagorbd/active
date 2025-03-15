// 🔹 Firebase Config (তোমার Firebase Console থেকে নেওয়া)
const firebaseConfig = {
    apiKey: "AIzaSyAVRUkZh7vPIyI7RtKkt2lxEIzNNPYB7JA",
    authDomain: "incomewebsite-9032c.firebaseapp.com",
    projectId: "incomewebsite-9032c",
    storageBucket: "incomewebsite-9032c.appspot.com",
    messagingSenderId: "271108120298",
    appId: "1:271108120298:web:e3c42277f5a604f995c193"
};

// 🔹 Firebase Initialize
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let nagadNumber = "01796549955"; 
let bkashNumber = "018XXXXXXXX"; 

function showNumber(method) {
    let paymentNumber = document.getElementById("payment-number");

    if (method === "nagad") {
        paymentNumber.innerText = "📌 নগদ নাম্বার: " + nagadNumber;
    } else if (method === "bkash") {
        paymentNumber.innerText = "📌 বিকাশ নাম্বার: " + bkashNumber;
    }

    // 🔹 নাম্বারটি দেখানোর জন্য CSS সেট করা
    paymentNumber.style.display = "block";
    paymentNumber.style.fontWeight = "bold";
    paymentNumber.style.color = "red";
    paymentNumber.style.fontSize = "18px";
    paymentNumber.style.marginTop = "10px";
    paymentNumber.style.cursor = "pointer";
}

function copyNumber() {
    let paymentNumber = document.getElementById("payment-number");
    if (paymentNumber.innerText) {
        let number = paymentNumber.innerText.split(": ")[1];
        navigator.clipboard.writeText(number);
        alert("✅ নাম্বার কপি হয়েছে: " + number);
    } else {
        alert("⚠️ প্রথমে নগদ বা বিকাশ নির্বাচন করুন!");
    }
}

function submitForm() {
    let userNumber = document.getElementById("user-number").value;
    let transactionId = document.getElementById("transaction-id").value;
    let submitBtn = document.getElementById("submit-btn");
    let loadingSpinner = document.getElementById("loading");
    let successMessage = document.getElementById("success-message");

    if (userNumber === "" || transactionId === "") {
        alert("⚠️ অনুগ্রহ করে সব তথ্য পূরণ করুন!");
        return;
    }

    // 🔹 সাবমিট বাটন লুকানো এবং লোডিং দেখানো
    submitBtn.style.display = "none";
    loadingSpinner.style.display = "block";
    successMessage.style.display = "none"; 

    // 🔹 Firestore-এ তথ্য সংরক্ষণ
    db.collection("transactions").add({
        userNumber: userNumber,
        transactionId: transactionId,
        status: "Pending", 
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        // 🔹 সফল হলে লোডিং বন্ধ করে Success Message দেখানো
        loadingSpinner.style.display = "none";
        successMessage.style.display = "block";  
        successMessage.innerText = "✅ আপনার রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে!";  
        
        // ৩ সেকেন্ড পর ড্যাশবোর্ডে রিডাইরেক্ট করা হবে
        setTimeout(() => {
            window.location.href = "dashboard.html";  
        }, 3000); 
    })
    .catch(error => {
        // 🔹 কোনো সমস্যা হলে এরর দেখানো
        loadingSpinner.style.display = "none";
        submitBtn.style.display = "block";
        alert("❌ Error: " + error.message);
    });
}
