namespace ChapterX.Application.Notification.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.Notification> Notifications);
}
