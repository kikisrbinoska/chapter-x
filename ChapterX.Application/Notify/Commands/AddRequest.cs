using MediatR;

namespace ChapterX.Application.Notify.Commands
{
    public record AddRequest(int UserId, int NotificationId) : IRequest<AddResponse>;
}
