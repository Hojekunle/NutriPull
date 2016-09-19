import {Page, Loading, NavController} from 'ionic-angular';
import { DataService } from '../../dataService';
import {
  OnInit,
  OnDestroy
} from '@angular/core';

import { ValuesPipe } from '../../dataService';
import { Hero } from '../../hero';
import { NgFor } from '@angular/common';



@Page({
  templateUrl: 'build/pages/page1/page1.html',
  pipes: [ValuesPipe],
  directives: [NgFor],
  providers: [DataService]
})
export class Page1 implements OnInit, OnDestroy {

  // the first page of the app
  rootPage: any = Page1;

  // the array of items found
  items
  errorMessage: string;
  heroes: Hero[];

  // the search string
  searchQuery

  constructor(private _dataService: DataService, private _nav: NavController) {

    // be sure to initizalize the model objects to avoid
    // weird errors in the console

    // the array of items found
    this.items = [];

    // the search string
    this.searchQuery = ""
  }

  /**
   * do any initialization here NOT in the constructor
   */
  ngOnInit() {    
    this.getItemsAng() ;
    console.log('onInit');
  }

  ngOnDestroy() {
    console.log('onDestroy');
  }

  /**
   * query the API with the specific search string
   */
  getItems() {
    // clean up the string, if empty then exit
    let q = this.searchQuery.trim()
    if (q == '' || q.length < 5) {
      return;
    }

    let loading = Loading.create({
      content: 'Searching, Please Wait...'
    });
    this._nav.present(loading);
    

    // have a string, do the search
    this._dataService.getSearchResults(q)
      .subscribe(
      // process the results..
      (data) => {
        console.log('search results', data.hits)
        this.items = data.hits
      },
      // handle an error condition...
      (err) => alert("Error Searching: " + err),
      // called when completely done processing
      () => {
        console.log("All Good With The Data");
        loading.dismiss()
      }
      );
  }


getItemsAng() {
    // clean up the string, if empty then exit
    let q = this.searchQuery.trim()
    if (q == '' || q.length < 5) {
      return;
    }

    let loading = Loading.create({
      content: 'Searching, Please Wait...'
    });
    this._nav.present(loading);
    

    // have a string, do the search
    this._dataService.getSearchResultsAng(q) 
        .subscribe(
          heroes => this.heroes = heroes,
          (error) => alert("Error Searching: " + error),
          //error =>  this.errorMessage = <any>error);
          () => {  console.log("All Good With The Data");
                  loading.dismiss()
          } ) 
      
  }

}
