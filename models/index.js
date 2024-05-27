const sequelize = require('../config/database');
const User = require('./user');
const Item = require('./item');
const Bid = require('./bid');
const Notification = require('./notification');

// Define associations
User.hasMany(Item, { foreignKey: 'user_id' });
Item.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Bid, { foreignKey: 'user_id' });
Bid.belongsTo(User, { foreignKey: 'user_id' });

Item.hasMany(Bid, { foreignKey: 'item_id' });
Bid.belongsTo(Item, { foreignKey: 'item_id' });

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Item,
  Bid,
  Notification,
};
