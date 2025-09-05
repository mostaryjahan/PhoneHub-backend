import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: {
                $regex: searchTerm,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    // const queryObj = { ...this.query };
    // // filtering
    // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    // excludeFields.forEach((field) => delete queryObj[field]);

    // this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    // return this;

    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);

    const filterQuery: Record<string, any> = {};

    // Handle price range filtering
    if (queryObj.price && typeof queryObj.price === 'object') {
      const priceFilter: Record<string, number> = {};

      if ('gte' in queryObj.price && queryObj.price.gte) {
        priceFilter.$gte = Number(queryObj.price.gte);
      }

      if ('lte' in queryObj.price && queryObj.price.lte) {
        priceFilter.$lte = Number(queryObj.price.lte);
      }

      if (Object.keys(priceFilter).length > 0) {
        filterQuery.price = priceFilter;
      }
    }

    // Handle category filtering (Ignore if "All Categories" is selected)
    if (queryObj.category && queryObj.category !== 'all') {
      filterQuery.category = queryObj.category;
    }

    // Handle inStock filtering (convert to Boolean)
    if (queryObj.inStock !== undefined) {
      filterQuery.inStock = queryObj.inStock === 'true';
    }

    this.modelQuery = this.modelQuery.find({
      ...filterQuery,
    } as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-_v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = {
      ...this.modelQuery.getFilter(),
      isDeleted: { $ne: true }, // Exclude deleted documents
    };
    const total = await this.modelQuery.model.countDocuments(totalQueries);

    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      totalPages,
      total,
    };
  }
}

export default QueryBuilder;
