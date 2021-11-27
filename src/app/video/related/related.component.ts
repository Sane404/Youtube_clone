import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { Video } from 'src/app/services/video.model';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent implements OnInit {
  videos:Video[] = [];
  constructor(private api:ApiCallsService,private route:ActivatedRoute,private router:Router) { }
  overQuota:boolean = false;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.api.getRelatedVideos(id).subscribe((res:any)=>{
      const {items} = res;
      const filteredResults = items.map(item =>{
        const { id , snippet } = item;
        return {id , snippet}
      })
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

    })
  }
  goToVideo(id){
    this.router.navigate(['video/' + id]).then(() => {
    window.location.reload();
  });
  }
  goToChannel(name){
    this.router.navigate(['channel/' + name])
  }
}
