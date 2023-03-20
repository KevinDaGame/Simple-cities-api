import * as mongoose from "mongoose";

const citiesSchema = new mongoose.Schema({
    city: {type: String, required: true},
    city_ascii: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    country: {type: String, required: true},
    iso2: {type: String, required: true},
    iso3: {type: String, required: true},
    admin_name: {type: String, required: true},
    capital: {type: String, required: true},
    population: {type: Number, required: true},
    id: {type: Number, required: true}
});

export const City = mongoose.model('cities', citiesSchema);
