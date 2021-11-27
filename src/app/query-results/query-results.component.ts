import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../services/api-calls.service';
import { Video } from '../services/video.model';

@Component({
  selector: 'app-query-results',
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.scss']
})
export class QueryResultsComponent implements OnInit {
  videos:Video[] = [];
  overQuota:boolean = false;
  constructor(private api:ApiCallsService, private router:Router , private route: ActivatedRoute) { }

  ngOnInit(): void {
    const q = this.route.snapshot.paramMap.get('query')
    this.api.getVideosByQuery(q).subscribe((res:any)=>{
      const {items} = res;
      const filteredResults = items.map(item =>{
        const { id , snippet } = item;
        return {id , snippet}
      })
      console.log(filteredResults);

      let video_ids = [...filteredResults].map(element => {
          return element.id.videoId;
      });

      let videoStats;

      this.api.getVideoRatings(video_ids).subscribe((res:any)=>{
        videoStats = res.items.map(item=>{
          const {viewCount} = item.statistics;
          return {viewCount};
        })
        //merging video data with video stats
        for(let i=0; i<filteredResults.length;i++){
          filteredResults[i] = {...filteredResults[i],...videoStats[i]}
        }
        this.videos = filteredResults;
      //simple error handle if quota exceeded
      },(error)=>{
        if(error){
          this.overQuota = true;
        }
      })

    },(error)=>{
      if(error){
        this.overQuota = true;
      }
    })
  }
  goToVideo(id){
    this.router.navigate(['video/' + id])
  }
  goToChannel(name){
    this.router.navigate(['channel/' + name])
  }
}
