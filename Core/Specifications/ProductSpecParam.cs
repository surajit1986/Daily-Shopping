namespace Core.Specifications
{
    public class ProductSpecParam
    {
        private const int Max_Size = 50;
        public int PageIndex {get;set;} = 1;
        private int _pageSize = 6;
        public int PageSize {
            get => _pageSize;
            set => _pageSize = (value > Max_Size) ? Max_Size : value;
        }
        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort {get; set;}


    }
}