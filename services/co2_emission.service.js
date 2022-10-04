const { Op } = require("sequelize")
const { errorMessages } = require("../constants")
const sequelize = require("../database")
const CO2_Emissions = require("../model/co2_emission")

module.exports = {
    async getCountriesService(){
        try {
            return CO2_Emissions.findAll(
            {    
                group:['country_or_area'],
                attributes:[
                    'id',
                    'country_or_area',
                    [sequelize.fn('MIN', sequelize.col('year')), 'start_year'],
                    [sequelize.fn('MAX', sequelize.col('year')), 'end_year'],
                ],
            }    
            )
        } catch (error) {
            throw new Error(error)
        }
    },

    async getEmissionForQuery(id,queryParams){
        try {
            let { startYear, endYear, category } = queryParams;
            category = category ? category.split(',') : []
            if(!startYear){
                throw errorMessages.noStartYearProvided;
            }
            if(!endYear) {
                // Taking endYear as current year
                endYear = new Date().getFullYear()
            }
            if(!category.length) {
                throw errorMessages.noCategoryProvided;
            }
            let query = {
                id,
                year: {
                    [Op.between]: [startYear,endYear],
                },
                category: {
                    [Op.in]: category
                }
            }
            return CO2_Emissions.findAndCountAll(
                {    
                    where: query,
                    order: ['year']
                }
            )
        } catch (error) {
            throw new Error(error)
        }
    }
}