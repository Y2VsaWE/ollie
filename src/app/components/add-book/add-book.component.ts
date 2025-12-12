import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { BookInsert } from 'src/app/data/Book';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { 
  ModalController,
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, 
  IonButtons, IonListHeader, IonToast, IonIcon, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, cameraOutline } from 'ionicons/icons';
import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-book-add',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  standalone: true,
  imports: [IonCard, IonIcon, 
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButtons, IonListHeader, 
    IonToast, IonIcon, ]
})
export class AddBookComponent {

  newBook: BookInsert = { 
    title: '', 
    author: '', 
    genre: '', 
    format: 'physical', 
    status: 'Want to read', 
    total_pages: 0,
    cover_image_base64: null

  };
  
  // Genres für die Auswahl
  genres = ['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Thriller', 'Mystery', 'Romance', 'Other'];
  
  // Formate für die Auswahl
  formats = ['physical', 'ebook', 'audiobook'];

  // Status für die Auswahl
  statuses = ['Want to read', 'Currently reading', 'Read'];
  
  bookCoverImage: string | undefined;

  constructor(
    private modalCtrl: ModalController,
    private bookService: BookService,
    private loadingCtrl: LoadingController
  ) {
    addIcons({cameraOutline,bookOutline});
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async addBook() {
    if (!this.newBook.title || !this.newBook.author || this.newBook.total_pages <= 0) {
      alert('Please fill in title, author, and total pages.');
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Saving book...', 
      spinner: 'crescent' // Oder 'dots', 'lines', 'circular'
    });
    await loading.present();
    try {
      // Setzt die Startseite auf 0, wenn es nicht sofort gelesen wird
      if (this.newBook.status === 'Currently reading') {
        // Das Dashboard geht davon aus, dass current_page = 0 ist, wenn man beginnt
      } else {
         // Stellt sicher, dass das Buch, das nicht gelesen wird, bei 0 beginnt
         this.newBook.current_page = 0; 
      }
      
      await this.bookService.createBook(this.newBook);
      await loading.dismiss();
      this.modalCtrl.dismiss(null, 'confirm');

    } catch (e) {
      await loading.dismiss();
      console.error('Error adding book:', e);
      alert('Error adding book. Please check the console for details.');
      this.modalCtrl.dismiss(null, 'error'); 
    }
  }
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Bild als Base64-String
        source: CameraSource.Camera, // Öffnet die Kamera
        presentationStyle: 'fullscreen'
      });
  
      // Speichern des Base64-Strings für die Vorschau und das Speichern in der DB
      this.bookCoverImage = image.dataUrl; 
      this.newBook.cover_image_base64 = this.bookCoverImage;
  
    } catch (e) {
      console.error('Camera error:', e);
    }
  }
}