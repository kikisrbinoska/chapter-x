using MediatR;

namespace ChapterX.Application.Notification.Commands
{
    public record UpdateRequest(int Id, string Content, bool IsRead) : IRequest<UpdateResponse>;
}
