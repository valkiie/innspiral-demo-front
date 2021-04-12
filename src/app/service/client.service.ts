import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Vehicle} from '../model/vehicle';
import {Repair} from "../model/repair";

@Injectable()
export class ClientService {

  private MY_CLIENTS: Client[] = [
    {names : 'Richard Cham'},
    {names : 'Random Guy'},
  ];


  constructor(private http: HttpClient) { }

  // to test with local mock data
  public getClientsMockData(): Client[] {
    return this.MY_CLIENTS;
  }

  public getClients(): Observable<Client[]> {
    const url = 'http://localhost:8080/client';
    return this.http.get<Client[]>(url);
  }

  public getVehicles(id: number): Observable<Vehicle[]> {
    const url = 'http://localhost:8080/vehicle/' + id;
    return this.http.get<Vehicle[]>(url);
  }
  public getRepairs(id: number): Observable<Repair[]> {
    const url = 'http://localhost:8080/repair/' + id;
    return this.http.get<Repair[]>(url);
  }

  public saveClient(names: string): Observable<any> {
    const url = 'http://localhost:8080/client';
    const body = {names: ''};
    body.names = names;
    return this.http.post(url, body);
  }

  public saveVehicle(model: string, plate: string, clientId: number): Observable<any> {
    const url = 'http://localhost:8080/vehicle';
    const body = {model: '', plate: '', clientId: 0};
    body.model = model;
    body.plate = plate;
    body.clientId = clientId;
    return this.http.post(url, body);
  }

  public saveRepair(comments: string, vehicleId: number): Observable<any> {
    const url = 'http://localhost:8080/repair';
    const body = {comments: '', vehicleId: 0};
    body.comments = comments;
    body.vehicleId = vehicleId;
    return this.http.post(url, body);
  }
}
