// Logik Kalkulator Zakat
function kiraZakat() {
    const gaji = document.getElementById('gaji').value;
    const tolakan = document.getElementById('tolakan').value;
    const resultBox = document.getElementById('result');

    if (gaji === "" || gaji < 0) {
        alert("Sila masukkan jumlah gaji yang betul.");
        return;
    }

    const pendapatanBersih = gaji - tolakan;
    
    if (pendapatanBersih <= 0) {
        resultBox.style.display = "block";
        resultBox.innerHTML = "Keputusan: RM 0.00 (Tidak wajib zakat)";
    } else {
        const zakat = pendapatanBersih * 0.025; // 2.5%
        resultBox.style.display = "block";
        resultBox.style.backgroundColor = "#e8f5e9";
        resultBox.innerHTML = `Zakat Bulanan: RM ${zakat.toFixed(2)}`;
    }
}

// Animasi Scroll Ringkas
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});