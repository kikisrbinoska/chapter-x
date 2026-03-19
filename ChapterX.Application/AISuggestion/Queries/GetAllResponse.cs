namespace ChapterX.Application.AISuggestion.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.AISuggestion> AISuggestions);
}
