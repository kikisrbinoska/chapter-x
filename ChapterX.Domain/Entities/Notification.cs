using ChapterX.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Domain.Entities
{
    public class Notification : IEntity
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? RecipientUserId { get; set; }
        public string? Type { get; set; }
        public string? Link { get; set; }

        public ICollection<ContentType> ContentTypes { get; set; } = [];
        public ICollection<Notify> Notifies { get; set; } = [];

    }
}
