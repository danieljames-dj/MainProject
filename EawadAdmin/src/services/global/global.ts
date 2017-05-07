import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public user = {"uid": ""};
  public itemPageId;
  public itemName;
  public rate;
  public apiUrl = 'http://52.34.39.20:8081/';
}