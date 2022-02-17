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
var authenticator_service_1 = require("../authenticator.service");
var NavComponent = (function () {
    function NavComponent(authService, route) {
        this.authService = authService;
        this.route = route;
        this.loggedIn = false;
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService
            .isLoggedIn()
            .subscribe(function (response) { return (_this.loggedIn = response.auth); });
    };
    NavComponent.prototype.logout = function () {
        var _this = this;
        this.authService
            .logout()
            .subscribe(function (response) {
            _this.loggedIn = response.auth;
            _this.route.navigate(['/home']);
        });
    };
    return NavComponent;
}());
NavComponent = __decorate([
    core_1.Component({
        selector: "app-nav",
        templateUrl: "./nav.component.html",
        styleUrls: ["./nav.component.css"],
    }),
    __metadata("design:paramtypes", [authenticator_service_1.AuthenticatorService, router_1.Router])
], NavComponent);
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map