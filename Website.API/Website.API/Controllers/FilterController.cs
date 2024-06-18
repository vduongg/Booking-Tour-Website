using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly DataContext _context;
        public FilterController(DataContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<Tour[]>> filterTour(FilterForm filterForm)
        {
            var listTour = await _context.Tours.ToListAsync();
            if(filterForm.place != "")
            {
               listTour =  listTour.Where(t=>t.TourPlace ==  filterForm.place).ToList();
            }
            if(filterForm.name != "")
            {
              listTour =  listTour.Where(t=>t.TourName.Contains(filterForm.name) ).ToList();
            }
            if(filterForm.departureDate  !=  "")
            {
                listTour = listTour.Where(t => t.DepartureDate.ToString().Split(' ')[0] == filterForm.departureDate).ToList();
         
            }
            if(filterForm.type.Count() > 0)
            {
                listTour = listTour.Where(t => filterForm.type.Contains((int)t.TourTypeId)).ToList();

            }
            if(filterForm.price != "")
            {
                if(filterForm.price == "lower5")
                {
                    listTour = listTour.Where(t => t.TourPrice < 5000000).ToList();
                }
                else if (filterForm.price == "lower10")
                {
                    listTour = listTour.Where(t => t.TourPrice < 10000000).ToList();
                }
                else if (filterForm.price == "higher5")
                {
                    listTour = listTour.Where(t => t.TourPrice > 5000000).ToList();
                }
                else if (filterForm.price == "higher10")
                {
                    listTour = listTour.Where(t => t.TourPrice > 10000000).ToList();
                }
                else if (filterForm.price == "between5and10")
                {
                    listTour = listTour.Where(t => t.TourPrice > 5000000 && t.TourPrice < 10000000).ToList();
                }
                else if (filterForm.price == "lower5 and higer10")
                {
                    listTour = listTour.Where(t => t.TourPrice < 5000000 || t.TourPrice > 10000000).ToList();
                }
            }

            return Ok(listTour);
        }

    }
}
