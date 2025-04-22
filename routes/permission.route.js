const express = require('express');
const router = express.Router();

const PermissionController = require('../controller/permission.controller');

router.get('/check', PermissionController.insert);

module.exports = router;