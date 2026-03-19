namespace ChapterX.API.DTOs
{
    public class LikesDto
    {
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation
        public UserDto User { get; set; } = null!;
        public StoryDto Story { get; set; } = null!;
    }
}
