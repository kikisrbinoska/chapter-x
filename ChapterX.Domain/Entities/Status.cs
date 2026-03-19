using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class Status : IEntity
    {
        public int Id { get; set; }
        public int StoryId { get; set; }
        public string StatusValue { get; set; } = string.Empty;
        public Story Story { get; set; } = null!;
    }
}
