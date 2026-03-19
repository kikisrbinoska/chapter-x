namespace ChapterX.Application.Notify.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.Notify> Notifies);
}
