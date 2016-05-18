import {Component} from 'angular2/core';
import {BaseHttpService} from '../../services/base-http';
import {ProfileService} from '../../services/profile';

import {Profile} from '../../models/profile';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  providers: [BaseHttpService, ProfileService]
})

export class HomeCmp {
	profile: Profile = new Profile();

	constructor(private profileService: ProfileService) {
		var self = this;
		this.profileService
			.get()
			.subscribe((data) => {
				self.profile = data;
			});
	}
}
