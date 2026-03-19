using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class NeedApproval : IEntity
    {
        public int Id { get; set; }
        public int SuggestionId { get; set; }
        public int StoryId { get; set; }
        public int ChapterId { get; set; }
        public AISuggestion AISuggestion { get; set; } = null!;
        public Story Story { get; set; } = null!;
        public Chapter Chapter { get; set; } = null!;
    }
}
