import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AdministrationPage }  from './administrationpage';
import { RoomService } from './room.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
        {
                path: 'Administration',
                component: AdministrationPage
        }])
    ],
    declarations: [
        AppComponent,
        AdministrationPage
    ],
    providers: [RoomService],
    bootstrap: [AppComponent]
})
export class AppModule { }
