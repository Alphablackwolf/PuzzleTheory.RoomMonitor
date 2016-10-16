import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './room';

@Component({
    selector: 'my-app',
    template: `
        <div class="RoomSection" *ngFor="let room of rooms">
            <div class="row">
                <div class="col-md-12">
                    Room {{room.name}} Time(minutes) <input [(ngModel)]="room.startMinutes" /> 
                </div> 
            </div>
        </div>`,
    providers: [RoomService]
})
export class AdministrationPage implements OnInit { 

    constructor(private roomService: RoomService) { }

    rooms: Room[];

    getRooms(): void {
        this.roomService.getRooms().then(rooms => this.rooms = rooms);
    }

    ngOnInit(): void {
        this.getRooms();
    }
}
