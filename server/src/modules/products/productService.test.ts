jest.mock("@/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

import { AppDataSource } from "@/database";
import { Product } from "./productModel";
import { ProductService } from "./productService";

describe("ProductService.getAll", () => {
  let mockFind: jest.Mock;
  let service: ProductService;

  beforeEach(() => {
    mockFind = jest.fn();
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      find: mockFind,
    });
    service = new ProductService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("retorna todos los productos sin filtros", async () => {
    const mockProducts = [
      { id: 1, name: "Bota industrial", price: 2500 },
      { id: 2, name: "Zapato de seguridad", price: 3000 },
    ] as Product[];

    mockFind.mockResolvedValue(mockProducts);

    const result = await service.getAll();

    expect(mockFind).toHaveBeenCalledWith({
      where: {},
      relations: ["brand", "category"],
    });
    expect(result).toEqual(mockProducts);
  });

  it("filtra productos por categoryId", async () => {
    const mockProducts = [
      { id: 1, name: "Bota industrial", price: 2500, category: { id: 1 } },
    ] as Product[];

    mockFind.mockResolvedValue(mockProducts);

    const result = await service.getAll({ categoryId: 1 });

    expect(mockFind).toHaveBeenCalledWith({
      where: { category: { id: 1 } },
      relations: ["brand", "category"],
    });
    expect(result).toEqual(mockProducts);
  });

  it("filtra productos por brandId", async () => {
    const mockProducts = [
      { id: 1, name: "Bota industrial", price: 2500, brand: { id: 2 } },
    ] as Product[];

    mockFind.mockResolvedValue(mockProducts);

    const result = await service.getAll({ brandId: 2 });

    expect(mockFind).toHaveBeenCalledWith({
      where: { brand: { id: 2 } },
      relations: ["brand", "category"],
    });
    expect(result).toEqual(mockProducts);
  });

  it("filtra productos por rango de precio (minPrice y maxPrice)", async () => {
    const mockProducts = [
      { id: 1, name: "Bota industrial", price: 2500 },
    ] as Product[];

    mockFind.mockResolvedValue(mockProducts);

    const result = await service.getAll({ minPrice: 1000, maxPrice: 5000 });

    expect(mockFind).toHaveBeenCalledWith({
      where: { price: expect.anything() },
      relations: ["brand", "category"],
    });
    expect(result).toEqual(mockProducts);
  });

  it("filtra productos con solo minPrice", async () => {
    const mockProducts = [
      { id: 1, name: "Bota industrial", price: 2500 },
    ] as Product[];

    mockFind.mockResolvedValue(mockProducts);

    const result = await service.getAll({ minPrice: 2000 });

    expect(mockFind).toHaveBeenCalledWith({
      where: { price: expect.anything() },
      relations: ["brand", "category"],
    });
    expect(result).toEqual(mockProducts);
  });

  it("filtra productos con solo maxPrice", async () => {
    const mockProducts = [
      { id: 2, name: "Zapato de seguridad", price: 3000 },
    ] as Product[];

    mockFind.mockResolvedValue(mockProducts);

    const result = await service.getAll({ maxPrice: 4000 });

    expect(mockFind).toHaveBeenCalledWith({
      where: { price: expect.anything() },
      relations: ["brand", "category"],
    });
    expect(result).toEqual(mockProducts);
  });
});