const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const likushData =   sequelize.define('likush_data', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey:true
  },
  trade_time:{
    type: DataTypes.BIGINT,
    allowNull: true
  },
  Event_Id:{
    type:DataTypes.INTEGER,
    allowNull: true
  },
  event_currency:{
    type: DataTypes.STRING,
    allowNull: true
  },
  tradesYES:{
    type:DataTypes.INTEGER,
    allowNull: true,
  },
  tradesNO:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Avg_Yes_Price:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  Avg_No_Price:{
    type:DataTypes.FLOAT,
    allowNull: true,
  },
  price:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  time:{
    type:DataTypes.BIGINT,
    allowNull:true
  },
  close:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  f_trigger:{
    type: DataTypes.FLOAT(10,2),
    allowNull: true,
  },
  createdAt:{
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt:{
    type: DataTypes.DATE,
    allowNull: true
  }
},{
  tableName: 'likush_data',
  indexes:[{
    name: 'EventI_idx',
    fields:['Event_Id','createdAt']
  }]
});

module.exports = {likushData}