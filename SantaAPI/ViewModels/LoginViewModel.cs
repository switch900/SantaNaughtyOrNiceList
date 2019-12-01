using System.ComponentModel.DataAnnotations;

namespace SantaAPI.ViewModels
{
    public class LoginViewModel
    {
        [Key]
        public string Username { get; set; }
        public string Password { get; set; }

        public LoginViewModel() { }
    }
}
