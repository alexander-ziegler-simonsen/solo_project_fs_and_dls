// src/services/item.service.ts
import { Item } from '../entities/Item';
import { MongodbDataSource } from '../DataSources';
import { RequestHandler } from 'express';

interface Body {
    name?: string;
    minPrice: string;
    maxPrice: string;
}

type searchResponse = { data: Item[] } | { error: string };


export const searchHandler: RequestHandler<
    {},                 // no URL params
    searchResponse,    // response body
    {},                // no req.body
    Body               // req.query
> = async (req, res, next) => {
    try {
        const { name, minPrice, maxPrice } = req.query;
        // check if any of the 3 are missing
        if (!name || !minPrice || !maxPrice) {
            res
                .status(400)
                .json({ error: 'name, minPrice and maxPrice are all required' });
            return;
        }

        const min = Number(minPrice);
        const max = Number(maxPrice);
        // check if they are not numbers
        if (isNaN(min) || isNaN(max)) {
            res
                .status(400)
                .json({ error: 'minPrice and maxPrice must be valid numbers' });
            return;
        }

        const items = await searchItemsByNameAndPrice(name, min, max);
        res.json({ data: items });
        return;
    } catch (err) {
        next(err);
        return;
    }
}

export async function searchItemsByNameAndPrice(
    name: string,
    minPrice: number,
    maxPrice: number
): Promise<Item[]> {
    const repo = MongodbDataSource.getMongoRepository(Item);
    return repo.find({
        where: {
            name,
            price: { $gte: minPrice, $lte: maxPrice },
        },
    });
}