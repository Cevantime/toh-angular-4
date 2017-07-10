import { Injectable } from '@angular/core' ;
import {Http, Headers} from '@angular/http' ;

import { Hero } from './hero' ;
import { HEROES } from './mock-heroes' ;

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroService {

	private heroesUrl = 'http://51.255.36.188/toh-server/index.php';
	private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

	constructor(private http : Http) {} ;

	getHeroes() : Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
			.toPromise()
			.then(response => response.json().data as Hero[])
			.catch(this.handleError);
	}

	getHeroesSlowly() : Promise<Hero[]> {
		return new Promise(resolve => {	
			setTimeout(() => resolve(HEROES), 2000);
		});
	}

	getHero(id : Number) : Promise<Hero> {
		return this.getHeroes()
			.then(heroes => heroes.find(hero => id == hero.id));
	}

	update(hero : Hero) : Promise<Hero> {
		return this.http
			.post(this.heroesUrl, 'id='+hero.id+'&name='+encodeURIComponent(hero.name), {headers : this.headers})
			.toPromise()
			.then(() => hero)
			.catch(this.handleError);
	}

	create(name : string) : Promise<Hero> {
		return this.http
			.post(this.heroesUrl, 'name='+encodeURIComponent(name), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data as Hero)
			.catch(this.handleError);
	}

	delete(id : number) : Promise<void> {
		return this.http
			.get(this.heroesUrl+'?del='+id)
			.toPromise()
			.then(()=>null)
			.catch(this.handleError);
	}

	search(search : string) : Observable<Hero[]> {
		return this.http
			.get(this.heroesUrl+'?search='+encodeURIComponent(search))
			.map(response => response.json().data as Hero[]);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}

