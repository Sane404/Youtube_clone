import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { ApiCallsService } from '../services/api-calls.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(private router:ActivatedRoute,private sanitizer: DomSanitizer,private api:ApiCallsService) { }
  trustedUrl;
  videoData;
  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id')
    const iframeSrc = `https://www.youtube.com/embed/${id}`;
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(iframeSrc);
    this.api.getSingleVideoData(id).subscribe((res:any)=>{
      const {title,description,publishedAt} = res.items[0].snippet;
      const {viewCount,likeCount,dislikeCount} = res.items[0].statistics;
      this.videoData = {title,description,publishedAt,viewCount,likeCount,dislikeCount};
      console.log(this.videoData);

    })

  }

}
