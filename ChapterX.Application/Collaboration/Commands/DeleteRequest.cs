using MediatR;

namespace ChapterX.Application.Collaboration.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
