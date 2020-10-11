using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using AutoMapper;
using API.Dtos;
using API.Helpers;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepo,
        IGenericRepository<ProductType> productTypeRepo, IGenericRepository<ProductBrand> productBrandRepo,
        IMapper mapper)
        {
            _mapper = mapper;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _productRepo = productRepo;

        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParam prodParams)
        {
            var spec = new ProductsWithTypesAndBrands(prodParams);

            var countSpec = new ProductsWithFiltersForCountSpecification(prodParams);

            var totalItems = await _productRepo.CountAsync(countSpec);
             var products = await _productRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products);

           
            return Ok(new Pagination<ProductToReturnDto>(
                prodParams.PageIndex,
                prodParams.PageSize,
                totalItems,
                data
            ));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> Getproduct(int id)
        {
            var spec = new ProductsWithTypesAndBrands(id);
            var product = await _productRepo.GetEntityWithSpec(spec);
            return _mapper.Map<Product,ProductToReturnDto>(product);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetTypes()
        {
            var types = await _productTypeRepo.ListAsync();
            return Ok(types);

        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            var brands = await _productBrandRepo.ListAsync();
            return Ok(brands);

        }


    }
}