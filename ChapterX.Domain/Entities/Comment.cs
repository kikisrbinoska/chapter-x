using ChapterX.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Domain.Entities
{
    public class Comment : IEntity
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }


        public int UserId { get; set; }
        public int StoryId { get; set; }
        public User User { get; set; } = null!;
        public Story Story { get; set; } = null!;
    }
}
