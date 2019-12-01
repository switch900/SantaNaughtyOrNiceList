using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace SantaAPI.ViewModels
{
    public class ApplicationUser : IdentityUser
    {
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public bool IsNaughty { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;       
    }
}
