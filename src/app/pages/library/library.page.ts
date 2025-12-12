import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, BookInsert } from 'src/app/data/Book';
import { BookService } from 'src/app/services/book.service';
import { ModalController, IonListHeader } from '@ionic/angular/standalone'; 

// Neue Ionic Imports für Library
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
  IonLabel, IonButton, IonAlert, IonBadge, IonSegment, IonSegmentButton,
  IonFab, IonFabButton, IonIcon, IonButtons, IonModal 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline, libraryOutline, bookOutline, bookmarkOutline, checkmarkDoneOutline, star, starOutline } from 'ionicons/icons';

import { EditProgressComponent } from 'src/app/components/edit-progress/edit-progress.component'; 
import { AddBookComponent } from 'src/app/components/add-book/add-book.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [IonListHeader,
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
    IonLabel, IonButton, IonAlert, IonBadge, IonSegment, IonSegmentButton,
    IonFab, IonFabButton, IonIcon, IonButtons, IonModal,
    EditProgressComponent, AddBookComponent]
})
export class LibraryPage implements OnInit {
  
  allBooks: Book[] = []; 
  filteredBooks: Book[] = []; 
  
  // Filter-Status
  selectedStatusFilter: 'all' | 'Currently reading' | 'Want to read' | 'Read' = 'all'; 

  showAlert: boolean = false;
  alertMessage: string = '';
  
  constructor(
    private bookService: BookService,
    private modalCtrl: ModalController,

  ) {
    addIcons({libraryOutline,bookOutline,bookmarkOutline,checkmarkDoneOutline,createOutline,trashOutline,addOutline,star,starOutline});
  }

  async ngOnInit() {
    await this.loadBooks();
  }

  async loadBooks() {
    this.allBooks = await this.bookService.getBooks() || [];
    this.filterBooks(); // Filtert beim Laden
  }

  filterBooks() {
    if (this.selectedStatusFilter === 'all') {
      this.filteredBooks = this.allBooks;
    } else {
      this.filteredBooks = this.allBooks.filter(book => book.status === this.selectedStatusFilter);
    }
  }

  // --- DELETE FUNKTION ---
  async deleteBook(bookId: string) {
    if (confirm('Are you sure you want to delete this book permanently?')) {
      try {
        await this.bookService.deleteBook(bookId);
        await this.loadBooks(); // Liste neu laden
        this.alertMessage = 'Book deleted successfully.';
        this.showAlert = true;
      } catch (e) {
        this.alertMessage = 'Error deleting book.';
        this.showAlert = true;
        console.error(e);
      }
    }
  }

  // --- EDIT BUCH MODAL (Aktualisiert Status, Genre, etc.) ---
  async editBookModal(book: Book) {
    const modal = await this.modalCtrl.create({
      component: EditProgressComponent,
      componentProps: {
        book: book
      }
    });

    await modal.present();
    // const { role } = await modal.onWillDismiss(); // Warten auf das Schließen

    // // Prüfen, ob das Signal 'reload' empfangen wurde
    // if (role === 'reload') {
    //   this.loadBooks();
    // }

  }

  async openAddBook() {
    const modal = await this.modalCtrl.create({
      component: AddBookComponent 
    });

    await modal.present();
    const { role } = await modal.onWillDismiss();

    // Wenn das Buch erfolgreich hinzugefügt wurde ('confirm' in addBook())
    if (role === 'confirm') {
      await this.loadBooks(); 
      this.alertMessage = 'Book successfully added!';
      this.showAlert = true;
    }
  }

  getStars(rating: number | null): string[] {
    if (rating === null || rating === undefined) {
      return [];
    }
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    
    return [
      ...Array(fullStars).fill('star'),
      ...Array(emptyStars).fill('star-outline')
    ];
  }


}