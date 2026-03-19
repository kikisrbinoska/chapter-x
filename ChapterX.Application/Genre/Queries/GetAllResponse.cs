namespace ChapterX.Application.Genre.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.Genre> Genres);
}
