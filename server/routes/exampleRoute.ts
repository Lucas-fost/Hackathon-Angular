import * as express from "express";
const router = express.Router();

import { MEMBERS } from "../members-list";

router.get('/members', (req, res) => {
  res.send(MEMBERS)
})

router.get('/members/:id', (req, res) => {
  const member = MEMBERS.find(mem => mem.id === req.params.id)
  res.send(member ? member : `No member found at id: ${req.params.id}`)
})

export = router;

/**
 * Going to do a quick bit of extra typing
 */
