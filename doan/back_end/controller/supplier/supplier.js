const supplierDB = require("../../model/supplier")
const Features = require("../../lib/feature")


exports.findAll = async (req, res) => {
    try {
        const features = new Features(
            supplierDB.find(),
            req.query
        )
            .sorting()
            .paginating()
            .searching()
            .filtering();

        const counting = new Features(
            supplierDB
                .find(),

            req.query
        )
            .sorting()
            .searching()
            .filtering()
            .counting();

        const result = await Promise.allSettled([
            features.query,
            counting.query, //count number of user.
        ]);
        const supplier = result[0].status === "fulfilled" ? result[0].value : [];
        const count = result[1].status === "fulfilled" ? result[1].value : 0;
        return res.status(200).json({ data: supplier, count });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            messenger: err.messenger
        });
    }
}