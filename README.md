# VeloraStore- Online Shop Premium dengan QRIS & Ongkir

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
- ✅ Total berat dihitung otomatis dari semua item di keranjang

### 6. Pembayaran QRIS
- ✅ Modal QR Code yang bisa di scan
- ✅ Tampilan QRIS dengan kode unik (simulasi)
- ✅ Konfirmasi pembayaran
- ✅ Simpan transaksi ke LocalStorage

### 7. Order History
- ✅ Menampilkan riwayat pembelian per user
- ✅ Detail transaksi lengkap (produk, ongkir, total, alamat, kota)
- ✅ Urutan dari yang terbaru

### 8. Dark Mode
- ✅ Toggle Dark/Light mode (tombol di pojok kiri bawah)
- ✅ Menyimpan preferensi ke LocalStorage
- ✅ Seluruh elemen menyesuaikan warna secara otomatis

### 9. UI/UX dengan Tailwind CSS
- ✅ Responsive (Mobile + Desktop)
- ✅ Glass morphism effect
- ✅ Animasi hover pada produk
- ✅ Toast notification menggunakan SweetAlert2
- ✅ Tampilan modern dan profesional

---

## Data Ongkir (8 Kota)

| Kota | Ongkir per kg |
|------|---------------|
| Jakarta | Rp 15.000 |
| Bandung | Rp 20.000 |
| Surabaya | Rp 25.000 |
| Yogyakarta | Rp 22.000 |
| Semarang | Rp 18.000 |
| Medan | Rp 35.000 |
| Bali | Rp 40.000 |
| Makassar | Rp 45.000 |

**Cara hitung:** Ongkir = ongkir_per_kg × (berat_total_dalam_gram / 1000) dibulatkan ke atas

---


```json
{
  "id": "timestamp",
  "name": "string",
  "email": "string",
  "password": "string",
  "createdAt": "datetime"
}
