


// THIS IS JUST THE TEACHER ID 


module.exports = function (sequelize, DataTypes) {
    const Teacher = sequelize.define('Teacher', {

        // levels: {
        //     type: DataTypes.STRING
        // },

        about :{
            type: DataTypes.TEXT
            // validate:{
            //     len: [1] // we should set maximun characters, not sure that 100 like here
            // }
        },
        YearsofExperience: {
            type: DataTypes.INTEGER
        }
//         dob: {
//             type: DataTypes.DATEONLY, //format('YYYY-MM-DD')
//         },
        


    });
    Teacher.associate = function (models) {
        Teacher.belongsTo(models.User)
        Teacher.hasMany(models.Review);
        // Teacher.hasMany(models.TeacherSkill);

    };
    return Teacher;
};
