import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        about : {
            type : String,
        },
        author : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        condition : {
            type : String,
            required:true
        },
        category : {
            type : String,
            required : true
        },
        imageURLs : {
            type : Array,
            required : true
        },
        userRef : {
            type : String,
            required : true
        }
    },{timestamps:true}
)

const Book = mongoose.model('Book',bookSchema)

export default Book