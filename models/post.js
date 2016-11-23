var mongoose = require('libs/mongoose');
Schema = mongoose.Schema;

var schema = new  Schema ({

    id: {
        type: Number,
        unique: true,


    }
})
