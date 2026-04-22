// FUNGSI UNTUK MODAL (POP-UP)
function bukaModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function tutupModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Tutup modal jika pengguna klik kawasan luar kotak
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FUNGSI MENU MUDAH ALIH (HAMBURGER MENU)
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('aktif');
            mobileMenuBtn.classList.toggle('buka');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('aktif');
                mobileMenuBtn.classList.remove('buka');
            });
        });
    }

    // 2. ANIMASI SCROLL (INTERSECTION OBSERVER)
    const sections = document.querySelectorAll('.section-padded');
    sections.forEach(sec => sec.classList.add('scroll-animate'));

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

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

    // 3. ANIMASI SMOOTH SCROLL (TERMASUK BUTANG HERO)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const yOffset = -90; // Ruang navbar atas
                const y = targetSection.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // 4. LOGIK KALKULATOR ZAKAT
    const formKalkulator = document.getElementById('form-kalkulator');
    if(formKalkulator) {
        formKalkulator.addEventListener('submit', function(e) {
            e.preventDefault(); 

            // Ambil Input
            const gajiTahunan = parseFloat(document.getElementById('pendapatan-bulanan').value) || 0;
            const sampinganTahunan = parseFloat(document.getElementById('pendapatan-sampingan').value) || 0;
            const totalPendapatan = gajiTahunan + sampinganTahunan; 

            const diri = parseFloat(document.getElementById('diri-sendiri').value) || 0;
            const isteri = parseFloat(document.getElementById('isteri').value) || 0;
            const anak = parseFloat(document.getElementById('anak').value) || 0;
            const kwsp = parseFloat(document.getElementById('kwsp').value) || 0;
            
            const totalTolakan = diri + isteri + anak + kwsp;
            const baki = totalPendapatan - totalTolakan;
            let jumlahZakat = 0;

            const nisabSemasa = parseFloat(document.getElementById('nisab').value) || 24000;

            if (baki >= nisabSemasa) {
                jumlahZakat = baki * 0.025;
                alert(`Berdasarkan maklumat anda:\n\nPendapatan Tahunan: RM ${totalPendapatan.toFixed(2)}\nJumlah Tolakan (Had Kifayah MUIS): RM ${totalTolakan.toFixed(2)}\nBaki Layak DiZakatkan: RM ${baki.toFixed(2)}\n\nJUMLAH ZAKAT WAJIB DIBAYAR (2.5%): RM ${jumlahZakat.toFixed(2)}`);
            } else if (baki > 0 && baki < nisabSemasa) {
                alert(`Baki pendapatan anda (RM ${baki.toFixed(2)}) adalah kurang daripada Nisab semasa (RM ${nisabSemasa.toFixed(2)}). Anda belum diwajibkan zakat pendapatan pada tahun ini.`);
            } else {
                alert("Alhamdulillah, pendapatan bersih anda setakat ini berada di bawah paras Had Kifayah MUIS. Anda belum diwajibkan zakat pendapatan.");
            }
        });
    }
});
