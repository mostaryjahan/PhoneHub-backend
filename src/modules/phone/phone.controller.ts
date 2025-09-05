import { Request, Response } from "express";
import { PhoneServices } from "./phone.service";

const createPhone = async(req:Request, res:Response)=>{

    try {
        const phoneData  = req.body;

    // will call service function to send this data
    const result = await PhoneServices.createPhoneIntoDB(phoneData);

    // send response
    res.status(200).json({
        success:true,
        message:'Phone is created successfully',
        data:result
    })
    } catch (err) {
        console.log(err);
    }
}

const getAllPhone = async (req: Request, res: Response) => {
    try {
      const { search, brand, category, model, priceMin, priceMax, availability, sortBy, sortOrder, limit, page } = req.query;
  
      // Build the query object
      const query: any = {};
  
      if (search) {
        query.$or = [
          { brand: { $regex: search, $options: "i" } },
          { model: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ];
      }
  
      if (brand) query.brand = brand;
      if (category) query.category = category;
      if (model) query.model = model;
      if (priceMin) query.price = { ...query.price, $gte: parseFloat(priceMin as string) };
      if (priceMax) query.price = { ...query.price, $lte: parseFloat(priceMax as string) };
      if (availability) query.inStock = availability === "true";
  
      // Pagination
      const pageNumber = parseInt(page as string) || 1;
      const pageSize = parseInt(limit as string) || 10;
      const skip = (pageNumber - 1) * pageSize;
  
      // Sorting
      const sortOptions: any = {};
      if (sortBy) sortOptions[sortBy as string] = sortOrder === "desc" ? -1 : 1;
  
      // Fetch data
      const phones = await PhoneServices.getFilteredPhonesFromDB(query, pageSize, skip, sortOptions);
      const totalPhones = await PhoneServices.getTotalPhonesCount(query);
  
      res.status(200).json({
        success: true,
        message: "Phones retrieved successfully",
        data: phones,
        total: totalPhones,
        page: pageNumber,
        limit: pageSize,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

// get single phone
const getSinglePhone = async(req:Request,res:Response)=>{
    try {
        const { phoneId } = req.params;
        const result = await PhoneServices.getSinglePhoneFromDB(phoneId)

        res.status(200).json({
            success:true,
            message:'phone retrieved successfully',
            data:result
        })
    } catch (err) {
        console.log(err)
    }
}
// get delete single phone
const updateSinglePhone = async(req:Request,res:Response)=>{
    try {
        const { phoneId } = req.params;
        const updateData = req.body;

        const result = await PhoneServices.getSinglePhoneAndUpdateFromDB(phoneId, updateData)

        res.status(200).json({
            success:true,
            message:'phone updated successfully',
            data:result
        })
    } catch (err) {
        console.log(err)
    }
}

// get delete single phone
const deleteSinglePhone = async(req:Request,res:Response)=>{
    try {
        const { phoneId } = req.params;
        const result = await PhoneServices.getSinglePhoneAndDeleteFromDB(phoneId)

        res.status(200).json({
            success:true,
            message:'phone deleted successfully',
            data:result
        })
    } catch (err) {
        console.log(err)
    }
}
export const PhoneControllers ={
    createPhone,
    getAllPhone,
    getSinglePhone,
    updateSinglePhone,
    deleteSinglePhone
}