namespace ChapterX.Application.Status.Queries
{
    using StatusEnum = ChapterX.Domain.Entities.Status;

    public record GetAllResponse(IEnumerable<StatusEnum> Statuses);
}
