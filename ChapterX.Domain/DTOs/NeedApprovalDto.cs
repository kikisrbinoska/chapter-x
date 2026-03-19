namespace ChapterX.API.DTOs
{
    public class NeedApprovalDto
    {
        public int SuggestionId { get; set; }
        public int StoryId { get; set; }
        public int ChapterId { get; set; }

        // Navigation
        public AISuggestionDto AISuggestion { get; set; } = null!;
        public StoryDto Story { get; set; } = null!;
        public ChapterDto Chapter { get; set; } = null!;
    }
}
