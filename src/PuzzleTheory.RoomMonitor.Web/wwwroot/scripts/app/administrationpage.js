"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var room_service_1 = require('./room.service');
var AdministrationPage = (function () {
    function AdministrationPage(roomService) {
        this.roomService = roomService;
    }
    AdministrationPage.prototype.initialize = function (room) {
    };
    AdministrationPage.prototype.getRooms = function () {
        var _this = this;
        this.roomService.getRooms().then(function (rooms) { return _this.rooms = rooms; });
    };
    AdministrationPage.prototype.ngOnInit = function () {
        this.getRooms();
    };
    AdministrationPage = __decorate([
        core_1.Component({
            selector: 'rooms',
            template: "\n        <div class=\"RoomSection\" *ngFor=\"let room of rooms\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    {{room.name}} Time(minutes) <input [(ngModel)]=\"room.startMinutes\" /> \n                </div> \n                <div class=\"col-md-6\">\n                    <button type=\"Button\" (click)=\"initialize(room)\">Initialize</button>\n                </div> \n            </div>\n        </div>",
            providers: [room_service_1.RoomService]
        }), 
        __metadata('design:paramtypes', [room_service_1.RoomService])
    ], AdministrationPage);
    return AdministrationPage;
}());
exports.AdministrationPage = AdministrationPage;
//# sourceMappingURL=administrationpage.js.map