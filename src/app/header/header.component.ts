import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidebarVisible:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  showSidebar(){
    this.sidebarVisible = !this.sidebarVisible
  }
}
