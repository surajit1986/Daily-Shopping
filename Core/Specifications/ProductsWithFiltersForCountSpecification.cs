using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParam specParams):
        base(x =>
            (!specParams.BrandId.HasValue|| x.ProductBrandId ==  specParams.BrandId) &&
            (!specParams.TypeId.HasValue|| x.ProductTypeId ==  specParams.TypeId)
        )
        {
            
        }
        
    }
}