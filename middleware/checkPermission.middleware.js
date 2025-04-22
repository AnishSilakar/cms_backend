// middleware/checkPermission.js
const buildGrants = require('../config/permission');

module.exports = async function checkPermission(role, moduleName, submoduleName, action, possession = 'Any') {
  const ac = await buildGrants();
  const resource = `${moduleName}:${submoduleName}`;

  try {
    return ac.can(role)[`${action}${possession}`](resource).granted;
  } catch (e) {
    return false;
  }
};
