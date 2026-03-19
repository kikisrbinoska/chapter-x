using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class Roles : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int StoryId { get; set; }
        public string RoleValue { get; set; } = string.Empty;
    }
}
