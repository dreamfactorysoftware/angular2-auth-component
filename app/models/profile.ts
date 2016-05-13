
export class Profile {
	constructor(
		public firstName: string = null,
		public lastName: string = null,
		public name: string = null,
		public email: string = null,
		public phone: string = null
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new Profile(
			json.first_name,
			json.last_name,
			json.name,
			json.email,
			json.phone
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			first_name: this.firstName,
			last_name: this.lastName,
			name: this.name,
			email: this.email,
			phone: this.phone
		};

		return stringify ? JSON.stringify(doc) : doc;
	}

}