namespace ChapterX.Application.User.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.User> Users);
}
