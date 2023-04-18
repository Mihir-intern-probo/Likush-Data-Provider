const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Crypto =   sequelize.define('btc', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey:true
  },
  event_type:{
    type:DataTypes.STRING,
    allowNull:true
  },
  event_time:{
    type:DataTypes.BIGINT,
    allowNull:true
  },
  symbol:{
    type:DataTypes.STRING,
    allowNull:true
  },
  kline_start:{
    type:DataTypes.BIGINT,
    allowNull:true
  },
  kline_close:{
    type:DataTypes.BIGINT,
    allowNull:true
  },
  inter:{
    type:DataTypes.STRING,
    allowNull:true
  },
  f_trade_id:{
    type:DataTypes.BIGINT,
    allowNull:true
  },
  l_trade_id:{
    type:DataTypes.BIGINT,
    allowNull:true
  },
  o_price:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  c_price:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  h_price:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  l_price:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  base_asset_vol:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  No_Of_Tr:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  isKlClosed:{
    type:DataTypes.BOOLEAN,
    allowNull:true
  },
  quo_vol:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  taker_bs_vol:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  taker_quo_vol:{
    type:DataTypes.FLOAT,
    allowNull:true
  },
  IG:{
    type:DataTypes.STRING,
    allowNull:true
  },
  createdAt:{
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt:{
    type: DataTypes.DATE,
    allowNull: true,
  }
},{
  tableName: 'btcs',
  indexes:[{
      name: 'btcs',
      fields: ['createdAt']
    }
  ]
}
);
module.exports = {Crypto}