const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  starting_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  current_price: {
    type: DataTypes.DECIMAL,
    defaultValue: DataTypes.DECIMAL,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

module.exports = Item;
