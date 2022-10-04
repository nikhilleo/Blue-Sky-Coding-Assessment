const { getCountries, getEmissions } = require('../controllers/co2_emission.controller');
const router = require('express').Router();

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Retrieve a list of Countries users.
 *     description: Retrieve a list of Countries.
 *     responses:
 *       200:
 *         description: A list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Country ID.
 *                         example: 1
 *                       country_or_area:
 *                         type: string
 *                         description: Country Name.
 *                         example: Australia
 *                       start_year:
 *                         type: integer
 *                         description: Start year.
 *                         example: 1990
 *                       end_year:
 *                         type: integer
 *                         description: Start year.
 *                         example: 2014
 *       400:
 *          description: Bad Request Error (The request cannot be fulfilled due to bad syntax.).
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                    type: string
 *                    example: Error from Database.
 *       404:
 *          description: Endpoint does not exist.
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                    type: string
 *                    example: API endpoint doesn't exist.
 * 
 *       500:
 *          description: Internal Server Error.
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                    type: string
 *                    example: Internal Server Error.
 */
router.get('/countries', getCountries)

/**
 * @swagger
 * /api/country/{country_id}:
 *   get:
 *     summary: Retrieves data for the given country id.
 *     description: Retrieves all the data for the country id provided in params and also filtering for start_year, end_year, category of gas via query params.
 *     parameters:
 *       - in: path
 *         name: country_id
 *         required: true
 *         description: Numeric ID of the country to retrieve data.
 *         schema:
 *           type: string
 *       - in: query
 *         name: startYear
 *         required: true
 *         description: Please provide a start year to retrieve data from the given start year.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: endYear
 *         description: Please provide an end year to retrieve data till the given end year.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         required: true
 *         description: Please provide string of categories with comma separated values eg 'CO2,GHG'.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all the countries and values of gas emissions for the given years and category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                    type: object
 *                    properties:
 *                       count:
 *                         type: integer
 *                         description: Number of records.
 *                         example: 1
 *                       rows:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              id:
 *                                type: integer
 *                                description: Country ID.
 *                                example: 11
 *                              country_or_area:
 *                                type: string
 *                                description: Country Name.
 *                                example: Estonia
 *                              year:
 *                                type: integer
 *                                description: Data For Year.
 *                                example: 2011
 *                              value:
 *                                type: integer
 *                                description: Value of the category in the year mentioned.
 *                                example: 18449.9308643309
 *                              category:
 *                                type: integer
 *                                description: Category of the gas.
 *                                example: CO2
 *       400:
 *          description: Bad Request Error (The request cannot be fulfilled due to bad syntax.).
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                    type: string
 *                    example: No start year provided, please provide start year to get data.
 *       404:
 *          description: Endpoint does not exist.
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                    type: string
 *                    example: API endpoint doesn't exist.
 * 
 *       500:
 *          description: Internal Server Error.
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                    type: string
 *                    example: Internal Server Error.
*/      
router.get('/country/:id', getEmissions)


module.exports = router;