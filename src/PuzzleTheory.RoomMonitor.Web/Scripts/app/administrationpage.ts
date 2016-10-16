import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './room';

@Component({
    selector: 'rooms',
    template: `
        <div class="RoomSection" *ngFor="let room of rooms">
            <div class="row">
                <div class="col-md-6">
                    {{room.name}} Time(minutes) <input [(ngModel)]="room.startMinutes" /> 
                </div> 
                <div class="col-md-6">
                    <button type="Button" (click)="initialize(room)">Initialize</button>
                </div> 
            </div>
        </div>`,
    providers: [RoomService]
})
export class AdministrationPage implements OnInit { 

    roomHub: IRoomHub;

    constructor(private roomService: RoomService) { }

    rooms: Room[];

    initialize(room: Room) {
        this.roomHub.server.initiateTimer(room.id, room.startMinutes);
    }

    getRooms(): void {
        this.roomService.getRooms().then(rooms => this.rooms = rooms);
    }

    ngOnInit(): void {
        this.getRooms();
        this.roomHub = $.connection.roomHub;
    }
}