import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer-feature',
  templateUrl: './timer-feature.component.html',
  styleUrls: ['./timer-feature.component.scss'],
  standalone: true
})
export class TimerFeatureComponent  implements OnInit {

  @Input() bookId: string | undefined; 
  
  @Input() currentPage: number | undefined; 

  @Output() progressUpdated = new EventEmitter<void>(); 

  isTimerRunning: boolean = false;
  currentSessionTime: number = 0; 
  newPageInput: number | undefined;

  constructor() { }

  ngOnInit() {}

  

}
