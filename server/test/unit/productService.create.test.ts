jest.mock("@/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

import { AppDataSource } from "@/database";
import { Product } from "../../src/modules/products/productModel";
import { ProductService } from "../../src/modules/products/productService";

describe("ProductService.create", () => {
  let mockCreate: jest.Mock;
  let mockSave: jest.Mock;
  let service: ProductService;

  beforeEach(() => {
    mockCreate = jest.fn();
    mockSave = jest.fn();
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      create: mockCreate,
      save: mockSave,
    });
    service = new ProductService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("crea un producto con todos los campos requeridos", async () => {
    const productData = {
      name: "Bota industrial",
      price: 2500,
      discount: 10,
      description: "Bota de seguridad industrial",
      stock: 50,
      image: "https://example.com/bota.jpg",
    };

    const mockProduct = { id: 1, ...productData } as Product;

    mockCreate.mockReturnValue(productData);
    mockSave.mockResolvedValue(mockProduct);

    const result = await service.create(productData);

    expect(mockCreate).toHaveBeenCalledWith(productData);
    expect(mockSave).toHaveBeenCalledWith(productData);
    expect(result).toEqual(mockProduct);
  });

  it("crea un producto sin imagen (elimina el campo vacio)", async () => {
    const productData = {
      name: "Bota industrial",
      price: 2500,
      discount: 10,
      description: "Bota de seguridad industrial",
      stock: 50,
      image: "",
    };

    const mockProduct = {
      id: 1,
      name: "Bota industrial",
      price: 2500,
      discount: 10,
      description: "Bota de seguridad industrial",
      stock: 50,
    } as Product;

    mockCreate.mockImplementation((data) => data);
    mockSave.mockResolvedValue(mockProduct);

    const result = await service.create(productData);

    expect(mockCreate).toHaveBeenCalledWith({
      name: "Bota industrial",
      price: 2500,
      discount: 10,
      description: "Bota de seguridad industrial",
      stock: 50,
    });
    expect(result).toEqual(mockProduct);
  });

  it("crea un producto con valores minimos", async () => {
    const productData = {
      name: "Zapato simple",
      price: 1500,
    };

    const mockProduct = {
      id: 2,
      name: "Zapato simple",
      price: 1500,
      discount: 0,
      description: "",
      stock: 0,
    } as Product;

    mockCreate.mockImplementation((data) => data);
    mockSave.mockResolvedValue(mockProduct);

    const result = await service.create(productData);

    expect(mockCreate).toHaveBeenCalledWith({
      name: "Zapato simple",
      price: 1500,
    });
    expect(mockSave).toHaveBeenCalled();
    expect(result).toEqual(mockProduct);
  });
});