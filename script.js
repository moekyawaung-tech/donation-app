let selectedAmount = 1000;
let selectedMethod = "kbz";

const amountBtns = document.querySelectorAll('.amount-btn');
const methodBtns = document.querySelectorAll('.method');
const donateBtn = document.getElementById('donateBtn');
const qrSection = document.getElementById('qrSection');
const receiptSection = document.getElementById('receiptSection');
const qrCanvas = document.getElementById('qrCanvas');
const qrInfo = document.getElementById('qrInfo');
const receiptContent = document.getElementById('receiptContent');

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAmount = parseInt(btn.dataset.amount);
    });
});

methodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        methodBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedMethod = btn.dataset.method;
    });
});

donateBtn.addEventListener('click', () => {
    const custom = document.getElementById('customAmount').value;
    const amount = custom ? parseInt(custom) : selectedAmount;

    if (amount < 100) {
        alert("အနည်းဆုံး ၁၀၀ ကျပ် လှူဒါန်းပေးပါ");
        return;
    }

    // Generate QR
    const qrData = `Donation: ${amount} Kyats | Method: ${selectedMethod.toUpperCase()} | From: moekyawaung-tech`;
    
    QRCode.toCanvas(qrCanvas, qrData, {
        width: 260,
        color: { dark: "#000", light: "#fff" }
    }, function(error) {
        if (error) console.error(error);
    });

    qrInfo.innerHTML = `
        <strong>${amount.toLocaleString('my-MM')} ကျပ်</strong><br>
        ${selectedMethod.toUpperCase()} Pay မှတစ်ဆင့် လွှဲပေးပါ
    `;

    qrSection.style.display = 'block';
    document.querySelector('.donation-box').style.display = 'none';

    // Show receipt after 3 seconds (demo)
    setTimeout(() => {
        showReceipt(amount);
    }, 3000);
});

function showReceipt(amount) {
    const date = new Date().toLocaleDateString('my-MM');
    receiptContent.innerHTML = `
        <p><strong>လှူဒါန်းသူ:</strong> moekyawaung-tech User</p>
        <p><strong>ပမာဏ:</strong> ${amount.toLocaleString('my-MM')} ကျပ်</p>
        <p><strong>နည်းလမ်း:</strong> ${selectedMethod.toUpperCase()} Pay</p>
        <p><strong>ရက်စွဲ:</strong> ${date}</p>
        <p><strong>Transaction ID:</strong> DON-${Date.now().toString().slice(-8)}</p>
        <hr>
        <p style="color: green; font-weight: bold;">Thank you for your support ❤️</p>
    `;
    receiptSection.style.display = 'block';
}

function printReceipt() {
    window.print();
}

function shareReceipt() {
    if (navigator.share) {
        navigator.share({
            title: 'Donation Receipt',
            text: 'I just donated to moekyawaung-tech!',
        });
    } else {
        alert("Receipt copied to clipboard (demo)");
    }
}

document.getElementById('newDonation').addEventListener('click', () => {
    location.reload();
});
