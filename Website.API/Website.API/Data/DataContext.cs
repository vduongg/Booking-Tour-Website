using Microsoft.EntityFrameworkCore;
using Website.API.Models;

namespace Website.API.Data
{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options ) : base(options)
        { }    
        public DbSet<User> Users { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<Policy> Policy { get; set; }
        public DbSet<WishList> WishList { get; set; }
        public DbSet<FeedBack> FeedBacks { get; set; }
        public DbSet<TourDate> TourDate { get; set; }
        public DbSet<TourType> TourType { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
