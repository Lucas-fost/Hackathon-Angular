"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var authenticator_service_1 = require("../authenticator.service");
var router_1 = require("@angular/router");
var user_service_1 = require("../user.service");
var MembersComponent = (function () {
    function MembersComponent(userService, auth, route) {
        this.userService = userService;
        this.auth = auth;
        this.route = route;
        this.users = [];
    }
    MembersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUsers();
        this.auth.isLoggedIn()
            .subscribe(function (response) {
            if (!response.auth)
                _this.route.navigate(['login']);
        });
    };
    MembersComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getMembers()
            .subscribe(function (users) { return _this.users = users; });
    };
    return MembersComponent;
}());
MembersComponent = __decorate([
    core_1.Component({
        selector: 'app-members',
        templateUrl: './members.component.html',
        styleUrls: ['./members.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, authenticator_service_1.AuthenticatorService, router_1.Router])
], MembersComponent);
exports.MembersComponent = MembersComponent;
//# sourceMappingURL=members.component.js.map