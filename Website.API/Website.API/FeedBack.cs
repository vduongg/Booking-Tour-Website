﻿namespace Website.API
{
    public class FeedBack
    {
        public int FeedbackId { get; set; }
        public string FeedbackDescription { get; set;}
        public User User { get; set; }
        public int UserId { get; set; }
        public Tour Tour { get; set; }
        public string TourId { get; set; }
    }
}