namespace ChapterX.API.DTOs
{
    public class PermissionLevelDto
    {
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public int Value { get; set; }

        // Navigation
        public CollaborationDto Collaboration { get; set; } = null!;
    }
}
