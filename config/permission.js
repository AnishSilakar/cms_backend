// permissions.js
const AccessControl = require('accesscontrol');
const { Role, Module, Submodule, Activity, Permission } = require('./models');

async function buildGrants() {
  const grants = {};

  const permissions = await Permission.findAll({
    include: [Role, Module, Submodule, Activity],
  });

  for (const p of permissions) {
    const role = p.Role.name;
    const moduleName = p.Module.name;
    const submoduleName = p.Submodule.name;
    const activity = p.Activity.name;
    const possession = p.possession;

    const resource = `${moduleName}:${submoduleName}`; // e.g., 'Projects:Tasks'
    const action = `${activity}${possession.charAt(0).toUpperCase() + possession.slice(1)}`; // e.g., 'createAny'

    if (!grants[role]) grants[role] = {};
    if (!grants[role][resource]) grants[role][resource] = [];

    grants[role][resource].push(action);
  }

  const ac = new AccessControl();

  for (const role in grants) {
    for (const resource in grants[role]) {
      for (const action of grants[role][resource]) {
        const [activity, possession] = action.match(/(create|read|update|delete)(Own|Any)/i).slice(1, 3);
        ac.grant(role)[`${activity}${possession}`](resource);
      }
    }
  }

  return ac;
}
