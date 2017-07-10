import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router' ;
import { HttpModule } from '@angular/http' ;

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component' ;
import { DashboardComponent } from './dashboard.component' ;
import { HeroSearchComponent } from './hero-search.component' ;

import { HeroService } from './hero.service' ;

import { router } from './routes';


@NgModule({
	declarations: [
		AppComponent,
		HeroesComponent,
		HeroDetailComponent,
		DashboardComponent,
		HeroSearchComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		router,
		HttpModule
	],
	providers: [
		HeroService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
