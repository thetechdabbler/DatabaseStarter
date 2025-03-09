"use server"

import { prisma } from "@/lib/prisma";
import { Image } from "@prisma/client";

interface CreateProductInput {
    name: string;
    description: string;
    price: number;
    category: string;
    images? : string[];
}

export async function createProduct(input:CreateProductInput) {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: input.name,
                description: input.description,
                price: input.price,
                category: input.category,
                images: {
                    create: input.images?.map((url) => ({ url })),
                }
            }
        })
    
        return newProduct
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Error creating product");
    }
   
}


export async function getProductById(id:number) {
    try {
        const product = await prisma.product.findUnique({
          where: { id },
        });
        return product;
      } catch (error) {
        return null;
      }
}