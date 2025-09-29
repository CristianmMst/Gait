import { BrandService } from "./brandService";
import { Request, Response, NextFunction } from "express";

export class BrandController {
  private brandService = new BrandService();

  getBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brands = await this.brandService.getAll();
      res.json(brands);
    } catch (error) {
      next(error);
    }
  };

  getBrandById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const brand = await this.brandService.findById(Number(id));
      if (!brand) {
        return res.status(404).json({ message: "Marca no encontrada" });
      }
      res.json(brand);
    } catch (error) {
      next(error);
    }
  };
}
