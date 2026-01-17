const mongoose=require('mongoose')

const Schema=mongoose.Schema

const CatalogueSchema=Schema({

    name:String,

    imageUrl:[String],
    pdf:String,
    
    
},
{
    timestamps:true
}
)

const Catalogue=mongoose.model('catalogues',CatalogueSchema)

module.exports={
    Catalogue
}