import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map'
import {Observable} from "rxjs";
import * as io from 'socket.io-client'




const API_ROOT = "http://localhost:3311"

@Injectable()
export class GraphService {

  constructor(private http:Http) {
    
  }

  public getStreamServers(): Observable<Response>{
    return this.http.get(`${API_ROOT}/stream-servers`).map(res=>res.json())
  }

  public getSocketConnection(streamServerUrl:string){
    return io.connect(streamServerUrl)
  }

}
