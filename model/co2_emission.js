const sequelize = require('../database');
const { STRING, BIGINT, DOUBLE } = require('sequelize');

const CO2_Emissions = sequelize.define('co2_emissions', {
  country_or_area: {
    type: STRING
  },
  year: {
    type: BIGINT
  },
  value: {
    type: DOUBLE    
  },
  category: {
    type: STRING    
  }
},{
    timestamps: false
});

module.exports = CO2_Emissions;