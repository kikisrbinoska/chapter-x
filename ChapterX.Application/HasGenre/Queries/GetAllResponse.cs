namespace ChapterX.Application.HasGenre.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.HasGenre> HasGenres);
}
