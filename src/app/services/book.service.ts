import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Book, BookInsert } from '../data/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private supabase: SupabaseClient;
  private tableName: string = 'book'; 

  constructor() {
    this.supabase = createClient(
      environment.supabaseURL, 
      environment.supabaseKey
    );
  }

  async getBooks(): Promise<Book[] | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .order('title', { ascending: true }); 

    if (error) {
      console.error('Error fetching books:', error);
      return null;
    }
    return data as Book[];
  }

  async createBook(bookData: BookInsert) {
    const insertData = {
        ...bookData,
        total_reading_time: 0,
        current_page: 0,
        rating: bookData.rating || 0 
    };
    
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(insertData)
      .select('*')
      .single();

    if (error) {
      console.error('Error creating book:', error);
      throw error;
    }
    return data as Book;
  }
  
  async updateProgress(bookId: string, newPage: number, timeSpentSeconds: number) {
      const { data: currentBook, error: fetchError } = await this.supabase
          .from(this.tableName)
          .select('total_reading_time')
          .eq('id', bookId)
          .single();

      if (fetchError || !currentBook) {
          console.error('Could not fetch current reading time:', fetchError);
          return;
      }

      const newTotalTime = currentBook.total_reading_time + timeSpentSeconds;

      const { error } = await this.supabase
          .from(this.tableName)
          .update({
              current_page: newPage,
              total_reading_time: newTotalTime
          })
          .eq('id', bookId);

      if (error) {
          console.error('Error updating progress:', error);
          throw error;
      }
  }
}