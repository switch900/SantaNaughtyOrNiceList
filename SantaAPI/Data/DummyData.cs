using Microsoft.AspNetCore.Identity;
using SantaAPI.ViewModels;
using System;
using System.Threading.Tasks;

namespace SantaAPI.Data
{
    public class DummyData
    {
        public static async Task Initialize(ApplicationDbContext context,
                              UserManager<ApplicationUser> userManager,
                              RoleManager<ApplicationRole> roleManager)
        {
            context.Database.EnsureCreated();

            String adminId1 = "";
            String adminId2 = "";

            string role1 = "Admin";
            string desc1 = "This is the administrator role";

            string role2 = "Child";
            string desc2 = "This is the childs role";

            string password = "P@$$w0rd";

            if (await roleManager.FindByNameAsync(role1) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role1, desc1, DateTime.Now));
            }
            if (await roleManager.FindByNameAsync(role2) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role2, desc2, DateTime.Now));
            }

            if (await userManager.FindByNameAsync("santa") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "santa",
                    Email = "santa@np.com",
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
                adminId1 = user.Id;
            }

            if (await userManager.FindByNameAsync("tim") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "tim",
                    Email = "tim@np.com",
                    FirstName = "Bob",
                    LastName = "Roberts",
                    BirthDate = new DateTime(2010, 8, 18),
                    Street = "123 Easy St.",
                    City = "Vancouver",
                    PostalCode = "H0H 0H0",
                    Country = "Canada",
                    Latitude = 49,
                    Longitude = 123,
                    IsNaughty = true
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role2);
                }
                adminId2 = user.Id;
            }

            //    if (await userManager.FindByNameAsync("mm@mm.mm") == null)
            //    {
            //        var user = new ApplicationUser
            //        {
            //            UserName = "mm@mm.mm",
            //            Email = "mm@mm.mm",
            //            FirstName = "Mike",
            //            LastName = "Myers",
            //            Street = "Yew St",
            //            City = "Vancouver",
            //            Province = "BC",
            //            PostalCode = "V3U E2Y",
            //            Country = "Canada",
            //            PhoneNumber = "6572136821"
            //        };

            //        var result = await userManager.CreateAsync(user);
            //        if (result.Succeeded)
            //        {
            //            await userManager.AddPasswordAsync(user, password);
            //            await userManager.AddToRoleAsync(user, role2);
            //        }
            //    }

            //    if (await userManager.FindByNameAsync("dd@dd.dd") == null)
            //    {
            //        var user = new ApplicationUser
            //        {
            //            UserName = "dd@dd.dd",
            //            Email = "dd@dd.dd",
            //            FirstName = "Donald",
            //            LastName = "Duck",
            //            Street = "Well St",
            //            City = "Vancouver",
            //            Province = "BC",
            //            PostalCode = "V8U R9Y",
            //            Country = "Canada",
            //            PhoneNumber = "6041234567"
            //        };

            //        var result = await userManager.CreateAsync(user);
            //        if (result.Succeeded)
            //        {
            //            await userManager.AddPasswordAsync(user, password);
            //            await userManager.AddToRoleAsync(user, role2);
            //        }
            //    }
            //}
        }
        //public class DummyData
        //{
        //    public static async Task Initialize(ApplicationDbContext context,
        //                          UserManager<IdentityUser> userManager,
        //                          RoleManager<IdentityRole> roleManager)
        //    {
        //        context.Database.EnsureCreated();

        //        //String adminId1 = "";
        //        //String adminId2 = "";

        //        string role1 = "Admin";

        //        string role2 = "Child";

        //        string password = "P@$$w0rd";

        //        if (await roleManager.FindByNameAsync(role1) == null)
        //        {
        //            await roleManager.CreateAsync(role: new IdentityRole(role1));
        //        }
        //        if (await roleManager.FindByNameAsync(role2) == null)
        //        {
        //            await roleManager.CreateAsync(new IdentityRole(role2));
        //        }

        //        if (await userManager.FindByNameAsync("santa") == null)
        //        {
        //            var user = new ApplicationUser
        //            {
        //                UserName = "santa",
        //                Email = "santa@np.com",

        //            };

        //            var result = await userManager.CreateAsync(user);
        //            if (result.Succeeded)
        //            {
        //                await userManager.AddPasswordAsync(user, password);
        //                await userManager.AddToRoleAsync(user, role1);
        //            }
        //       //     adminId1 = user.Id;
        //        }

        //        if (await userManager.FindByNameAsync("tim") == null)
        //        {
        //            var user = new ApplicationUser
        //            {
        //                UserName = "tim",
        //                Email = "tim@np.com"
        //        ,
        //                FirstName = "Bob"
        //        ,
        //                LastName = "Roberts"
        //        ,
        //                BirthDate = new DateTime(2010, 8, 18)
        //        ,
        //                Street = "123 Easy St."
        //        ,
        //                City = "Vancouver"
        //        ,
        //                PostalCode = "H0H 0H0"
        //        ,
        //                Country = "Canada"
        //        ,
        //                Latitude = 49
        //        ,
        //                Longitude = 123
        //        ,
        //                IsNaughty = true

        //            };

        //            var result = await userManager.CreateAsync(user);
        //            if (result.Succeeded)
        //            {
        //                await userManager.AddPasswordAsync(user, password);
        //                await userManager.AddToRoleAsync(user, role2);
        //            }
        //       //     adminId2 = user.Id;
        //        }         
        //    }
        //}
    }
}
