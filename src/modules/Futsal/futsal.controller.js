const { getDb } = require("../../../utilis/dbConfig")

module.exports.postFutsal = async(req,res,next) => {
    try {
        const db = getDb();
        const data = req.body;
        const result = await db.collection('futsal').insertOne(data);

        res.status(200).json({
            status:'success',
            message:"data inserted successfully",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}