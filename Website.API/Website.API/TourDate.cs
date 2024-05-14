﻿using System.ComponentModel.DataAnnotations;

namespace Website.API
{
    public class TourDate
    {
        [Key]
        public int Id { get; set; }
        public int Day { get; set; }
        public int Night { get; set; }
    }
}
