import express from "express";
import connect from "./connect";
import dotenv from "dotenv";
import {City} from "./models/country.model";

const app = express();
app.use(express.json());
let PORT = 3000;
dotenv.config()

app.get('/', (req, res, next) => {
    res.send('Hello World!')
    next()
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connect(process.env.MONGO_URL || "mongodb://localhost:27017/cities  ");
app.get('/countries', async (req, res, next) => {
    const filterObj = JSON.parse(req.query.filter ? req.query.filter as string : "{}");

    // Update the filter object to include case-insensitive partial matching
    for (const [key, value] of Object.entries(filterObj)) {
        filterObj[key] = new RegExp(value as string, "i");
    }

    try {
        const total = await City.distinct('country', filterObj).countDocuments();
        const countries = await City.distinct('country', filterObj)
            .exec();

        res.send({
            data: countries,
            total,
        });
    } catch (err) {
        next(err);
    }
});

app.get('/cities', async (req, res, next) => {
    const page = req.query.page ? +req.query.page : 1;
    const size = req.query.size ? +req.query.size : 10;
    const filterObj = JSON.parse(req.query.filter ? req.query.filter as string : "{}");
    for (const [key, value] of Object.entries(filterObj)) {
        filterObj[key] = new RegExp(value as string, "i");
    }
    try {
        const total = await City.countDocuments(filterObj);
        const cities = await City.find(filterObj)
            .skip((page - 1) * size)
            .limit(size)

            .exec();

        res.send({
            data: cities,
            page,
            size,
            total,
        });
    } catch (err) {
        next(err);
    }
});
