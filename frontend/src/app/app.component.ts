import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {GraphService} from "./graph.service";


interface ServerInfo {
  label: string,
  url: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  streamServers: ServerInfo[]
  socket: any = null
  graph:any[] = null


  constructor(private graphService: GraphService) {

  }

  ngOnInit(): void {
    this.graphService.getStreamServers().subscribe((data) => {
      this.streamServers = Object.keys(data).map(label => data[label])
    })
  }

  onStreamServerChange(streamServerUrl) {
    if (this.socket) {
      this.socket.disconnect()
    }
    this.graph = this.createGraph()
    this.socket = this.graphService.getSocketConnection(streamServerUrl);
    this.socket.on("data", (data) => {

      let series = this.graph[0].series
      series.push({
        name: String(data.x),
        value: data.y
      })
      this.graph = [
        {
          name:"curve",
          series
        }
      ]
    })

  }

  createGraph() {
    return [{
      name: "Curve",
      "series": []
    }]
  }

}
