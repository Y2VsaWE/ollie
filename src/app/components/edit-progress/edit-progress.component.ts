// src/app/components/edit-book/edit-book.component.ts (KOMBINIERTE VERSION)

import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/data/Book';
import { BookService } from 'src/app/services/book.service';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonItem, IonLabel, IonInput, IonTextarea, ModalController, IonButtons, 
  IonSelect, IonSelectOption, IonIcon, IonCard, IonImg, IonListHeader
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { addIcons } from 'ionicons';
import { star, starOutline, trashOutline, /* ... */ } from 'ionicons/icons'; 
import { ToastController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-edit-progress',
  templateUrl: './edit-progress.component.html',
  styleUrls: ['./edit-progress.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, 
    IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonIcon, 
    IonTextarea, IonCard, IonImg, IonListHeader
  ],
})
export class EditProgressComponent implements OnInit {

  @Input() book!: Book; 
  
  newPageInput: number = 0;
  newTimeInputMinutes: number = 0;
  newStatus: string = '';
  newGenre: string = '';
  newFormat: string = '';

  // Modelle für Review/Rating/Bild
  currentRating: number = 0;
  deleteImage: boolean = false; 

  // Listen
  genres = ['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Thriller', 'Mystery', 'Romance', 'Other'];
  formats = ['physical', 'ebook', 'audiobook'];
  statuses = ['Want to read', 'Currently reading', 'Read'];

  constructor(
    private modalCtrl: ModalController,
    private bookService: BookService,
    private toastCtrl: ToastController,
  ) {
    addIcons({ star, starOutline, trashOutline }); 
  }

  ngOnInit() {
    // Initialisierung der Felder beim Laden
    this.newPageInput = this.book.current_page;
    this.newTimeInputMinutes = Math.floor(this.book.total_reading_time / 60);
    this.newStatus = this.book.status;
    this.newGenre = this.book.genre;
    this.newFormat = this.book.format;
    this.currentRating = this.book.rating || 0;
  }

  setRating(newRating: number) {
    if (newRating === this.currentRating) {
        this.currentRating = 0;
    } else {
        this.currentRating = newRating;
    }
}

  removeImage() {
    this.deleteImage = true;
  }
  
  closeModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async updateBook() {
    if (this.newPageInput < 0 || this.newPageInput > this.book.total_pages) {
      alert('Page number is invalid.');
      return;
    }
    
    const timeInSeconds = this.newTimeInputMinutes * 60;
    
    let updatedData: any = {
      // Hauptdetails (direkt an book.property gebunden)
      title: this.book.title,
      author: this.book.author,
      total_pages: this.book.total_pages, // Muss auch editierbar sein, falls nötig
      
      // Metadaten und Fortschritt (an newXProperty gebunden)
      status: this.newStatus,
      genre: this.newGenre,
      format: this.newFormat,
      current_page: this.newPageInput,
      total_reading_time: timeInSeconds,
      
      // Review
      rating: this.currentRating > 0 ? this.currentRating : null,
      review_text: this.book.review_text || null, 
    };
    
    // Logik: Status 'Read' -> Seite auf Maximum setzen
    if (this.newStatus === 'Read') {
        updatedData.current_page = this.book.total_pages;
    } 
    
    // Logik: Bild löschen
    if (this.deleteImage) {
      updatedData.cover_image_base64 = null;
    }

    try {
      await this.bookService.updateBookDetails(this.book.id, updatedData);
      
      // Führe das lokale Buchobjekt mit den Updates zusammen
      this.modalCtrl.dismiss(null, 'confirm');

    } catch (e) {
      console.error('Error updating book:', e);
      alert('Error updating book.');
    }
  }

}