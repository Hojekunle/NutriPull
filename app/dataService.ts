import {Injectable}     from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
// Add all operators to Observable, needed for adding
// .map() on to the end of the http request
import 'rxjs/Rx';


import { Hero }           from './hero';
import { Observable }     from 'rxjs/Observable';
import {Pipe, PipeTransform} from '@angular/core';



// allow this service to be injected into other components
@Injectable()
export class DataService {

    // set URL for API
    private BASE_URL = 'https://api.nutritionix.com/v1_1/search/';  // URL to web api
    private APP_ID = '8abbcd8e'
    private API_KEY = '36e8d264537037ee7e832a41902ffe57'
    constructor(private http: Http) { }
    /**
     * 
     */
    getSearchResults(_searchString) {

        // fields to get back from API based on documenation
        let fields = 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat';

        // set the parameters for the http request, these will be 
        // added to the query string
        let params: URLSearchParams = new URLSearchParams();
        params.set('results', '0:50')
        params.set('appId', this.APP_ID);
        params.set('appKey', this.API_KEY);
        params.set('fields', fields)

        // construct the URL, adding the search term to the url
        let url = this.BASE_URL + _searchString
        
        // execute the http get request, passing in query string parameters
        // use the .map() to convert results to JSON to be returned to
        // the caller
        return this.http.get(url, { search: params })
            .map(res => res.json())

    }


    getSearchResultsAng(_searchString): Observable<Hero[]> {

        // fields to get back from API based on documenation
        //let fields = 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat';

        // set the parameters for the http request, these will be 
        // added to the query string
        let params: URLSearchParams = new URLSearchParams();
        params.set('results', '0:50')
        params.set('appId', this.APP_ID);
        params.set('appKey', this.API_KEY);
        //params.set('fields', fields)

        // construct the URL, adding the search term to the url
        let url = this.BASE_URL + _searchString
        
        // execute the http get request, passing in query string parameters
        // use the .map() to convert results to JSON to be returned to
        // the caller
        return this.http.get(url, { search: params })
        .map(res => res.json())
            //.map(this.extractData)

    }

    private extractData(res: Response) {
    //let body = res;
    let body = res.json();
    return body.data || { };
    }

    
}

//Implement ability to Loop Over Object Properties in Angular 2’s ngFor
@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

    
}