namespace ChapterX.API.DTOs
{
    public class ContentTypeDto
    {
        public int NotificationId { get; set; }
        public string Value { get; set; } = string.Empty;

        // Navigation
        public NotificationDto Notification { get; set; } = null!;
    }
}
