/**
 * Global Configuration
 */

module.exports = {
    port: process.env.PORT || 5000,
    database: {
        url: process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost/WeddingRegistry'
    },
    /**
     * Date which registration ends
     * @type {Date}
     */
    cutOffDate: new Date('07/04/2013 11:59:59 PM CDT')
};