const Post = require('../models/post')
const Admin = require('./models/user')


const DeleteEventByAdminReport = async(req , res) => {
    try {
        const {id} = req.params
        const admin = await Admin.findById({_id : "65dad6407231d4b7feb9b8ba"});

        if (!admin) {
            throw new Error('Admin not found');
        }

        // Remove the report from the array based on the eventId
        admin.reports = admin.reports.filter(report => report.event.toString() !== id);

        await admin.save();
        await Post.findByIdAndDelete(id);
        return res.statsu(200).send('Event deleted succesfully');
    } catch (error) {
        throw new Error(error.message);
    }
}
        


module.exports = DeleteEventByAdminReport