using System.Net.Mime;

namespace ChapterX.API.DTOs
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation
        public ICollection<ContentType> ContentTypes { get; set; } = [];
        public ICollection<NotifyDto> Notifies { get; set; } = [];
    }
}
