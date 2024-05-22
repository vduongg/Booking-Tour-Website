using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourImageController : ControllerBase
    {
        private readonly DataContext _context;

        public TourImageController(DataContext context) { _context = context; }

        [HttpGet("{id}")]
        public async Task<ActionResult> getImage(int id)
        {
            
            var listImage = await _context.Images.Where(i => i.TourId == id).ToListAsync();
            List<Image> images = new List<Image>();
            foreach (var img in listImage)
            {
                byte[] imageByte = System.IO.File.ReadAllBytes(img.ImageURL);
                string base64toString = Convert.ToBase64String(imageByte);
                var newImg = new Image();
                newImg.ImageId = img.ImageId;
                newImg.TourId = img.TourId;
                newImg.ImageURL = "data:image/jpeg;base64," + base64toString;
                images.Add(newImg);
            }


            return Ok(images);
        }
        [HttpPost("{id}")]
        public async Task<ActionResult> addImage(int id ,IFormFile file)
        {
      
            if (file == null || file.Length == 0)
                return BadRequest("Invalid file.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images", "TourImg_" + id);
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName =  file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var image = new Image();
            image.ImageURL = filePath;
            image.TourId = id;
             _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();


            return Ok(image);
        }
        [HttpDelete("deleteAllImage/{id}")]
        public async Task<ActionResult> deleteAllImage(int id)
        {
            var listImage = await _context.Images.Where(i => i.TourId == id).ToListAsync();
            
           for (int i = 0; i< listImage.Count() ; i++)
            {

                _context.Images.Remove(listImage[i]);
               await _context.SaveChangesAsync();
            }

            return Ok();

           
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteImage(int id)
        {

            var image = await _context.Images.FindAsync(id);
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
            

            return Ok(new {message = "Delete Successed!"});
        }

    }
    
}
