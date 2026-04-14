document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TAMBAHKAN KELAS ANIMASI KEPADA SEMUA SEKSYEN
    // Pakar visual menasihatkan: Kita tambah kelas secara automatik melalui JS 
    // supaya HTML anda kekal bersih.
    const sections = document.querySelectorAll('.seksyen-info, .seksyen-kalkulator');
    sections.forEach(sec => sec.classList.add('scroll-animate'));

    // 2. ANIMASI FADE-IN & FADE-OUT BERULANG (INTERSECTION OBSERVER)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animasi bermula apabila 15% seksyen kelihatan
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Muncul apabila di-scroll
                entry.target.classList.add('terlihat');
            } else {
                // Hilang apabila di-scroll melepasi (memenuhi syarat animasi berulang anda)
                entry.target.classList.remove('terlihat');
            }
        });
    }, observerOptions);

    sections.forEach(sec => scrollObserver.observe(sec));

    // 3. ANIMASI SMOOTH SCROLL UNTUK NAVIGASI
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Skrol dengan offset supaya tajuk tidak tertutup oleh navbar
                const yOffset = -90; 
                const y = targetSection.getBoundingClientRect().top + window.scrollY + yOffset;
                
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // 4. BONUS FUNGSI: LOGIK KALKULATOR ZAKAT
    const formKalkulator = document.getElementById('form-kalkulator');
    if(formKalkulator) {
        formKalkulator.addEventListener('submit', function(e) {
            e.preventDefault(); // Elak page refresh

            // Ambil nilai pendapatan
            const gaji = parseFloat(document.getElementById('pendapatan-bulanan').value) || 0;
            const sampingan = parseFloat(document.getElementById('pendapatan-sampingan').value) || 0;
            const totalPendapatan = (gaji * 12) + sampingan; // Kiraan tahunan

            // Ambil nilai tolakan
            const diri = parseFloat(document.getElementById('diri-sendiri').value) || 0;
            const isteri = parseFloat(document.getElementById('isteri').value) || 0;
            const anak = parseFloat(document.getElementById('anak').value) || 0;
            const kwsp = parseFloat(document.getElementById('kwsp').value) || 0;
            
            const totalTolakan = diri + isteri + anak + kwsp;

            // Pengiraan Zakat
            const baki = totalPendapatan - totalTolakan;
            let jumlahZakat = 0;

            if (baki > 0) {
                jumlahZakat = baki * 0.025; // 2.5%
                alert(`Berdasarkan maklumat anda:\n\nPendapatan Tahunan: RM ${totalPendapatan.toFixed(2)}\nJumlah Had Kifayah: RM ${totalTolakan.toFixed(2)}\nBaki DiZakatkan: RM ${baki.toFixed(2)}\n\nJUMLAH ZAKAT WAJIB (2.5%): RM ${jumlahZakat.toFixed(2)}`);
            } else {
                alert("Alhamdulillah, pendapatan anda setakat ini berada di bawah Had Kifayah dan belum diwajibkan zakat pendapatan.");
            }
        });
    }
});