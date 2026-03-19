namespace ChapterX.Application.RegularUser.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.RegularUser> RegularUsers);
}
