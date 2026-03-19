namespace ChapterX.API.DTOs
{
    public class RolesDto
    {
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public string Value { get; set; } = string.Empty;

        // Navigation
        public CollaborationDto Collaboration { get; set; } = null!;
    }
}
