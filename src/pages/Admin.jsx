import { useState } from 'react';
// 1. Kendi oluşturduğumuz firebase bağlantılarını çağırıyoruz
import { db, storage } from '../firebase'; 
// 2. Storage (Resim) için gereken Firebase fonksiyonları
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// 3. Firestore (Veritabanı) için gereken Firebase fonksiyonları
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Varsa kendi Admin CSS dosyanı buraya ekleyebilirsin
// import '../styles/Admin.css'; 

function Admin() {
  // Formdaki verileri tutacağımız "State" (Hafıza) değişkenlerimiz
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  // Yükleme sırasında butonu kilitlemek ve kullanıcıya bilgi vermek için
  const [isUploading, setIsUploading] = useState(false);

  // Dosya seçildiğinde çalışacak fonksiyon
  const handleFileChange = (e) => {
    // Seçilen ilk dosyayı hafızaya al
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Form "Yükle" butonuna basıldığında çalışacak asıl sihirli fonksiyon (async olmalı çünkü internete bağlanıyor)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    
    // Eğer resim seçilmemişse uyarı ver ve işlemi durdur
    if (!imageFile) {
      alert("Lütfen önce bir çizim görseli seç!");
      return;
    }

    setIsUploading(true); // Yükleme başladı, butonu kilitliyoruz

    try {
      // ─── 1. AŞAMA: RESMİ STORAGE'A YÜKLEME ───
      
      // Aynı isimli dosyalar birbirini ezmesin diye ismin sonuna o anki tarihi ekliyoruz
      const uniqueFileName = `${Date.now()}_${imageFile.name}`;
      
      // Storage'da 'drawings' adında bir klasör aç ve dosyayı oraya koy diyoruz
      const storageRef = ref(storage, `drawings/${uniqueFileName}`);
      
      // Resmi fiziksel olarak Firebase'e gönderiyoruz (Bu işlem biraz sürebilir)
      await uploadBytes(storageRef, imageFile);
      
      // Resim yüklendikten sonra, resmin internet adresini (URL) Firebase'den geri istiyoruz
      const downloadURL = await getDownloadURL(storageRef);

      // ─── 2. AŞAMA: VERİLERİ FIRESTORE'A KAYDETME ───
      
      // Firestore'da 'projects' adında bir koleksiyon (tablo) oluştur ve içine şu verileri yaz:
      await addDoc(collection(db, 'projects'), {
        title: title,
        description: description,
        imageUrl: downloadURL, // Storage'dan aldığımız linki buraya koyduk
        createdAt: serverTimestamp() // Projelerin sıralanması için eklenme tarihi
      });

      // ─── 3. AŞAMA: TEMİZLİK ───
      alert("Sanat eseri başarıyla Mensrea arşivine eklendi!");
      setTitle('');
      setDescription('');
      setImageFile(null);
      // Dosya seçici input'u sıfırlamak için (Basit bir DOM müdahalesi)
      document.getElementById('image-upload').value = '';

    } catch (error) {
      console.error("Yükleme sırasında hata oluştu: ", error);
      alert("Bir hata oluştu. Lütfen konsolu kontrol et.");
    } finally {
      setIsUploading(false); // İşlem bitti (başarılı veya hatalı), kilidi aç
    }
  };

  return (
    <div className="admin-container" style={{ padding: '100px 50px', color: 'white' }}>
      <h1>Yönetim Paneli</h1>
      <p>Yeni bir eser yüklemek için aşağıdaki formu doldurun.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'col', gap: '20px', maxWidth: '500px', marginTop: '30px' }}>
        
        {/* Başlık Inputu */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Çizim Başlığı:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ padding: '10px', fontSize: '1rem' }}
          />
        </div>

        {/* Açıklama Inputu */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Açıklama / Teknik:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            rows="4"
            style={{ padding: '10px', fontSize: '1rem' }}
          />
        </div>

        {/* Dosya Seçici */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Görsel Seç:</label>
          <input 
            id="image-upload"
            type="file" 
            accept="image/png, image/jpeg, image/webp" 
            onChange={handleFileChange} 
            required 
            style={{ padding: '10px 0' }}
          />
        </div>

        {/* Gönder Butonu */}
        <button 
          type="submit" 
          disabled={isUploading} 
          className="btn-modern"
          style={{ marginTop: '10px', backgroundColor: isUploading ? 'gray' : 'transparent' }}
        >
          {isUploading ? 'Yükleniyor... Lütfen Bekle' : 'Eseri Yayınla'}
        </button>

      </form>
    </div>
  );
}

export default Admin;