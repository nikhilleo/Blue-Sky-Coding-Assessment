const { Op } = require("sequelize")
const { errorMessages, redisKeys } = require("../constants")
const sequelize = require("../database")
const CO2_Emissions = require("../model/co2_emission")
const { getClient } = require("../redis")

module.exports = {
    async getCountriesService(){
        try {
            const redisClient = await getClient()
            const inCache = await redisClient.get(redisKeys.countries);
            // Checking if countries are available in cache
            if(inCache) {
                // Returning data from cache
                return JSON.parse(inCache)
            }
            const data =  await CO2_Emissions.findAll(
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
            // Adding countries data to cache
            await redisClient.set(redisKeys.countries,JSON.stringify(data))
            return data
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