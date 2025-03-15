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
        paymentNumber.innerText = "নগদ নাম্বার: " + nagadNumber;
    } else if (method === "bkash") {
        paymentNumber.innerText = "বিকাশ নাম্বার: " + bkashNumber;
    }

    paymentNumber.style.display = "block";
}

function copyNumber() {
    let paymentNumber = document.getElementById("payment-number");
    if (paymentNumber.innerText) {
        let number = paymentNumber.innerText.split(": ")[1];
        navigator.clipboard.writeText(number);
        alert("নাম্বার কপি হয়েছে: " + number);
    } else {
        alert("প্রথমে নগদ বা বিকাশ নির্বাচন করুন!");
    }
}

function submitForm() {
    let userNumber = document.getElementById("user-number").value;
    let transactionId = document.getElementById("transaction-id").value;

    if (userNumber === "" || transactionId === "") {
        alert("অনুগ্রহ করে সব তথ্য পূরণ করুন!");
        return;
    }

    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("loading").style.display = "block";

    // 🔹 Firestore-এ তথ্য সংরক্ষণ
    db.collection("transactions").doc(userNumber).set({
        userNumber: userNumber,
        transactionId: transactionId,
        status: "pending", // Default Pending
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("আপনার রিকোয়েস্ট পাঠানো হয়েছে! এডমিন অনুমোদন দিলে আইডি অ্যাক্টিভ হবে।");
        window.location.href = "dashboard.html"; 
    })
    .catch(error => {
        alert("Error: " + error.message);
        document.getElementById("submit-btn").style.display = "block";
        document.getElementById("loading").style.display = "none";
    });
}
