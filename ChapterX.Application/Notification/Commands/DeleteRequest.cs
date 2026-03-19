using MediatR;

namespace ChapterX.Application.Notification.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
