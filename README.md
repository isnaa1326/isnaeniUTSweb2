# VeloraStore - Online Shop Premium dengan QRIS & Ongkir

## Deskripsi Project
**VeloraStore** adalah aplikasi online shop modern yang dibangun menggunakan HTML, Tailwind CSS, dan JavaScript Vanilla. Aplikasi ini memiliki fitur lengkap seperti autentikasi pengguna, manajemen produk, keranjang belanja, perhitungan ongkir berdasarkan berat dan kota tujuan, pembayaran dengan QRIS, serta riwayat pesanan. Semua data disimpan menggunakan LocalStorage.

---

## Fitur Lengkap

### 1. Authentication (Simulasi)
- ✅ Login dengan validasi email & password
- ✅ Register dengan validasi email unik
- ✅ Password minimal 6 karakter
- ✅ Session management menggunakan LocalStorage

### 2. Product Management
- ✅ Menampilkan list produk dari JSON (8 produk)
- ✅ Detail produk lengkap dengan gambar, rating, stok, berat
- ✅ Struktur data: id, name, category, price, image, rating, stock, weight, description

### 3. Search & Filter
- ✅ Search produk berdasarkan nama (REAL TIME)
- ✅ Filter berdasarkan kategori (REAL TIME)
- ✅ Hasil filter langsung tampil tanpa reload halaman

### 4. Cart (Keranjang Belanja)
- ✅ Tambah produk ke keranjang
- ✅ Hapus produk dari keranjang
- ✅ Update jumlah item
- ✅ Total harga otomatis berubah

### 5. Ongkir (Biaya Pengiriman)
- ✅ 8 Kota tujuan (Jakarta, Bandung, Surabaya, Yogyakarta, Semarang, Medan, Bali, Makassar)
- ✅ Perhitungan ongkir berdasarkan berat total produk
- ✅ Ongkir per kg: Rp15.000 - Rp45.000 tergantung kota

### 6. Pembayaran QRIS
- ✅ Modal QR Code yang bisa di scan
- ✅ Konfirmasi pembayaran
- ✅ Simpan transaksi ke LocalStorage

### 7. Order History
- ✅ Menampilkan riwayat pembelian per user
- ✅ Detail transaksi lengkap

### 8. Dark Mode
- ✅ Toggle Dark/Light mode (tombol di pojok kiri bawah)
- ✅ Menyimpan preferensi ke LocalStorage

### 9. UI/UX dengan Tailwind CSS
- ✅ Responsive (Mobile + Desktop)
- ✅ Glass morphism effect
- ✅ Animasi hover pada produk

---

## Cara Menjalankan

1. **Buat folder** `NamaDepan_NamaBelakang_UTS_Web2`
2. **Buat file `index.html`** dan copy semua kode di atas
3. **Buat file `README.md`** dan copy isi ini
4. **Jalankan dengan Live Server** di VSCode

---

## Teknologi yang Digunakan

| Teknologi | Fungsi |
|-----------|--------|
| HTML5 | Struktur halaman web |
| Tailwind CSS | Styling dan responsive design |
| JavaScript ES6+ | Logic dan interaktivitas |
| LocalStorage | Simulasi database |
| SweetAlert2 | Toast notification |
| Font Awesome | Ikon-ikon UI |

---

## Author

**Nama: isnaeni**
- NIM: [2411070076]
- Kelas: Web Programming 2

---

## Lisensi

