namespace ChapterX.API.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // FK
        public int UserId { get; set; }
        public int StoryId { get; set; }

        // Navigation
        public UserDto User { get; set; } = null!;
        public StoryDto Story { get; set; } = null!;
    }
}
