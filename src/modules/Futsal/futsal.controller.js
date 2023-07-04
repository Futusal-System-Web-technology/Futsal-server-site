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

module.exports.getAllFutsal = async(req,res,next)=>{
    try {
        const db = getDb();
        const results  = await db.collection('futsal').find().toArray();

        if (results.length == 0) {
            return res.status(400).json({ success: 'Fail', error: "No data" });
        }
        res.status(200).json({status:'success',data: results});
    } catch (error) {
        
    }
}