import { News } from "@/models/News";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    
    // if authenticated, connect to MongoDb
    await mongooseConnect();

    const {method} = req;

    if (method === 'POST') {
        const { 
            title,
            slug,
            images,
            description,
            newscategory,
            tags,
            status
        } = req.body;

        const newsDoc = await News.create({
            title,
            slug,
            images,
            description,
            newscategory,
            tags,
            status
        })
        res.json(newsDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await News.findById(req.query.id))
        } else {
            res.json((await News.find()).reverse())
        }
    }

    if (method === 'PUT') {
         const {
            _id,
            title,
            slug,
            images,
            description,
            newscategory,
            tags,
            status
         } = req.body;

         await News.updateOne({_id}, {
            title,
            slug,
            images,
            description,
            newscategory,
            tags,
            status
         });

         res.json(true)
    }

    if (method === 'DELETE') {
        if(req.query?.id) {
            await News.deleteOne({_id: req.query?.id})
            res.json(true)
        }
    }
}