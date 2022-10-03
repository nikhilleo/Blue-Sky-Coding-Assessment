const { getCountriesService, getEmissionForQuery } = require("../services/co2_emission.service")

const getCountries = async(req,res,next) => {
    try {
        const data = await getCountriesService();
        return res.json({
            success: true,
            data
        })
    } catch (error) {
        next(error)
    }
}

const getEmissions = async(req,res,next) => {
    try {
        const country_id = req.params.id;
        const queryParams = req.query;
        const data = await getEmissionForQuery(country_id,queryParams);
        return res.json({
            success: true,
            data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCountries,
    getEmissions
}
