// import {
//   Resolver,
//   Query,
//   Mutation,
//   Args,
//   ResolveField,
//   Parent,
// } from '@nestjs/graphql';

// import { ProductType } from '../types/product.type';
// import { CreateProductInput } from '../inputs/create-product.input';
// import { ProductService } from '../../product/product.service';
// import { CategoryType } from '../types/category.type';

// @Resolver(() => ProductType)
// export class ProductCodeFirstResolver {
//   constructor(
//     private readonly productService: ProductService,
//   ) {}

//   @Query(() => [ProductType])
//   products() {
//     return this.productService.findAll();
//   }

//   @Query(() => ProductType, { nullable: true })
//   product(@Args('id') id: number) {
//     return this.productService.findOne(Number(id));
//   }

//   @Mutation(() => ProductType)
//   createProduct(@Args('input') input: CreateProductInput) {
//     return this.productService.create(
//       input.name,
//       input.price,
//       Number(input.categoryId),
//     );
//   }

//   // ✅ FIXED HERE
//   @ResolveField(() => CategoryType, { nullable: true })
//   category(@Parent() product: any) {
//     return product.category;
//   }

//   @Query(() => [ProductType])
//   productsByCategory(@Args('categoryId') categoryId: number) {
//     return this.productService.findByCategory(Number(categoryId));
//   }

//   @Mutation(() => Boolean)
//   async deleteProduct(@Args('id') id: number) {
//     const result = await this.productService.remove(Number(id));
//     return result.affected ? true : false;
//   }
// }