export type { NewsItem } from '@/types/news';
import type { NewsItem } from '@/types/news';

export const newsData: NewsItem[] = [
  // === OPINI ===
  {
    id: "1",
    slug: "membangun-banjarnegara-dari-desa",
    title: "Membangun Banjarnegara dari Desa: Sudah Saatnya Anak Muda Bergerak",
    summary: "Opini tentang pentingnya peran generasi muda dalam pembangunan desa-desa di Kabupaten Banjarnegara.",
    content: `
      <p class="lead">Banjarnegara memiliki ratusan desa yang tersebar dari dataran tinggi Dieng hingga lembah Serayu. Setiap desa menyimpan <strong>potensi luar biasa</strong> yang menunggu untuk dikelola dengan baik.</p>
      
      <h3>Mengapa Anak Muda Harus Pulang?</h3>
      <p>Fenomena urbanisasi memang tak terhindarkan. Banyak anak muda memilih merantau ke kota besar demi peluang karir yang lebih menjanjikan. Namun, justru disinilah <em>opportunity cost</em> terbesar kita hilang. Desa kehilangan tenaga produktif, ide segar, dan inovasi.</p>
      
      <p>Data BPS menunjukkan bahwa desa-desa dengan tingkat partisipasi pemuda tinggi cenderung memiliki ekonomi yang lebih resilien. Anak muda membawa literasi teknologi, jejaring luas, dan keberanian mengambil risiko yang seringkali absen dalam birokrasi desa tradisional.</p>

      <blockquote>"Desa bukan tempat untuk ditinggalkan, tapi ladang untuk ditanami harapan. Jika bukan kita yang membangun tanah kelahiran, siapa lagi?"</blockquote>

      <h3>Tantangan dan Peluang</h3>
      <p>Tentu, pulang kampung bukan tanpa tantangan. Minimnya infrastruktur digital di beberapa titik dan skeptisisme generasi tua seringkali menjadi penghalang. Namun, lihatlah kisah sukses BUMDes di berbagai daerah yang dipimpin anak muda. Mereka berhasil menyulap potensi wisata, pertanian, hingga kerajinan menjadi komoditas bernilai tinggi.</p>

      <p>Sudah saatnya kita mengubah mindset. Sukses tidak harus berdasi di gedung pencakar langit. Sukses bisa berarti memberdayakan tetangga, memajukan ekonomi lokal, dan melihat desa kita tumbuh menjadi pusat kehidupan yang mandiri.</p>
    `,
    category: "Opini",
    author: "Ahmad Ridwan",
    publishedAt: "1 jam lalu",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    featured: true
  },
  {
    id: "7",
    slug: "pentingnya-literasi-digital-di-pedesaan",
    title: "Literasi Digital: Kunci Kemajuan Desa di Era 4.0",
    summary: "Mengapa kemampuan digital menjadi krusial bagi warga desa untuk bersaing di era modern.",
    content: `
      <p>Era digital tidak bisa dihindari, bahkan hingga ke pelosok desa. Transformasi digital bukan sekadar tentang memiliki smartphone, tetapi bagaimana teknologi tersebut dapat meningkatkan kualitas hidup dan ekonomi warga.</p>

      <h3>Kondisi Saat Ini</h3>
      <p>Banyak petani kita yang masih bergantung pada tengkulak karena tidak memiliki akses informasi harga pasar yang <em>real-time</em>. Usaha Mikro Kecil dan Menengah (UMKM) desa kesulitan memasarkan produknya karena gagap teknologi e-commerce.</p>

      <p>Literasi digital hadir sebagai jembatan. Dengan pelatihan yang tepat, warga desa bisa:</p>
      <ul>
        <li>Mengakses pasar global melalui marketplace.</li>
        <li>Mendapatkan informasi pertanian modern.</li>
        <li>Mengurus administrasi kependudukan secara online tanpa antri.</li>
      </ul>

      <h3>Peran Pemerintah dan Komunitas</h3>
      <p>Tidak cukup hanya menyediakan akses internet gratis. Pendampingan berkelanjutan adalah kunci. Komunitas pemuda, KKN mahasiswa, dan pemerintah desa harus berkolaborasi membuat modul pelatihan yang mudah dipahami.</p>
      
      <p>Digitalisasi desa adalah sebuah keniscayaan. Pilihannya hanya dua: kita bersiap menghadapinya dan memanfaatkannya, atau kita tergilas karena ketidaksiapan.</p>
    `,
    category: "Opini",
    author: "Indra Wijaya",
    publishedAt: "2 hari lalu",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "11",
    slug: "ruang-terbuka-hijau-banjarnegara",
    title: "Ruang Terbuka Hijau: Bukan Sekadar Paru-paru Kota",
    summary: "Pentingnya memperbanyak taman kota sebagai ruang interaksi sosial warga Banjarnegara.",
    content: `
      <p>Banjarnegara butuh lebih banyak ruang terbuka hijau (RTH) yang ramah anak dan lansia. Selama ini kita sering melihat RTH hanya dari fungsi ekologisnya sebagai penyerap polusi, padahal fungsi sosialnya tak kalah vital.</p>
      
      <h3>Ruang Waras Warga Kota</h3>
      <p>Di tengah hiruk pikuk aktivitas, warga membutuhkan tempat untuk sekadar duduk, menghirup udara segar, dan berinteraksi tanpa sekat status sosial. Alun-alun memang ada, tapi apakah cukup? Kita butuh taman-taman saku (pocket parks) di berbagai sudut pemukiman.</p>

      <p>Studi psikologi lingkungan menunjukkan bahwa akses mudah ke area hijau dapat menurunkan tingkat stres masyarakat secara signifikan. Anak-anak yang bermain di alam terbuka juga terbukti memiliki perkembangan motorik dan sosial yang lebih baik dibandingkan yang terkurung dengan gadget.</p>

      <h3>Saran Kebijakan</h3>
      <p>Pemerintah daerah perlu lebih tegas dalam menegakkan aturan koefisien dasar hijau pada setiap pembangunan baru. Selain itu, revitalisasi bantaran sungai Serayu menjadi taman publik bisa menjadi solusi cerdas memadukan konservasi dan rekreasi.</p>
    `,
    category: "Opini",
    author: "Dr. Aris Santoso",
    publishedAt: "5 jam lalu",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "12",
    slug: "budaya-jagong-era-digital",
    title: "Menghidupkan Kembali Budaya 'Jagong' di Era Digital",
    summary: "Meremajakan tradisi kumpul warga yang mulai pudar tergerus gadget.",
    content: `
      <p>Tradisi 'jagong' atau berkumpul sambil ngopi dan bertukar cerita adalah kearifan lokal yang mempererat solidaritas warga Banjarnegara. Sayangnya, kini banyak yang berkumpul secara fisik, tapi pikiran dan matanya tertuju pada layar masing-masing.</p>

      <h3>Hilangnya Kehangatan Sosial</h3>
      <p>"Dekat di mata, jauh di hati." Istilah itu makin relevan. Kita tahu apa yang terjadi di belahan dunia lain lewat Instagram, tapi tidak tahu tetangga sebelah sedang sakit.</p>

      <p>Perlu ada gerakan "puasa gadget" saat pertemuan warga. Pos kamling, balai desa, hingga warung kopi harus kembali menjadi ruang diskusi publik yang hidup. Jagong bukan sekadar membuang waktu, itu adalah mekanisme sosial untuk menyelesaikan konflik, merencanakan gotong royong, dan merawat rasa persaudaraan.</p>
    `,
    category: "Opini",
    author: "Budayawan Muda",
    publishedAt: "1 hari lalu",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80"
  },


  // === CERITA ===
  {
    id: "2",
    slug: "perjalanan-petani-kopi-dieng",
    title: "Dari Lereng Dieng: Kisah Pak Karso Merintis Kopi Organik",
    summary: "Cerita inspiratif petani kopi Dieng yang berhasil mengekspor kopi organiknya hingga ke Eropa.",
    content: `
      <p>Di ketinggian 2.000 mdpl, kabut dingin pagi belum sepenuhnya hilang. Pak Karso (58) sudah sibuk memilah biji kopi merah (cherry) di halaman rumahnya. Jemari keriputnya telaten memisahkan buah terbaik.</p>
      
      <h3>Awal yang Pahit</h3>
      <p>"Dulu kopi kita dihargai murah sekali, Mas. Sama tengkulak cuma dihargai 3 ribu per kilo. Katanya kualitas jelek," kenang Pak Karso sambil menyeruput kopi hitam buatannya. Selama puluhan tahun, petani di desanya hanya menanam asal-asalan, panen asalan, dan jual apa adanya.</p>

      <h3>Titik Balik</h3>
      <p>Perubahan dimulai lima tahun lalu, saat ada penyuluhan dari dinas pertanian tentang pengolahan pasca-panen. Pak Karso adalah satu dari sedikit petani yang mau mendengarkan. Ia mulai belajar teknik <em>honey process</em> dan fermentasi.</p>

      <blockquote>"Saya diejek tetangga. Ngapain kopi dijemur di meja-meja (greenhouse), ribet. Tapi saya yakin ilmu tidak akan bohong."</blockquote>

      <h3>Manisnya Hasil Kerja Keras</h3>
      <p>Ketekunan itu berbuah manis. Sampel kopi arabika Pak Karso memenangkan kontes kopi regional, lalu nasional. Kini, biji kopinya (green bean) dihargai ratusan ribu per kilogram dan sudah dinikmati pecinta kopi hingga ke kedai-kedai di Eropa. Pak Karso membuktikan, dari tanah Dieng yang dingin, bisa lahir kehangatan yang mendunia.</p>
    `,
    category: "Cerita",
    author: "Siti Nurhaliza",
    publishedAt: "3 jam lalu",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "8",
    slug: "perjuangan-guru-honorer-pelosok",
    title: "Kisah Bu Ani: 20 Tahun Mengajar di Pelosok Tanpa Pamrih",
    summary: "Cerita guru honorer yang tetap setia mengajar meski gaji tak seberapa.",
    content: `
      <p>Sepeda motor butut itu mogok lagi. Bu Ani (45) hanya tersenyum masam, menyeka peluh di dahinya, lalu menuntun motornya menanjak jalan berbatu. Ini adalah rutinitas hariannya menuju SD Negeri di pelosok Punggelan.</p>

      <h3>Dedikasi Tanpa Gaji Tinggi</h3>
      <p>Sudah 20 tahun Bu Ani mengabdi sebagai guru honorer. Honornya? Tak sampai setengah UMR, dan seringkali dibayar rapel tiga bulan sekali. Namun, tak pernah sekalipun terlintas di benaknya untuk berhenti.</p>
      
      <p>"Kalau saya berhenti, siapa yang mau mengajar anak-anak ini? Akses ke sini susah, guru PNS jarang yang betah," ujarnya lembut. Bagi Bu Ani, bayaran termahal adalah melihat anak didiknya bisa membaca, berhitung, dan melanjutkan sekolah ke jenjang yang lebih tinggi.</p>

      <p>Malam hari, Bu Ani masih menerima jahitan baju tetangga untuk menambal kebutuhan dapur. Sosoknya adalah pahlawan tanpa tanda jasa yang nyata, pelita yang tak pernah lelah bersinar di tengah keterbatasan.</p>
    `,
    category: "Cerita",
    author: "Dimas Prasetyo",
    publishedAt: "1 hari lalu",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "13",
    slug: "malam-satu-suro-pekasiran",
    title: "Malam Satu Suro di Desa Pekasiran",
    summary: "Suasana mistis namun khidmat saat warga desa menyambut tahun baru Jawa.",
    content: `
      <p>Kabut tebal turun perlahan menyelimuti Desa Pekasiran saat matahari mulai terbenam di ufuk barat. Hawa dingin menusuk tulang, namun tak menyurutkan antusiasme warga. Malam ini adalah malam Satu Suro.</p>

      <h3>Kirab Pusaka dan Keheningan</h3>
      <p>Obor-obor bambu mulai dinyalakan di sepanjang jalan desa. Iring-iringan sesepuh desa berpakaian adat Jawa lengkap berjalan perlahan, membawa pusaka desa yang telah disucikan. Tidak ada suara gaduh. Semua warga membisu (tapa bisu), memanjatkan doa dalam hati.</p>

      <p>"Ini bukan sekadar ritual mistis," jelas Mbah Satro, juru kunci desa. "Ini adalah momen introspeksi. Mensyukuri hasil bumi setahun lalu, dan memohon keselamatan untuk tahun depan."</p>

      <p>Di pendopo desa, tumpeng besar sudah disiapkan. Aroma kemenyang bercampur wangi bunga melati. Suasana terasa magis, seolah waktu berhenti sejenak, menghubungkan manusia dengan leluhur dan Sang Pencipta dalam harmoni keheningan.</p>
    `,
    category: "Cerita",
    author: "Slamet Rahardjo",
    publishedAt: "3 hari lalu",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1528696892704-5e6582664941?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "14",
    slug: "legenda-kawah-sikidang",
    title: "Legenda Kawah Sikidang: Antara Mitos dan Sains",
    summary: "Menelusuri kisah Pangeran Kidang Garungan di balik fenomena geologis kawah berpindah.",
    content: `
      <p>Asap belerang membumbung tinggi, suara gemuruh air mendidih terdengar dari perut bumi. Kawah Sikidang di Dieng bukan kawah biasa. Jarak lubang kawah utamanya konon bisa berpindah-pindah, melompat seperti kijang (Kidang dalam bahasa Jawa).</p>

      <h3>Kisah Cinta yang Ditolak</h3>
      <p>Legenda menuturkan kisah Pangeran Kidang Garungan, manusia berkepala kijang yang melamar Ratu Shinta Dewi nan jelita. Sang Ratu menolak dengan syarat mustahil: membuat sumur raksasa dalam semalam. Saat sumur hampir jadi, Ratu curang menimbun sumur itu. Kemarahan Sang Pangeran meledak, menciptakan kawah yang terus bergejolak.</p>

      <h3>Perspektif Geologi</h3>
      <p>Tentu, sains punya penjelasan lain. Aktivitas vulkanik di Dieng memang sangat aktif. Tekanan gas di bawah tanah mencari celah terlemah untuk keluar, sehingga titik semburan bisa berpindah-pindah. Namun, memadukan cerita rakyat ini dengan wisata geologi menjadikan pengalaman berkunjung ke Sikidang jauh lebih kaya dan bermakna.</p>
    `,
    category: "Cerita",
    author: "Lestari",
    publishedAt: "Minggu lalu",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1600&q=80"
  },


  // === SOSOK INSPIRATIF ===
  {
    id: "3",
    slug: "bu-sari-penggerak-batik-banjarnegara",
    title: "Bu Sari: 40 Tahun Menjaga Warisan Batik Banjarnegara",
    summary: "Profil pengrajin batik yang telah melatih ratusan perempuan desa dan melestarikan motif khas Banjarnegara.",
    content: `
      <p>Aroma malam panas dan suara 'cecek-cecek' canting beradu dengan wajan kecil memenuhi ruang kerja Bu Sari (62) di Desa Gumelem. Di sekelilingnya, kain-kain bermotif <em>Udan Liris</em> dan <em>Rujak Senthe</em> terjemur indah.</p>
      
      <h3>Lebih dari Sekadar Kain</h3>
      <p>"Batik ini identitas kita. Jangan sampai punah hanya karena kita malas meneruskan," tegas Bu Sari. Kecintaannya pada batik dimulai sejak usia 10 tahun, mewarisi keahlian ibunya. Namun, Bu Sari tidak ingin menyimpannya sendiri.</p>

      <p>Ia mendirikan sanggar belajar gratis untuk ibu-ibu dan remaja putri di desanya. Tujuannya sederhana: pemberdayaan ekonomi. "Perempuan desa harus mandiri. Kalau bisa mbatik, mereka bisa bantu ekonomi keluarga tanpa harus meninggalkan anak di rumah," ujarnya.</p>

      <p>Kini, Batik Gumelem karya binaannya sudah merambah pasar nasional. Bu Sari membuktikan bahwa melestarikan budaya juga bisa menjadi jalan kesejahteraan bagi komunitas.</p>
    `,
    category: "Sosok Inspiratif",
    author: "Dewi Kusuma",
    publishedAt: "6 jam lalu",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1621570071219-de5d79fb1a5c?auto=format&fit=crop&w=1600&q=80",
    trendingRank: 1
  },
  {
    id: "9",
    slug: "dokter-desa-pengabdian-tanpa-batas",
    title: "Dr. Hendra: Dokter yang Memilih Mengabdi di Desa",
    summary: "Kisah dokter muda yang menolak tawaran ke kota demi melayani warga pedesaan.",
    content: `
      <p>Lulus dengan predikat <em>Cum Laude</em> dari universitas ternama, Dr. Hendra (29) mendapat banyak tawaran dari rumah sakit swasta elit di Jakarta. Gaji besar dan fasilitas mewah sudah di depan mata. Namun, ia menolaknya.</p>

      <h3>Panggilan Hati</h3>
      <p>Ia memilih pulang ke Banjarnegara, menjadi dokter PTT di Puskesmas daerah pegunungan yang rawan longsor. "Saya kuliah kedokteran dibiayai beasiswa uang rakyat. Sudah sewajarnya saya kembalikan ilmu ini untuk rakyat yang paling membutuhkan," katanya mantap.</p>

      <p>Tantangannya tidak main-main. Jalan rusak, minimnya peralatan medis, hingga mitos kesehatan yang masih kental di masyarakat. Dr. Hendra tak menyerah. Ia rajin <em>blusukan</em> ke posyandu, memberikan edukasi kesehatan dengan bahasa <em>Banyumasan</em> yang jenaka agar mudah diterima warga tua.</p>
      
      <p>Dr. Hendra adalah bukti bahwa integritas dan rasa kemanusiaan masih ada di jiwa generasi muda profesi medis kita.</p>
    `,
    category: "Sosok Inspiratif",
    author: "Ratna Sari",
    publishedAt: "3 hari lalu",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "15",
    slug: "wahyu-petani-milenial-jeruk",
    title: "Pak Tani Milenial: Wahyu Sulap Lahan Tandus Jadi Kebun Jeruk",
    summary: "Inovasi pemuda yang menolak gengsi, sukses menjadi juragan jeruk di usia 25 tahun.",
    content: `
      <p>"Anak muda kok macul?" Cibiran itu sudah kenyang diterima Wahyu (25). Lulusan sarjana pertanian ini memilih tidak melamar jadi PNS, tapi turun ke lahan tandus warisan ayahnya yang sudah lama terbengkalai.</p>

      <h3>Pertanian Berbasis Teknologi</h3>
      <p>Wahyu tidak bertani dengan cara lama. Ia menerapkan <em>Smart Farming</em>. Penyiraman otomatis berbasis timer, pemupukan presisi, dan pemasaran lewat Instagram. Ia menanam Jeruk Lemon California yang saat itu sedang tren.</p>

      <p>Hasilnya mencengangkan. Panen pertamanya menembus omzet puluhan juta rupiah. Kini, ia mempekerjakan tetangga-tetangganya yang dulu mencibir. "Petani itu profesi masa depan. Jangan gengsi kalau mau kaya," pesannya pada anak muda lain.</p>
    `,
    category: "Sosok Inspiratif",
    author: "Dian Sastro",
    publishedAt: "2 hari lalu",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1627920769843-08573fcbf122?auto=format&fit=crop&w=1600&q=80",
    featured: true
  },
  {
    id: "16",
    slug: "suster-apung-serayu",
    title: "Suster Apung: Dedikasi Tanpa Batas di Tepian Serayu",
    summary: "Perjuangan perawat yang menggunakan perahu untuk mengunjungi pasien di desa terisolir.",
    content: `
      <p>Dusun seberang sungai itu terisolir jika musim hujan tiba karena jembatan seringkali terendam. Namun, penyakit dan persalinan tidak mengenal cuaca. Di sinilah Suster Ani mengambil peran.</p>

      <p>Dengan perahu sampan kecil, ia menyeberangi arus Sungai Serayu yang deras. Tas medisnya selalu didekap erat agar tidak basah. "Kalau bukan saya yang datang, mereka harus jalan memutar 10 km ke Puskesmas. Kasihan kalau ada yang darurat," ceritanya.</p>

      <p>Julukan "Suster Apung" disematkan warga sebagai tanda cinta. Pengabdiannya mengajarkan kita bahwa keterbatasan infrastruktur bisa ditembus dengan jembatan hati yang tulus.</p>
    `,
    category: "Sosok Inspiratif",
    author: "Tim Redaksi",
    publishedAt: "4 hari lalu",
    readTime: "7 menit",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"
  },


  // === SUDUT KOTA ===
  {
    id: "4",
    slug: "pesona-telaga-dringo",
    title: "Telaga Dringo: Permata Tersembunyi di Dataran Tinggi Dieng",
    summary: "Menjelajahi keindahan telaga yang masih jarang dikunjungi wisatawan di kawasan Dieng.",
    content: `
      <p>Jika Anda mencari ketenangan yang hakiki, jauh dari riuh pikuk turis yang berdesakan, datanglah ke Telaga Dringo. Terletak lebih tinggi dari kawasan candi, telaga ini sering disebut sebagai "Ranu Kumbolo-nya Jawa Tengah".</p>

      <h3>Keindahan yang Masih Perawan</h3>
      <p>Akses ke sini memang membutuhkan sedikit perjuangan dengan jalan menanjak. Namun, begitu sampai, hamparan air tenang yang dikelilingi perbukitan hijau akan membayar lunas semua lelah. Udaranya sejuk, bahkan menusuk tulang.</p>

      <p>Tempat ini sempurna untuk berkemah (camping). Saat malam cerah, gugusan Bima Sakti (Milky Way) bisa terlihat dengan mata telanjang. Pagi harinya, kabut tipis menari di atas permukaan air, menciptakan suasana magis yang tak terlupakan.</p>
      
      <p>Ingat, karena ini alam yang masih asri, bawalah kembali sampahmu. Biarkan Dringo tetap cantik apa adanya.</p>
    `,
    category: "Sudut Kota",
    author: "Bima Sakti",
    publishedAt: "5 jam lalu",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "6",
    slug: "pasar-rakyat-banjar",
    title: "Pagi di Pasar Rakyat: Denyut Ekonomi Banjarnegara",
    summary: "Mengintip kesibukan pedagang dan pembeli di pasar tradisional yang menjadi jantung ekonomi warga.",
    content: `
      <p>Pukul 02.00 dini hari, saat sebagian besar warga kota masih terlelap, Pasar Kota Banjarnegara sudah menggeliat. Truk-truk pengangkut sayur dari pegunungan berdatangan, menurunkan kubis, kentang, dan wortel segar.</p>

      <h3>Wajah Jujur Ekonomi Kita</h3>
      <p>Berjalan di lorong pasar yang becek dan riuh, kita melihat wajah asli ekonomi kerakyatan. Tawar menawar terjadi dengan logat ngapak yang kental dan akrab. Tidak ada diskon palsu, yang ada adalah kesepakatan harga yang memuaskan kedua belah pihak.</p>

      <p>Ada Mbah penjual cenil yang tetap tersenyum ramah melayani pembeli, ada kuli panggul yang memikul beban berat dengan semangat baja. Pasar bukan sekadar tempat transaksi, ia adalah ruang sosial tempat bertemunya rasa, keringat, dan harapan.</p>
    `,
    category: "Sudut Kota",
    author: "Photographer Jalanan",
    publishedAt: "2 hari lalu",
    readTime: "3 menit",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "17",
    slug: "alun-alun-banjarnegara-baru",
    title: "Alun-alun Banjarnegara: Wajah Baru Jantung Kota",
    summary: "Melihat hasil revitalisasi alun-alun yang kini lebih asri dan ramah pejalan kaki.",
    content: `
      <p>Alun-alun Banjarnegara kini telah bersolek. Pagar-pagar tinggi yang dulu membatasi pandangan telah hilang, digantikan dengan trotoar pedestrian yang lebar dan nyaman. Lampu-lampu taman bergaya klasik menambah syahdu suasana malam.</p>

      <p>Area bermain anak kini lebih aman, dan tersedia banyak bangku taman untuk warga duduk bersantai. Di sisi selatan, pusat kuliner tertata rapi, menjajakan Dawet Ayu dan Mendoan hangat.</p>
      
      <p>Revitalisasi ini menegaskan fungsi alun-alun sebagai ruang publik yang inklusif. Siapapun, dari latar belakang apapun, berhak menikmati keindahan jantung kota ini.</p>
    `,
    category: "Sudut Kota",
    author: "Budi Fotografer",
    publishedAt: "Semalam",
    readTime: "3 menit",
    image: "https://images.unsplash.com/photo-1568632234165-22d7d6f5f3f0?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "18",
    slug: "gedung-wedana-klampok",
    title: "Jejak Kolonial di Kota Tua Klampok",
    summary: "Wisata sejarah mengunjungi sisa-sisa kejayaan masa lalu di Klampok.",
    content: `
      <p>Klampok bukan sekadar sentra keramik. Berjalan di jalanan utamanya, kita seolah danjak ke masa lalu. Bangunan-bangunan tua bergaya <em>Indische Empire</em> masih berdiri kokoh, meski sebagian catnya mulai mengelupas.</p>

      <p>Eks Kawedanan Klampok menjadi saksi bisu sejarah panjang administrasi kolonial di wilayah ini. Arsitektur tembok tebal, jendela tinggi, dan beranda luas mencerminkan adaptasi bangunan Eropa terhadap iklim tropis.</p>

      <p>Potensi wisata sejarah (Heritage Walk) di Klampok sangat besar. Dengan narasi yang tepat, gedung-gedung tua ini bisa 'hidup' kembali, menceritakan kisah kejayaan masa lalu kepada generasi masa kini.</p>
    `,
    category: "Sudut Kota",
    author: "Sejarawan Lokal",
    publishedAt: "3 minggu lalu",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1600&q=80"
  },


  // === POTENSI ===
  {
    id: "5",
    slug: "desa-wisata-kalibening",
    title: "Kalibening: Desa Wisata yang Menghidupi Ratusan Keluarga",
    summary: "Bagaimana desa ini bertransformasi dari desa biasa menjadi destinasi wisata edukasi pertanian.",
    content: `
      <p>Desa Kalibening membuktikan bahwa pariwisata tidak harus merusak alam, tapi justru bisa melestarikannya. Mengusung konsep <em>Ecotourism</em>, desa ini menawarkan paket wisata edukasi menanam padi, memetik sayur, dan memerah susu sapi.</p>

      <h3>Dampak Ekonomi Nyata</h3>
      <p>"Dulu anak muda sini pada merantau jadi buruh pabrik. Sekarang mereka jadi pemandu wisata, buka homestay, atau jualan oleh-oleh," kata Kepala Desa dengan bangga. Perputaran uang dari wisatawan langsung dinikmati oleh warga.</p>

      <p>Kunci suksesnya adalah gotong royong. Pokdarwis (Kelompok Sadar Wisata) mengelola manajemen pengunjung secara profesional namun tetap dengan keramahan khas desa. Kalibening kini menjadi <em>role model</em> bagi desa-desa lain di Banjarnegara.</p>
    `,
    category: "Potensi",
    author: "Rudi Hartono",
    publishedAt: "Kemarin",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "10",
    slug: "carica-emas-hijau-dieng",
    title: "Carica: Emas Hijau dari Dataran Tinggi Dieng",
    summary: "Potensi besar buah carica yang hanya tumbuh di Dieng dan menjadi primadona oleh-oleh.",
    content: `
      <p>Carica (Carica pubescens) adalah anugerah Tuhan yang unik untuk Dieng. Kerabat pepaya ini hanya bisa tumbuh optimal di dataran tinggi yang sejuk. Jika ditanam di dataran rendah, ia mungkin tumbuh tapi tak berbuah.</p>

      <h3>Komoditas Bernilai Tinggi</h3>
      <p>Dulu, buah ini dibiarkan membusuk atau hanya dimakan anak-anak gembala. Kini, Carica telah menjadi ikon oleh-oleh. Diolah menjadi manisan dalam sirup yang segar, keripik, hingga dodol.</p>

      <p>Industri rumahan pengolahan Carica menyerap ribuan tenaga kerja, terutama ibu-ibu. Tantangannya kini adalah menjaga kualitas dan standarisasi produk agar bisa menembus pasar ekspor yang lebih luas.</p>
    `,
    category: "Potensi",
    author: "Eko Prasetyo",
    publishedAt: "4 hari lalu",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "19",
    slug: "purwaceng-viagra-jawa",
    title: "Purwaceng: 'Viagra Jawa' yang Mendunia",
    summary: "Tanaman endemik Dieng yang khasiatnya sudah diakui mancanegara.",
    content: `
      <p>Jangan tertawa dulu mendengar julukannya. Purwaceng memang legendaris sebagai tanaman afrodisiak (penambah stamina) alami. Tanaman kecil yang tumbuh merayap ini seluruh bagiannya berkhasiat, terutama akarnya.</p>

      <p>Permintaan pasar terhadap produk olahan Purwaceng—seperti kopi purwaceng dan susu purwaceng—terus meningkat. Ini peluang emas bagi petani Dieng. Budidaya Purwaceng yang intensif bisa menjadi alternatif komoditas selain kentang, yang sekaligus lebih ramah terhadap konservasi tanah karena tidak perlu pengolahan lahan yang merusak.</p>
    `,
    category: "Potensi",
    author: "Sentra UKM",
    publishedAt: "5 hari lalu",
    readTime: "4 menit",
    image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "20",
    slug: "gula-semut-nira",
    title: "Gula Semut: Manisnya Bisnis Nira Kelapa",
    summary: "Inovasi pengrajin gula kelapa yang beralih ke gula semut untuk pasar ekspor.",
    content: `
      <p>Penderes kelapa adalah profesi tua yang berisiko tinggi. Namun, nilai jual gula merah cetak (gula jawa) seringkali fluktuatif dan rendah. Inovasi menjadi Gula Semut (kristal) mengubah nasib mereka.</p>

      <p>Gula semut organik memiliki nilai jual jauh lebih tinggi dan diminati pasar internasional karena indeks glikemiknya yang rendah (lebih sehat). Koperasi-koperasi tani di Banjarnegara kini gencar melatih penderes untuk memproduksi gula semut standar ekspor. Dari tetesan nira, kesejahteraan keluarga petani kini lebih terjamin.</p>
    `,
    category: "Potensi",
    author: "Dinas Pertanian",
    publishedAt: "1 minggu lalu",
    readTime: "5 menit",
    image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=1600&q=80"
  }
];

export function getAllNews() {
  return newsData;
}

export function getNewsBySlug(slug: string) {
  return newsData.find((item) => item.slug === slug);
}

export function getNewsByCategory(categorySlug: string) {
  return newsData.filter((item) => item.category.toLowerCase() === categorySlug.toLowerCase());
}

export function getTrendingNews() {
  return newsData.filter(item => item.trendingRank).sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
}
