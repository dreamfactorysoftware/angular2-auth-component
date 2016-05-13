import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';
import {URLSearchParams} from 'angular2/http';

import {Profile} from '../../models/profile';
import {BaseHttpService} from '../../services/base-http';
import {ProfileService} from '../../services/profile';

import * as constants from '../../config/constants';

@Component({
	selector: 'profile',
	templateUrl: './components/profile/profile.html',
	providers: [BaseHttpService, ProfileService],
	directives: [FORM_DIRECTIVES]
})

export class ProfileCmp {
	form: ControlGroup;

	setPassword: Boolean = false;
	oldPassword: String;
	newPassword: String;
	verifyPassword: String;

	firstName = new Control('', Validators.required);
	lastName = new Control('', Validators.required);
	name = new Control('');
	email = new Control('');
	phone = new Control('');

	profile: Profile = new Profile();

	constructor(private profileService: ProfileService, private router: Router, private params: RouteParams, private formBuilder: FormBuilder, private httpService: BaseHttpService) {
		var self = this;
		this.profileService
			.get()
			.subscribe((data) => {
				self.profile = data;
			});

		this.form = this.formBuilder.group({
			firstName: this.firstName,
			lastName: this.lastName,
			name: this.name,
			email: this.email,
			phone: this.phone
		});
	}

	save () {
		var self = this;

		if (this.setPassword) {
			if (this.newPassword !== this.verifyPassword) {
				alert('Please enter same new password in confirm password');
				return;
			}

			this.profileService.resetPassword(this.oldPassword, this.newPassword)
				.subscribe((response) => {
					alert('Password updated');
				});
		}

		this.profileService.save(this.profile)
			.subscribe((response) => {
				alert('Profile updated');
			});

	}
}
