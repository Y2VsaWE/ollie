import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/data/Book';

@Component({
  selector: 'app-current-read',
  templateUrl: './current-read.component.html',
  styleUrls: ['./current-read.component.scss'],
  standalone: true,
})
export class CurrentReadComponent  implements OnInit {

  @Input() currentBook: Book | null = null;

  constructor() { }

  ngOnInit() {}

}
