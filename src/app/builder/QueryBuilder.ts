import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // search query
  search(searchableField: string[]) {
    const searchTerm = this?.query?.searchTerm as string;
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableField.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // sort query
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';

    this.queryModel = this.queryModel.sort(sort as string);
    return this;
  }

  // paginate query
  paginate() {
    const limit = Number(this?.query?.limit);
    const page = Number(this?.query?.page);
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  async countTotal() {
    const totalQueries = this.queryModel.getFilter();
    const totalData = await this.queryModel.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page);
    const limit = Number(this?.query?.limit);
    const totalPage = Math.ceil(totalData / limit);

    return {
      page,
      limit,
      totalData,
      totalPage,
    };
  }
}

export default QueryBuilder;
