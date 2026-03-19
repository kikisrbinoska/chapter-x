namespace ChapterX.Application.Likes.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.Likes> Likes);
}
