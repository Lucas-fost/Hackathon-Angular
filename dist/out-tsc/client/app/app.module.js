"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var member_component_1 = require("./member/member.component");
var members_component_1 = require("./members/members.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var nav_component_1 = require("./nav/nav.component");
var authenticator_service_1 = require("./authenticator.service");
var user_service_1 = require("./user.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            member_component_1.MemberComponent,
            members_component_1.MembersComponent,
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            nav_component_1.NavComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_1.AppRoutingModule,
            forms_1.FormsModule,
            http_1.HttpClientModule
        ],
        providers: [authenticator_service_1.AuthenticatorService, user_service_1.UserService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map