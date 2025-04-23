const express = require('express');
const router = express.Router();

const PermissionController = require('../controller/permission.controller');

router.post('/insert', PermissionController.insert);
router.get('/role', PermissionController.getRole);
router.post('/module', PermissionController.getModule);
router.get('/activity', PermissionController.getActivity);

module.exports = router;