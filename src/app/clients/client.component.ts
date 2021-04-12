import { Component, OnInit } from '@angular/core';

import { ClientService } from 'src/app/service/client.service';
import {Client} from '../model/client';
import {Vehicle} from '../model/vehicle';
import {Repair} from '../model/repair';

@Component({
  selector: 'app-my-flights',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public clients: Client[];
  public vehicles: Vehicle[];
  public repairs: Repair[];
  public newClientDialog: boolean;
  public newVehicleDialog: boolean;
  public newRepairDialog: boolean;
  public vehiclesDialog: boolean;
  public repairsDialog: boolean;
  public names: string;
  public plate: string;
  public model: string;
  public comments: string;
  public clientId: number;
  public vehicleId: number;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getClients();
    console.log(this.clients);
  }

  // get the data from backend service api
  private getClients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  public getVehicles(id: number) {
    this.clientService.getVehicles(id).subscribe(data => {
      this.vehicles = data;
    });
    this.vehiclesDialog = true;
    this.clientId = id;
  }

  public getRepairs(id: number) {
    this.clientService.getRepairs(id).subscribe(data => {
      this.repairs = data;
    });
    this.repairsDialog = true;
    this.vehicleId = id;
  }

  public saveClient() {
    this.clientService.saveClient(this.names).subscribe(data => {
      console.log(data);
    });
    this.newClientDialog = false;
    this.getClients();
  }

  public saveVehicle() {
    this.clientService.saveVehicle(this.model, this.plate, this.clientId).subscribe(data => {
      console.log(data);
    });
    this.newVehicleDialog = false;
    this.getVehicles(this.clientId);
  }

  public saveRepair() {
    this.clientService.saveRepair(this.comments, this.vehicleId).subscribe(data => {
      console.log(data);
    });
    this.newRepairDialog = false;
    this.getRepairs(this.vehicleId);
  }

  public showDialog() {
    this.newClientDialog = true;
  }
  public showDialogVehicle() {
    this.newVehicleDialog = true;
  }
  public showDialogRepair() {
    this.newRepairDialog = true;
  }
}
