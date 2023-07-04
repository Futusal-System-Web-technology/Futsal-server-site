const { getDb } = require("../../../utilis/dbConfig")
// Import the 'date-fns' library (optional, for formatting the date)
const { format } = require('date-fns');
// Create a new Date object
const today = new Date();
// Format the date using 'date-fns' (optional)
const formattedDate = format(today, 'yyyy-MM-dd');


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

module.exports.postBooking = async(req,res,next)=>{
    try {
        const db = getDb()

        const data = req.body;
        data.date = formattedDate
   
        const results = await db.collection('futsal-bookings').insertOne(data);

        res.status(200).json({
            status:"success",
            message:"Booking has been created successfully",
            data: data
        })

    } catch (error) {
        res.status(400).json({
            status:"Fail",
            message:error.message
        })
    }
}