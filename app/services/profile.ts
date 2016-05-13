import {Injectable} from'angular2/core';
import {Http, Headers, URLSearchParams} from 'angular2/http';
import {Profile} from '../models/profile';
import * as constants from '../config/constants';
import {BaseHttpService} from './base-http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

class ServerResponse {
	constructor(public resource: any) {
	}
};

@Injectable()
export class ProfileService {
	baseResourceUrl: string = constants.DSP_INSTANCE_URL + '/api/v2/user/profile'; 
	resetPasswordUrl: string = constants.DSP_INSTANCE_URL + '/api/v2/user/password?login=false&reset=true';
	constructor(private httpService: BaseHttpService) {

	};

	get(): Observable<Profile> {
		return this.httpService.http
			.get(this.baseResourceUrl)
			.map((response) => {
				return Profile.fromJson(response.json());
			});
	};

	save(profile: Profile): Observable<any> {	
		return this.httpService.http.post(this.baseResourceUrl, profile.toJson(true))
			.map((response) => {
				return response;
			});
	};

	resetPassword(oldPassword: String, newPassword: String) {
		var data: any = {
			old_password: oldPassword,
			new_password: newPassword
		}
		return this.httpService.http.post(this.resetPasswordUrl, JSON.stringify(data))
			.map((response) => {
				return response;
			})
	}
}