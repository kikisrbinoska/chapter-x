using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class Notify : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public int NotificationId { get; set; }
        public User User { get; set; } = null!;
        public Story Story { get; set; } = null!;
        public Notification Notification { get; set; } = null!;
    }
}
