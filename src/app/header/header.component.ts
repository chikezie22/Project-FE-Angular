import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery:string = ''
  @Output() search:EventEmitter<string> = new EventEmitter<string>();


  searchUsers(){
    this.search.emit(this.searchQuery)
    // console.log(this.searchQuery);
  }
}
