import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./main/home.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        HomeRoutingModule,
        MatCardModule,
        MatIconModule,
    ],
    providers: []
})
export class HomeModule { }
