import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { HomepageComponent } from './homepage/homepage.component';
import { QueryResultsComponent } from './query-results/query-results.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomepageComponent},
  {path:'video/:id',component:VideoComponent},
  {path:'search/:query',component:QueryResultsComponent},
  {path:'channel/:id',component:ChannelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
