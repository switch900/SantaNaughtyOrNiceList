using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SantaAPI.Data;
using SantaAPI.ViewModels;

namespace SantaAPI.Controllers
{
    [EnableCors("HealthPolicy")]
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class SantaListsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SantaListsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: SantaLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetSantaList()
        {
            return await _context.SantaList.ToListAsync();
        }

        // GET: api/SantaLists/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<ApplicationUser>> GetSantaList(string id)
        {
            var santaList = await _context.SantaList.FindAsync(id);

            if (santaList == null)
            {
                return NotFound();
            }

            return santaList;
        }

        // PUT: SantaLists/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [EnableCors("HealthPolicy")]
        [HttpPut("{id}")]      
        public async Task<IActionResult> PutSantaList(string id, [FromBody] ApplicationUser santaList)
        {
            if (id != santaList.Id)
            {
                System.Console.WriteLine("Hello");
                return BadRequest();
            }

            _context.Entry(santaList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SantaListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: SantaLists
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> PostSantaList(ApplicationUser santaList)
        {
            _context.SantaList.Add(santaList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSantaList", new { id = santaList.Id }, santaList);
        }

        // DELETE: api/SantaLists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApplicationUser>> DeleteSantaList(string id)
        {
            var santaList = await _context.SantaList.FindAsync(id);
            if (santaList == null)
            {
                return NotFound();
            }

            _context.SantaList.Remove(santaList);
            await _context.SaveChangesAsync();

            return santaList;
        }

        private bool SantaListExists(string id)
        {
            return _context.SantaList.Any(e => e.Id == id);
        }
    }
}
