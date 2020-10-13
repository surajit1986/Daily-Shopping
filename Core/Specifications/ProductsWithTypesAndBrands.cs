using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrands : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrands(ProductSpecParam specParams):
        base(x =>
            (string.IsNullOrEmpty(specParams.Search)|| x.Name.ToLower().Contains(specParams.Search)) &&
            (!specParams.BrandId.HasValue|| x.ProductBrandId ==  specParams.BrandId) &&
            (!specParams.TypeId.HasValue|| x.ProductTypeId ==  specParams.TypeId)
        )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(specParams.PageSize * (specParams.PageIndex -1), specParams.PageSize);

            if(!string.IsNullOrEmpty(specParams.Sort)){
                switch(specParams.Sort){
                    case "priceAsc":
                        AddOrderBy( x => x.Price);
                        break;

                    case "priceDesc":
                        AddOrderByDescending(x => x.Price);
                        break;
                    
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }
            }
           
        }

        public ProductsWithTypesAndBrands(int id) : base(x => x.Id ==id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}