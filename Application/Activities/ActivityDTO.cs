using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Comments;

namespace Application.Activities
{
    public class ActivityDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; } 
        public string City { get; set; } 
        public string Venue { get; set; } 

        [JsonPropertyName("attendees")]
        public ICollection<AttendeeDTO> UserActivities { get; set; }
        public ICollection<CommentDTO> Comments { get; set; }
    }
}