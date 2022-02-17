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
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var members_list_1 = require("../assets/members-list");
var AuthenticatorService = (function () {
    function AuthenticatorService(route, http) {
        this.route = route;
        this.http = http;
        this.currentUser = { id: 99, name: '', password: '', email: '' };
    }
    AuthenticatorService.prototype.validate = function (email, password) {
        return members_list_1.MEMBERS.find(function (member) { return member.email === email && member.password === password; });
    };
    AuthenticatorService.prototype.login = function (email, password) {
        return this.http.post('http://localhost:4000/login', { email: email, password: password });
    };
    AuthenticatorService.prototype.logout = function () {
        return this.http.get('http://localhost:4000/logout');
    };
    AuthenticatorService.prototype.isLoggedIn = function () {
        return this.http.get('http://localhost:4000/api/authcheck');
    };
    return AuthenticatorService;
}());
AuthenticatorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.HttpClient])
], AuthenticatorService);
exports.AuthenticatorService = AuthenticatorService;
//# sourceMappingURL=authenticator.service.js.map