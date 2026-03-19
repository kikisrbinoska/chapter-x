using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class SuggestionType : IEntity
    {
        public int Id { get; set; }
        public int SuggestionId { get; set; }
        public string SuggestionTypeValue { get; set; } = string.Empty;
        public AISuggestion AISuggestion { get; set; } = null!;
    }
}
