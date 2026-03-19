namespace ChapterX.API.DTOs
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation
        public ICollection<ContentTypeDto> ContentTypes { get; set; } = [];
        public ICollection<NotifyDto> Notifies { get; set; } = [];
    }
}
