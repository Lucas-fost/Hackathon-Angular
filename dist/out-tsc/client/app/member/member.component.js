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
var user_service_1 = require("../user.service");
var MemberComponent = (function () {
    function MemberComponent(userService, route) {
        this.userService = userService;
        this.route = route;
    }
    MemberComponent.prototype.ngOnInit = function () {
        this.getMember();
    };
    MemberComponent.prototype.getMember = function () {
        var _this = this;
        var id = Number(this.route.snapshot.paramMap.get('id'));
        this.userService.getMember(id)
            .subscribe(function (user) { return _this.user = user; });
    };
    return MemberComponent;
}());
MemberComponent = __decorate([
    core_1.Component({
        selector: 'app-member',
        templateUrl: './member.component.html',
        styleUrls: ['./member.component.css'],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute])
], MemberComponent);
exports.MemberComponent = MemberComponent;
//# sourceMappingURL=member.component.js.map