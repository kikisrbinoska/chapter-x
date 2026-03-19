namespace ChapterX.API.DTOs
{
    public class StatusDto
    {
        public int StoryId { get; set; }
        public string Value { get; set; } = string.Empty;

        // Navigation
        public StoryDto Story { get; set; } = null!;
    }
}
