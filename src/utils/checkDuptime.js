

module.exports = async (data, Meeting) => {
    var found = await Meeting.find({ 'startDate': { $gte: data.startDate }, "endDate": { $lte: data.endDate } });
    return found;
}