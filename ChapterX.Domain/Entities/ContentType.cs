using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class ContentType : IEntity
    {
        public int Id { get; set; }
        public int NotificationId { get; set; }
        public string ContentTypeValue { get; set; } = string.Empty;
        public Notification Notification { get; set; } = null!;
    }
}
