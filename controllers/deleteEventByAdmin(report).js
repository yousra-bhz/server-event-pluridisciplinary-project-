const Post = require('../models/post')
const Admin = require('../models/admin')


const DeleteEventByAdminReport = async(req , res) => {
    try {
        const {id} = req.params
        const admin = await Admin.findById({_id : "663c98f206c059f0a5a64067"});

        if (!admin) {
            throw new Error('Admin not found');
        }
        // Remove the report from the array based on the eventId
            admin.reports = admin.reports.filter(report => report.event.toString() !== id);
            await admin.save();
            await Post.findByIdAndDelete(id);
            return res.statsu(200).send('Event deleted succesfully')
        
    } catch (error) {
        throw new Error(error.message);
    }
}
        


module.exports = DeleteEventByAdminReport