using MediatR;

namespace ChapterX.Application.Notify.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
