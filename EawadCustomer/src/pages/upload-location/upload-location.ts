import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';

/**
 * Generated class for the UploadLocation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload-location',
  templateUrl: 'upload-location.html',
})
export class UploadLocation {

	data: {"file": any, "uid":any};

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global) {
  	this.data = {"file": "", "uid": this.global.user.uid};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadLocation');
  }

  readFile(input, key) {
  	var dataCache = this.data;
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      dataCache.file = this.result;
      document.getElementById(key).innerHTML = `<img src="` + this.result + `" id="` + key + `">`;
    };
    var inputFile = (<HTMLInputElement>document.getElementById(key + 'ip')).files[0];
    if (inputFile) {
      document.getElementById(key + 'ip').style.visibility = 'hidden';
      document.getElementById(key + 'but').style.visibility = 'visible';
      fileReader.readAsDataURL(inputFile);
    }
  }

  removeFile(key) {
    this.data.file = undefined;
    document.getElementById(key + 'but').style.visibility = 'hidden';
    document.getElementById(key + 'ip').style.visibility = 'visible';
    document.getElementById(key).innerHTML = "";
    (<HTMLInputElement>document.getElementById(key + 'ip')).value = "";
  }

}
