"use strict";
var express = require("express");
var router = express.Router();
var members_list_1 = require("../members-list");
router.get('/members', function (req, res) {
    res.send(members_list_1.MEMBERS);
});
router.get('/members/:id', function (req, res) {
    var member = members_list_1.MEMBERS.find(function (mem) { return mem.id === req.params.id; });
    res.send(member ? member : "No member found at id: " + req.params.id);
});
module.exports = router;
//# sourceMappingURL=exampleRoute.js.map