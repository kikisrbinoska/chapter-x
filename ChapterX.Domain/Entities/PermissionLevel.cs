using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class PermissionLevel : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public int Level { get; set; }
    }
}
