
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Entities;
using Server.Models;
using Server.utils;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
         private readonly UserDbContext _context;

        public UserController(UserDbContext context)
        {
            _context = context;
        }


        [HttpGet] 
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers() 
        {
            try
            {
            var users = await _context.Users.ToListAsync();
            return Ok(users); 
                
            }
            catch (Exception)
            {
                
                throw new Exception("Algo salió mal");
            }
        }

        [HttpGet("{id:int}")] 
        public async Task<ActionResult<IEnumerable<User>>> GetUser(int id) 
        {
            try
            {
            var user = await _context.Users.FindAsync(id);
            return Ok(user); 
                
            }
            catch (Exception)
            {
                
                return NotFound();
            }
        }

         [HttpPost] 
        public async Task <ActionResult<User>> PostUser (User user) {
            if (!validRut.IsValidRUT(user.rut) || !Regex.IsMatch(user.name, @"^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$")
                || !Regex.IsMatch(user.lastName, @"^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$") || !Regex.IsMatch(user.dateOfBirth, @"^\d{4}-\d{2}-\d{2}$")
                || !Regex.IsMatch(user.email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$") || user.phone.Length != 9 
                || int.TryParse(user.dateOfBirth.Split('-')[0], out int birthYear) && birthYear > DateTime.Now.Year
             ) 
             {
                throw new Exception("Datos invalido");
             }

             var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.rut == user.rut);

             if (existingUser != null) {
                 return Conflict("El RUT ya está registrado.");
             }


             try
             {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok();
             }
             catch (Exception)
             {
                
                throw new Exception("Algo falló");
             }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteUser (int id) {

            var user = await _context.Users.FindAsync(id);

            if (user == null) {
                return NotFound();
            }

             _context.Users.Remove(user);

             try
             {
                await _context.SaveChangesAsync();
                return Ok(); 
             }
             catch (System.Exception)
             {
                
                return StatusCode(500, "Algo falló al eliminar el usuario");
             }

        }



        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateUser (int id, [FromBody] User updatedUser) 
        {

             var user = await _context.Users.FindAsync(id);

             if (user == null) {
                return NotFound();
             }

                if (!validRut.IsValidRUT(updatedUser.rut) || !Regex.IsMatch(updatedUser.name, @"^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$")
                || !Regex.IsMatch(updatedUser.lastName, @"^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$") || !Regex.IsMatch(updatedUser.dateOfBirth, @"^\d{4}-\d{2}-\d{2}$")
                || !Regex.IsMatch(updatedUser.email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$") || updatedUser.phone.Length != 9 
                || int.TryParse(updatedUser.dateOfBirth.Split('-')[0], out int birthYear) && birthYear > DateTime.Now.Year
             ) 
             {
                throw new Exception("Datos invalido");
             }

             try
             {
                user.rut = updatedUser.rut;
                user.name = updatedUser.name;
                user.lastName = updatedUser.lastName;
                user.dateOfBirth = updatedUser.dateOfBirth;
                user.email = updatedUser.email;
                user.phone = updatedUser.phone;
                await _context.SaveChangesAsync();
                 return Ok();
             }
             catch (Exception)
             {
                
                throw new Exception("Algo salió mal");
             }

        }



    }
}