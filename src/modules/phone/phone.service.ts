import QueryBuilder from '../../app/builder/QueryBulder';
import { Phone } from './phone.interface';
import { PhoneModel } from './phone.model';

const createPhoneIntoDB = async (phone: Phone) => {
  const result = await PhoneModel.create(phone);
  return result;
};

// get all phone
// Get all phone with filtering, searching, sorting, and pagination
const getAllPhoneFromDB = async (query: Record<string, unknown>) => {
  const modelQuery = PhoneModel.find(); // Start with a basic query

  const queryBuilder = new QueryBuilder<Phone>(modelQuery, query)
    .search(['brand', 'name', 'category']) // Search in name, brand, and model
    .filter()
    .sort()
    .paginate()
    .fields();

  const phones = await queryBuilder.modelQuery;
  const totalInfo = await queryBuilder.countTotal();

  return { phones, ...totalInfo };
};
const getFilteredPhonesFromDB = async (
  query: any,
  pageSize: number,
  skip: number,
  sortOptions: any,
) => {
  const phones = await PhoneModel.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize);

  return phones;
};

const getTotalPhonesCount = async (query: any) => {
  return await PhoneModel.countDocuments(query);
};

// get single phone
const getSinglePhoneFromDB = async (id: string) => {
  const result = await PhoneModel.findById(id);
  return result;
};

// update single phone
const getSinglePhoneAndUpdateFromDB = async (
  id: string,
  updatedData: Partial<Phone>,
) => {
  const result = await PhoneModel.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete single phone
const getSinglePhoneAndDeleteFromDB = async (id: string) => {
  const result = await PhoneModel.findByIdAndDelete(id);
  return result;
};

export const PhoneServices = {
  createPhoneIntoDB,
  getAllPhoneFromDB,
  getSinglePhoneFromDB,
  getFilteredPhonesFromDB,
  getTotalPhonesCount,
  getSinglePhoneAndUpdateFromDB,
  getSinglePhoneAndDeleteFromDB,
};
