"use strict";
const express = require("express");
const router = express.Router();
const members_list_1 = require("../members-list");
router.get('/members', (req, res) => {
    res.send(members_list_1.MEMBERS);
});
router.get('/members/:id', (req, res) => {
    const member = members_list_1.MEMBERS.find(mem => mem.id === req.params.id);
    res.send(member ? member : `No member found at id: ${req.params.id}`);
});
module.exports = router;
//# sourceMappingURL=/Users/lucas/Development/Angular-Node-Express-Typescript-master/server/routes/exampleRoute.js.map