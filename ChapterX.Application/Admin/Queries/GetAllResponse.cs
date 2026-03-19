namespace ChapterX.Application.Admin.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.Admin> Admins);
}
