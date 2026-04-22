document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FUNGSI MENU MUDAH ALIH (HAMBURGER MENU) - BAHARU
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('aktif');
            // Menukar bentuk hamburger kepada X (Pilihan)
            mobileMenuBtn.classList.toggle('buka');
        });

        // Tutup menu jika pengguna klik pada mana-mana pautan
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('aktif');
                mobileMenuBtn.classList.remove('buka');
            });
        });
    }

    // 2. ANIMASI SCROLL (KEKALKAN KOD ASAL ANDA)
    const sections = document.querySelectorAll('.seksyen-info, .seksyen-kalkulator');
    sections.forEach(sec => sec.classList.add('scroll-animate'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('terlihat');
            } else {
                entry.target.classList.remove('terlihat');
            }
        });
    }, observerOptions);

    sections.forEach(sec => scrollObserver.observe(sec));

    // 3. ANIMASI SMOOTH SCROLL (KEKALKAN KOD ASAL ANDA)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const yOffset = -90; 
                const y = targetSection.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // 4. LOGIK KALKULATOR ZAKAT (KEKALKAN KOD ASAL ANDA)
    const formKalkulator = document.getElementById('form-kalkulator');
    if(formKalkulator) {
        formKalkulator.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const gaji = parseFloat(document.getElementById('pendapatan-bulanan').value) || 0;
            const sampingan = parseFloat(document.getElementById('pendapatan-sampingan').value) || 0;
            const totalPendapatan = (gaji * 12) + sampingan; 

            const diri = parseFloat(document.getElementById('diri-sendiri').value) || 0;
            const isteri = parseFloat(document.getElementById('isteri').value) || 0;
            const anak = parseFloat(document.getElementById('anak').value) || 0;
            const kwsp = parseFloat(document.getElementById('kwsp').value) || 0;
            
            const totalTolakan = diri + isteri + anak + kwsp;
            const baki = totalPendapatan - totalTolakan;
            let jumlahZakat = 0;

            // Tambahan: Ambil nilai Nisab dari input pengguna, default 24000
            const nisabSemasa = parseFloat(document.getElementById('nisab').value) || 24000;

            if (baki >= nisabSemasa) {
                jumlahZakat = baki * 0.025;
                alert(`Berdasarkan maklumat anda:\n\nPendapatan Tahunan: RM ${totalPendapatan.toFixed(2)}\nJumlah Had Kifayah: RM ${totalTolakan.toFixed(2)}\nBaki DiZakatkan: RM ${baki.toFixed(2)}\n\nJUMLAH ZAKAT WAJIB (2.5%): RM ${jumlahZakat.toFixed(2)}`);
            } else if (baki > 0 && baki < nisabSemasa) {
                alert(`Baki pendapatan anda (RM ${baki.toFixed(2)}) adalah kurang daripada Nisab semasa (RM ${nisabSemasa.toFixed(2)}). Anda belum diwajibkan zakat pendapatan.`);
            } else {
                alert("Alhamdulillah, pendapatan anda setakat ini berada di bawah Had Kifayah dan belum diwajibkan zakat pendapatan.");
            }
        });
    }
});
