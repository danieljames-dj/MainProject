import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public user = {"uid": ""};
  public itemPageId;
  public itemName;
  public rate;
  public apiUrl = 'http://127.0.0.1:8081/';
}