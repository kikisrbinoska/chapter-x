namespace ChapterX.API.DTOs
{
    public class SuggestionTypeDto
    {
        public int SuggestionId { get; set; }
        public string Value { get; set; } = string.Empty;

        // Navigation
        public AISuggestionDto AISuggestion { get; set; } = null!;
    }
}
