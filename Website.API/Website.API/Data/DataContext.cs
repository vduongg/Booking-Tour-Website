using Microsoft.EntityFrameworkCore;

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
    }
}
