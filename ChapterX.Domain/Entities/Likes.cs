using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class Likes : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public DateTime CreatedAt { get; set; }
        public User User { get; set; } = null!;
        public Story Story { get; set; } = null!;
    }
}
