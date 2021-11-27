import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  default:string[] = ['coding','cooking', 'biking', 'hiking'];
  constructor(private http:HttpClient) { }
  getDefaultHomepageData(){
    let randomNumber = Math.floor(Math.random() * (this.default.length));
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${this.default[randomNumber]}&type=video&key=${env.API_KEY}`);
  }
  getRelatedVideos(id){
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=${id}&type=video&key=${env.API_KEY}`);
  }
  getVideosByQuery(q){
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${q}&type=video&key=${env.API_KEY}`);
  }
  getChannelData(id){
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${env.API_KEY}`)
  }
  getChannelVideos(id){
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=${env.API_KEY}&maxResults=12`);
  }
  getVideoRatings(video_id:Array<string>){
    let id_string = video_id.join(',');
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id_string}&key=${env.API_KEY}`)
  }
  getSingleVideoData(id){
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${env.API_KEY}`)
  }
}
