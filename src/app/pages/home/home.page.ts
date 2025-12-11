import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/data/Book';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonCardTitle, IonCardContent, IonCard, IonCardHeader, IonIcon } from '@ionic/angular/standalone';
import { CurrentReadComponent } from 'src/app/components/current-read/current-read.component';
import { TimerFeatureComponent} from 'src/app/components/timer-feature/timer-feature.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [ IonIcon, IonCardHeader, IonCard, IonCardContent, IonCardTitle, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, CurrentReadComponent, TimerFeatureComponent, CommonModule]
})
export class HomePage implements OnInit {
  currentBook: Book | null = null;

  constructor(
      private bookService: BookService,
  ) { }
  
  ngOnInit() {
    this.loadCurrentBook();
  }
  
  async loadCurrentBook() {
    const allBooks = await this.bookService.getBooks(); 
    this.currentBook = allBooks ? allBooks.find(b => b.status === 'Currently reading') || null : null;
  }

  handleProgressUpdate() {
      this.loadCurrentBook();
  }
  async openReviewModal() {
    if (!this.currentBook) return;

    // TODO: Implementierung des Review Modals
    alert('DONE Funktion: Hier kommt das Review-Modal zum Markieren als "Read"');
  }
  
  async openEditProgressModal() {
      if (!this.currentBook) return;
      // TODO: Implementierung des Edit Progress Modals
      alert('EDIT Funktion: Hier kommt das Modal zum Bearbeiten von Seite/Zeit');
  }
}