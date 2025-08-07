// src/services/item.service.ts
import { Item } from '../entities/Item';
import { MongodbDataSource } from '../DataSources';
import { RequestHandler } from 'express';

interface EnhancedQuery {
    page?: string;
    limit?: string;
    fk_group_id?: string;
    minPrice?: string;
    maxPrice?: string;
    order?: 'price_asc' | 'price_desc';
    search?: string;
}

interface SearchQuery {
    name?: string;
    minPrice: string;
    maxPrice: string;
}

interface PaginatedResponse<Item> {
    data: Item[];
    page: number;
    limit: number;
    total: number;
    pages: number;
}

type searchResponse = { data: Item[] } | { error: string };


export const getResultsHandler: RequestHandler<
    {},                                      // no URL params
    PaginatedResponse<Item> | { error: string }, // response body
    {},                                      // no req.body
    EnhancedQuery                            // req.query
> = async (req, res, next) => {
    try {
        // 1) PAGINATION
        const pageRaw = parseInt(req.query.page || '1', 10);
        const limitRaw = parseInt(req.query.limit || '20', 10);
        const page = isNaN(pageRaw) || pageRaw < 1 ? 1 : pageRaw;
        const limit = isNaN(limitRaw) || limitRaw < 1 ? 20 : Math.min(limitRaw, 100);

        // 2) Build filter object
        const filter: any = {};

        // 2a) fk_group_id filter
        if (req.query.fk_group_id !== undefined) {
            const gid = parseInt(req.query.fk_group_id, 10);
            if (isNaN(gid)) {
                res.status(400).json({ error: 'fk_group_id must be a number' });
                return;
            }
            filter.fk_group_id = gid;
        }

        // 2b) price range filter
        const priceFilter: any = {};
        if (req.query.minPrice !== undefined) {
            const min = Number(req.query.minPrice);
            if (isNaN(min)) {
                res.status(400).json({ error: 'minPrice must be a number' });
                return;
            }
            priceFilter.$gte = min;
        }
        if (req.query.maxPrice !== undefined) {
            const max = Number(req.query.maxPrice);
            if (isNaN(max)) {
                res.status(400).json({ error: 'maxPrice must be a number' });
                return;
            }
            priceFilter.$lte = max;
        }
        if (Object.keys(priceFilter).length) {
            filter.price = priceFilter;
        }

        // 2c) title text search
        if (req.query.search) {
            // 1) escape any regex‐special chars the user may send
            const escapeRegExp = (s: string) =>
                s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            const term = escapeRegExp(req.query.search.trim());

            // 2) build an “anywhere” regex (no ^ or $ anchors)
            filter.name = new RegExp(term, 'i');
        }

        // 3) Choose sort order
        let order: Record<string, 'ASC' | 'DESC'> = { date: 'DESC' };
        if (req.query.order === 'price_asc') order = { price: 'ASC' };
        if (req.query.order === 'price_desc') order = { price: 'DESC' };

        // 4) Repository and counts
        const repo = MongodbDataSource.getMongoRepository(Item);
        const total = await repo.count({ where: filter });
        const skip = (page - 1) * limit;

        // 5) Fetch page
        const data = await repo.find({
            where: filter,
            skip,
            take: limit,
            order,
        });

        // 6) Send result (void return)
        res.json({
            data,
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        });
        return;
    } catch (err) {
        next(err);
        return;
    }
};

export const searchHandler: RequestHandler<
    {},                 // no URL params
    searchResponse,    // response body
    {},                // no req.body
    SearchQuery        // req.query
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
    // a case‑insensitive regex that matches your substring
    const nameRegex = new RegExp(name, 'i');
    const repo = MongodbDataSource.getMongoRepository(Item);
    return repo.find({
        where: {
            name: { $regex: nameRegex },
            price: { $gte: minPrice, $lte: maxPrice },
        },
    });
}