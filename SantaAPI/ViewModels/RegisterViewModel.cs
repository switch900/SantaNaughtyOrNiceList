using System.ComponentModel.DataAnnotations;

namespace SantaAPI.ViewModels
{
    public class RegisterViewModel
    {
        [Key]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
