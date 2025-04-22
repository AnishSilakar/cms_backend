const express = require('express');
const router = express.Router();

const PermissionController = require('../controller/permission.controller');

router.post('/insert', PermissionController.insert);

module.exports = router;