using ChapterX.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Domain.Entities
{
    public class Chapter : IEntity
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int? WordCount { get; set; }
        public decimal? Rating { get; set; }
        public DateTime PublishedAt { get; set; }
        public int ViewCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public int StoryId { get; set; }
        public Story Story { get; set; } = null!;
        public ICollection<NeedApproval> NeedApprovals { get; set; } = [];

    }
}
