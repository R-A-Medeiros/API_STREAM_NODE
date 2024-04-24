import mongoose from "mongoose";

const filmeSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    title: {type: String, required: true },
    description: {type: String, required: true},
    releaseYear: {type: mongoose.Schema.Types.Number, required: true},
    durationMinutes: {type: mongoose.Schema.Types.Number, required: true},
    posterURL: {type: String, required: true},
    trailerURL: {type: String, required: true},
    addedDate: {type: Date, required: true},
    // mediaType: {type: String, required: true, enum:['movie', 'serie']},
    rating: {type: mongoose.Schema.Types.Decimal128, required: false},
    category: {type: String, required: true}
}, {versionKey: false});

const filme = mongoose.model("filmes", filmeSchema);

export default filme;