import {Component} from 'angular2/core';
import {ProfileCmp} from '../profile/profile';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [ProfileCmp]
})

export class HomeCmp {}
