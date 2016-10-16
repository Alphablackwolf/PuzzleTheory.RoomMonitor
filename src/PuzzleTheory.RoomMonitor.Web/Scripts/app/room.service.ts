import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Room } from './room';


@Injectable()
export class RoomService {
    constructor(private http: Http) { }

    getRooms(): Promise<Room[]> {
        //todo: setup a base path variable to be used throughout the code.
        return this.http.get('http://localhost:65298/Administration/GetRooms')
            .toPromise()
            .then(response => response.json() as Room[])
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        //todo: add a toastr message for errors.
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    

}