using MediatR;

namespace ChapterX.Application.Notify.Commands
{
    public record UpdateRequest(int Id, bool IsRead) : IRequest<UpdateResponse>;
}
