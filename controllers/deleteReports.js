const Admin = require('../models/admin');

const DeleteReport = async (req, res) => {
    const { id } = req.params;
    const emailAdmin = "admin@gmail.com";
    const admin = await Admin.findOne({ email: emailAdmin });

    // Correcting filter condition and assignment
    admin.reports = admin.reports.filter((report) => report.id !== id);

    await admin.save();
};

module.exports = DeleteReport;
