var Profile = (function () {
    function Profile(firstName, lastName, name, email, phone) {
        if (firstName === void 0) { firstName = null; }
        if (lastName === void 0) { lastName = null; }
        if (name === void 0) { name = null; }
        if (email === void 0) { email = null; }
        if (phone === void 0) { phone = null; }
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    Profile.fromJson = function (json) {
        if (!json)
            return;
        return new Profile(json.first_name, json.last_name, json.name, json.email, json.phone);
    };
    Profile.prototype.toJson = function (stringify) {
        var doc = {
            first_name: this.firstName,
            last_name: this.lastName,
            name: this.name,
            email: this.email,
            phone: this.phone
        };
        return stringify ? JSON.stringify(doc) : doc;
    };
    return Profile;
})();
exports.Profile = Profile;
