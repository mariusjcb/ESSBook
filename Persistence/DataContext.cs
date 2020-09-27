using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            builder.Entity<Value>()
                .HasData (
                    new Value { Id = 1, Name = "Demo 1" },
                    new Value { Id = 2, Name = "Demo 2" },
                    new Value { Id = 3, Name = "Demo 3" }
                );
        }
    }
}