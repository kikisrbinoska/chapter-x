namespace ChapterX.Application.Comment.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.Comment> Comments);
}
