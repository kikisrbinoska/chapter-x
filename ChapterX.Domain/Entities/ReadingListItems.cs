using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class ReadingListItems : IEntity
    {
        public int Id { get; set; }
        public int ListId { get; set; }
        public int StoryId { get; set; }
        public DateTime AddedAt { get; set; }
        public ReadingList ReadingList { get; set; } = null!;
        public Story Story { get; set; } = null!;
    }
}
