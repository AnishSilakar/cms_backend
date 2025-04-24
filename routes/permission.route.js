const express = require('express');
const router = express.Router();
const PermissionController = require('../controller/permission.controller');
const AuthMiddleware = require('../middleware/auth.middleware');

// Middleware to check authentication
router.use(AuthMiddleware);

router.post('/insert', PermissionController.insert);
router.get('/role', PermissionController.getRole);
router.post('/module', PermissionController.getModule);
router.get('/activity', PermissionController.getActivity);
router.put('/update', PermissionController.update);

module.exports = router;