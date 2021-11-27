import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  search(query){
    if(query == '') return;
    this.router.navigate(['search/' + query])
  }
  searchEnter(q,event){
    if(q != '' && event.key == 'Enter'){
      this.router.navigate(['search/' + q])
    }


  }
}
