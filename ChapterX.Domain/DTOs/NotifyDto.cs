namespace ChapterX.API.DTOs
{
    public class NotifyDto
    {
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public int NotificationId { get; set; }

        // Navigation
        public UserDto User { get; set; } = null!;
        public StoryDto Story { get; set; } = null!;
        public NotificationDto Notification { get; set; } = null!;
    }
}
