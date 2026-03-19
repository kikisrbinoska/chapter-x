using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class Writer : IEntity
    {
        public int Id { get; set; } // maps to user_id
        public User User { get; set; } = null!;
        public ICollection<Story> Stories { get; set; } = [];
    }
}
