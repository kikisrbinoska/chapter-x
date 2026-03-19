using MediatR;

namespace ChapterX.Application.Notification.Commands
{
    public record AddRequest(string Content) : IRequest<AddResponse>;
}
