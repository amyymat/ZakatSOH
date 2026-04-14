document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMASI REVEAL SEMASA SKROL
    // Elemen akan muncul secara halus apabila pengguna skrol ke bawah
    const sections = document.querySelectorAll('section, .isu-col, .card, .flow-block');
    sections.forEach(sec => sec.classList.add('reveal'));

    const revealOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                section.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Jalankan sekali semasa load

    // 2. LOGIK KALKULATOR DENGAN ANIMASI NOMBOR (ODOMETER STYLE)
    const btnKira = document.querySelector('button');
    const resultBox = document.getElementById('result');

    btnKira.addEventListener('click', function() {
        // Efek klik pada butang
        this.classList.add('btn-pop');
        setTimeout(() => this.classList.remove('btn-pop'), 150);

        const gaji = parseFloat(document.getElementById('gaji').value) || 0;
        const bonus = parseFloat(document.getElementById('bonus').value) || 0;
        const tolakan = 2000; // Had Kifayah Standard
        
        const totalPendapatan = gaji + bonus;
        const pendapatanLayakZakat = totalPendapatan - tolakan;

        resultBox.style.display = 'block';
        
        if (pendapatanLayakZakat <= 0) {
            resultBox.innerHTML = "Anda belum wajib zakat (Bawah Had Kifayah)";
            resultBox.style.color = "#e74c3c";
        } else {
            const jumlahZakat = pendapatanLayakZakat * 0.025;
            animateValue(resultBox, 0, jumlahZakat, 1000); // Animasi nombor naik
            resultBox.style.color = "var(--dark-green)";
        }
    });

    // Fungsi animasi nombor bergerak dari 0 ke jumlah zakat
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = (progress * (end - start) + start).toFixed(2);
            obj.innerHTML = `Zakat Bulanan: RM ${value}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 3. INTERAKSI PLAYFUL PADA KAD (EFEK HOVER MODEN)
    const cards = document.querySelectorAll('.isu-col, .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = "var(--gold)";
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = "var(--primary-green)";
        });
    });

    // 4. PESANAN SELAMAT DATANG DINAMIK (Berdasarkan Waktu di Sabah)
    const jam = new Date().getHours();
    let ucapan = "";
    if (jam < 12) ucapan = "Selamat Pagi";
    else if (jam < 18) ucapan = "Selamat Petang";
    else ucapan = "Selamat Malam";

    console.log(`${ucapan}! Selamat datang ke Portal Zakat Sabah.`);
    // Anda boleh paparkan ucapan ini dalam Hero section jika mahu.
});