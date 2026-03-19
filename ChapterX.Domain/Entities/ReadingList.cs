using ChapterX.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Domain.Entities
{
    public class ReadingList : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Content { get; set; }
        public bool IsPublic { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public ICollection<ReadingListItems> ReadingListItems { get; set; } = [];

    }
}
