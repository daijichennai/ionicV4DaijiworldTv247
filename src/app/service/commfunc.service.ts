import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommfuncService {

  //public domainURL: String = 'https://www.daijiworld247.com/';
  public domainURL: String = 'http://192.168.1.2/daijiworld247/';
  constructor() { }
  sectionName(mode) {
    if (mode === 'karvalli') {
      return 'Karavali';
    } else if (mode === 'sports') {
      return 'Sports';
    } else if (mode === 'national') {
      return 'State / National';
    } else if (mode === 'international') {
      return 'International';
    } else if (mode === 'entertainment') {
      return 'Entertainment';
    }
  }
}
