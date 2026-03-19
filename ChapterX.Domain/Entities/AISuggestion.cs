using ChapterX.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChapterX.Domain.Entities
{
    public class AISuggestion : IEntity
    {
        public int Id { get; set; }
        public string OriginalText { get; set; } = string.Empty;
        public string SuggestedText { get; set; } = string.Empty;
        public bool Accepted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? AppliedAt { get; set; }

        public int StoryId { get; set; }
        public Story Story { get; set; } = null!;
        public ICollection<SuggestionType> SuggestionTypes { get; set; } = [];
        public ICollection<NeedApproval> NeedApprovals { get; set; } = [];

    }
}
