require('dotenv').config();
const mongoose = require('mongoose');
const Content = require('./models/Content');

const img = (seed) => `https://picsum.photos/seed/${seed}/600/400`;

const data = [
  { category: 'article', title: '5 Kebiasaan Pagi yang Menyehatkan', summary: 'Mulai hari dengan energi.', body: 'Minum air putih setelah bangun, berjemur 10 menit, sarapan bergizi, peregangan ringan, dan hindari ponsel 30 menit pertama. Kebiasaan kecil yang konsisten memberi dampak besar bagi kesehatan.', imageUrl: img('morning') },
  { category: 'article', title: 'Pentingnya Tidur 7-8 Jam', summary: 'Tidur cukup menjaga imun.', body: 'Tidur yang cukup membantu pemulihan otot, menjaga daya ingat, dan menstabilkan hormon. Usahakan jadwal tidur yang teratur setiap hari.', imageUrl: img('sleep') },
  { category: 'workout', title: '5 Morning Yoga Poses', summary: 'Gerakan yoga untuk pagi hari.', body: '1) Mountain Pose 2) Cat-Cow 3) Downward Dog 4) Warrior I 5) Child Pose. Tahan tiap pose 30-60 detik sambil mengatur napas.', imageUrl: img('yoga') },
  { category: 'workout', title: 'Latihan Kardio 15 Menit', summary: 'Tanpa alat, di rumah.', body: 'Jumping jack 1 menit, high knees 1 menit, squat 1 menit, mountain climber 1 menit. Ulangi 3 set dengan istirahat 1 menit.', imageUrl: img('cardio') },
  { category: 'video', title: 'Peregangan untuk Pekerja Kantoran', summary: 'Video edukasi 10 menit.', body: 'Video panduan peregangan leher, bahu, dan punggung untuk mengurangi pegal akibat duduk lama.', imageUrl: img('stretch'), videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A' },
  { category: 'video', title: 'Dasar Meditasi untuk Pemula', summary: 'Kurangi stres harian.', body: 'Video pengantar meditasi pernapasan selama 10 menit untuk pemula.', imageUrl: img('meditation'), videoUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
  { category: 'nutrition', title: 'Gizi Seimbang: Isi Piringku', summary: 'Panduan porsi makan.', body: 'Separuh piring berisi sayur dan buah, seperempat karbohidrat, seperempat protein. Batasi gula, garam, dan lemak berlebih.', imageUrl: img('food') },
  { category: 'nutrition', title: 'Protein Nabati vs Hewani', summary: 'Pilih sumber protein terbaik.', body: 'Tempe, tahu, dan kacang-kacangan adalah protein nabati yang murah dan sehat. Kombinasikan dengan ikan atau telur untuk asam amino lengkap.', imageUrl: img('protein') },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Content.deleteMany({});
    await Content.insertMany(data);
    console.log('Seed selesai');
    process.exit();
  })
  .catch((e) => { console.error(e); process.exit(1); });