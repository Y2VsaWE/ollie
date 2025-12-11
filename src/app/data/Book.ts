export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    
    format: 'physical' | 'e book' | 'audiobook'; 
    status: 'Want to read' | 'Currently reading' | 'Read' | 'Stopped';
    total_pages: number | null;
    current_page: number; 
    total_reading_time: number; 
    
    cover_url: string | null; // Link zum Cover-Bild in Supabase Storage
    
    review_text: string | null;
    rating: number;
    
    created_at: string; 
}

// Interface für die Daten, die beim Erstellen eines neuen Buches benötigt werden 
// (ohne die automatisch generierten Felder wie id, created_at)
export type BookInsert = Omit<Book, 'id' | 'created_at' | 'total_reading_time'>;