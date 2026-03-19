namespace ChapterX.API.DTOs
{
    public class AISuggestionDto
    {
        public int Id { get; set; }
        public string OriginalText { get; set; } = string.Empty;
        public string SuggestedText { get; set; } = string.Empty;
        public bool Accepted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? AppliedAt { get; set; }

        // FK
        public int StoryId { get; set; }

        // Navigation
        public StoryDto Story { get; set; } = null!;
        public ICollection<SuggestionTypeDto> SuggestionTypes { get; set; } = [];
        public ICollection<NeedApprovalDto> NeedApprovals { get; set; } = [];
    }
}
