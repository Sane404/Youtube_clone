import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  interestingChannels:Array<string> = ['UCJZv4d5rbIKd4QHMPkcABCw', 'UCFbNIlppjAuEX4znoulh0Cw', 'UCoxcjq-8xIDTYp3uz647V5A', 'UCRcgy6GzDeccI7dkbbBna3Q', 'UCsBjURrPoezykLs9EqgamOA', 'UCSJ4gkVC6NrvII8umztf0Ow']
  IC_DATA;
  constructor(private router:Router,private api:ApiCallsService) { }

  ngOnInit(): void {
    this.api.getChannelData(this.interestingChannels).subscribe((data:any)=>{
      this.IC_DATA = data.items;
      console.log(this.IC_DATA)
    })
  }
  goTo(id){
    this.router.navigate(['channel/' + id])
  }
}
