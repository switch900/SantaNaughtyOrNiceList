using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SantaAPI.ViewModels;
using System;

namespace SantaAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                 : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region "Seed Data"

            builder.Entity<IdentityRole>().HasData(
                new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
                new { Id = "2", Name = "Child", NormalizedName = "CHILD" }
            );

            #endregion

           // builder.Entity<SantaList>().HasData(
           // new
           // {
           //     Id = 1
           // ,
           //     FirstName = "Bob"
           // ,
           //     LastName = "Roberts"
           // ,
           //     BirthDate = new DateTime(2010, 8, 18)
           // ,
           //     Street = "123 Easy St."
           // ,
           //     City = "Vancouver"
           // ,
           //     PostalCode = "H0H 0H0"
           // ,
           //     Country = "Canada"
           // ,
           //     Latitude = 49
           // ,
           //     Longitude = 123
           // ,
           //     IsNaughty = true
           // ,
           //     DateCreated = new DateTime(2010, 8, 18)
           // },
           // new
           // {
           //     Id = 2
           // ,
           //     FirstName = "Alice"
           // ,
           //     LastName = "Dog"
           // ,
           //     BirthDate = new DateTime(2010, 8, 18)
           // ,
           //     Street = "123 Easy St."
           // ,
           //     City = "Vancouver"
           // ,
           //     PostalCode = "H0H 0H0"
           // ,
           //     Country = "Canada"
           // ,
           //     Latitude = 49
           // ,
           //     Longitude = 123
           // ,
           //     IsNaughty = true
           // ,
           //     DateCreated = new DateTime(2010, 8, 18)
           // },
           // new
           // {
           //     Id = 3
           // ,
           //     FirstName = "Gypsy"
           // ,
           //     LastName = "Dog"
           // ,
           //     BirthDate = new DateTime(2010, 8, 18)
           // ,
           //     Street = "123 Easy St."
           // ,
           //     City = "Vancouver"
           // ,
           //     PostalCode = "H0H 0H0"
           // ,
           //     Country = "Canada"
           // ,
           //     Latitude = 49
           // ,
           //     Longitude = 123
           // ,
           //     IsNaughty = true
           // ,
           //     DateCreated = new DateTime(2010, 8, 18)
           // },
           // new
           // {
           //     Id = 4
           // ,
           //     FirstName = "Felix"
           // ,
           //     LastName = "Cat"
           // ,
           //     BirthDate = new DateTime(2010, 8, 18)
           // ,
           //     Street = "123 Easy St."
           // ,
           //     City = "Vancouver"
           // ,
           //     PostalCode = "H0H 0H0"
           // ,
           //     Country = "Canada"
           // ,
           //     Latitude = 49
           // ,
           //     Longitude = 123
           // ,
           //     IsNaughty = true
           // ,
           //     DateCreated = new DateTime(2010, 8, 18)
           // },
           // new
           // {
           //     Id = 5
           // ,
           //     FirstName = "Mike"
           // ,
           //     LastName = "Holmes"
           // ,
           //     BirthDate = new DateTime(2010, 8, 18)
           // ,
           //     Street = "123 Easy St."
           // ,
           //     City = "Vancouver"
           // ,
           //     PostalCode = "H0H 0H0"
           // ,
           //     Country = "Canada"
           // ,
           //     Latitude = 49
           // ,
           //     Longitude = 123
           // ,
           //     IsNaughty = true
           // ,
           //     DateCreated = new DateTime(2010, 8, 18)
           // }
           //);
        }

        public DbSet<ApplicationUser> SantaList { get; set; }
    }
}


