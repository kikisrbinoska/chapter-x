namespace ChapterX.Application.Story.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.Story> Stories);
}
