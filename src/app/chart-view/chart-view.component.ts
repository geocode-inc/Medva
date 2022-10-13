import { Component, OnInit } from '@angular/core';
import { DatatableViewComponent } from '../datatable-view/datatable-view.component';


declare function basinMonitorLoad(): any;
declare function waterMeterLoad(): any;
declare function showLinks():any;

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})

export class ChartViewComponent implements OnInit {

  constructor() { 
    
  }
  
  datatableview : DatatableViewComponent | undefined;
  vis1: boolean = true;
  vis2: boolean = true;
  isHidden: boolean = true;
  //datatableview.panelOpenState = true;
  
  togglePanel(evt:Event) : void
  {
  
  this.vis1 = !this.vis1;
  //this.datatableview.panelOpenState = true;
  } 
 
  SideBarToggle(){
    alert("Hi")
  }
  toggleAddForm(evt){
    this.isHidden = !this.isHidden;
  }
  addWaterMeters(){
   // waterMeterLoad();
  }
  
  ngOnInit(): void {
    
    //this.loadScript('./assets/scripts/chart-view.js');
 
  }
  //Adding javascript code
  public loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = false;
    node.defer = true;
    document.getElementsByTagName('head')[0].appendChild(node);
    let st;
    node.onload = async () => {
     // basinMonitorLoad();
     
 
  };

 }

}
