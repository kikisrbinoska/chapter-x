using ChapterX.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Domain.Entities
{
    public class Story : IEntity
    {
        public int Id { get; set; }
        public bool MatureContent { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string? Image { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public int UserId { get; set; }
        public Writer Writer { get; set; } = null!;
        public ICollection<Status> Statuses { get; set; } = [];
        public ICollection<Chapter> Chapters { get; set; } = [];
        public ICollection<HasGenre> HasGenres { get; set; } = [];
        public ICollection<Likes> Likes { get; set; } = [];
        public ICollection<Comment> Comments { get; set; } = [];
        public ICollection<Collaboration> Collaborations { get; set; } = [];
        public ICollection<AISuggestion> AISuggestions { get; set; } = [];
        public ICollection<Notify> Notifies { get; set; } = [];
        public ICollection<ReadingListItems> ReadingListItems { get; set; } = [];
        public ICollection<NeedApproval> NeedApprovals { get; set; } = [];

    }
}
